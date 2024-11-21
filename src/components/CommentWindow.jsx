
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpload} from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate  from '../hooks/useAxiosPrivate';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect } from 'react';
import { getMenuImage } from '../api/restaurantApi';


const CommentWindow = ({closeModal, menuId, menuName, restaurant_id, handleReviewAdded}) => {
    const axiosPrivate = useAxiosPrivate();
    const [review, setReview] = React.useState("");
    const [tastiness, setTastiness] = React.useState(0);
    const [hygiene, setHygiene] = React.useState(0);
    const [quickness, setQuickness] = React.useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [menuImg, setMenuImg] = useState(null);

    const uploadFile = (event) => {
        const file = event.target.files[0];
        if(file){
            setUploadFile(file);
            console.log("Uploaded file: ", file);
        }
    }; 


    const submitReview = async (e) => {
        e.preventDefault();
        const reviewData = {
            restaurant_id: restaurant_id,
            menu_id: menuId,
            review: review,
            tastiness: Math.ceil(tastiness),
            hygiene: Math.ceil(hygiene),
            quickness: Math.ceil(quickness)
        }; 

        try{
            const response = await axiosPrivate.post(
                '/customers/add_reviews',
                reviewData
            )
            handleReviewAdded(); 
            closeModal(); 
        }catch(error){
            if (error.response) {
                console.error('Error:', error.response.data);  
                alert(`Error: ${error.response.data.detail || 'An error occurred while submitting your review.'}`);
            } else {
                console.error('Error:', error.message);
                alert('Network or server error, please try again.');
            }
        }

    }

    useEffect(() => {
        const fetchImage = async () => {
            try{
                const response = await getMenuImage(menuId);
                const url = URL.createObjectURL(response);
                setMenuImg(url);
            }catch(error){
                console.error("Error fetching menu image: ", error);
            }
        }
        fetchImage(); 
    }, [menuId])

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };
      
      function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }
      
      function HoverRating({value, onChanges}) {
        const [hover, setHover] = React.useState(-1);
      
        return (
          <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                onChanges(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        );
      }
    
    return (
        <div className='fixed top-20 left-1/4 w-3/6 max-w-3/5 min-w-2/5 p-2 z-10'>
            <div className="bg-slate-100 p-2 rounded-3xl flex flex-col shadow-xl">
                    <div className="m-3">
                    <div className="flex justify-between">
                        <h1 className='comment-heading-font'>Rate and Review your order</h1>
                        
                        <button type='button' onClick={closeModal}>
                            <FontAwesomeIcon className="comment-heading-font hover:text-red-600" icon={faXmark} />
                        </button>
                    </div>
                    <hr className="border-t-2 border-black mt-3 mb-3"/>

                    <h1 className='comment-sub-heading-bold-font'>Menu: {menuName}</h1>

                    <div className="flex flex-col sm:flex-row justify-center mt-2">
                        <h1 className='comment-sub-heading-bold-font mt-1'>Tastiness</h1>
                            <div className='mt-1 ml-1'>
                                <HoverRating value={tastiness} onChanges={setTastiness}></HoverRating>
                            </div>
                     </div> 
                     <div className="flex flex-col sm:flex-row justify-center mt-2">
                        <h1 className='comment-sub-heading-bold-font mt-1'>Hygiene</h1>
                            <div className='mt-1 ml-1'>
                                <HoverRating value={hygiene} onChanges={setHygiene}></HoverRating>
                            </div>
                     </div> 
                     <div className="flex flex-col sm:flex-row justify-center mt-2">
                        <h1 className='comment-sub-heading-bold-font mt-1'>Quickness</h1>
                            <div className='mt-1 ml-1'>
                                <HoverRating value={quickness} onChanges={setQuickness}></HoverRating>
                            </div>
                     </div> 
                    

                    <form onSubmit={submitReview}>
                        <h1 className="comment-sub-heading-bold-font mt-5">Review</h1>
                        {/* add comment */}
                        <textarea 
                        className="rounded-xl p-2 w-full" 
                        name="" 
                        id="" 
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='write your comment'></textarea>
                        
                        
                        <div className="col-span-full ">
                            <label htmlFor="cover-photo" className="block comment-sub-heading-bold-font">
                                Food Image
                            </label>
                            <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed bg-slate-200 w-full px-6 py-3">
                            {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed bg-slate-200 border-gray-900/25 px-6 py-10"> */}
                                <img src={menuImg} className='h-96 overflow-hidden rounded-lg'></img>
                                <div className="text-center">
                                    {/* if have time */}
                                    {/* <FontAwesomeIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" icon={faUpload} />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                        <span>Upload a file</span>
                                        <input 
                                        id="file-upload" 
                                        name="file-upload" 
                                        type="file"
                                        onChange={uploadFile} 
                                        className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end">
                            <button className='general-button mt-2' type="submit">
                                <h1>Submit</h1>
                            </button>
                        </div>
                    </form>
                    
                </div>
                
            </div>
        </div>
    );
}

export default CommentWindow;