import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getMenuImage } from "../api/restaurantApi";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const Comment = ({ username, customer_id, date, menu, menu_id, numStar, comment }) => {
    const axiosPrivate = useAxiosPrivate();
    const [menuImg, setMenuImg] = useState(null);
    const [profile, setProfile] = useState(null);

    const getProfileImg = async (customer_id) => {
        try{
            const response = await axiosPrivate.get(`/customers/${customer_id}/get_profile_img`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            setProfile(url);
            console.log("Profile image fetched: ", url);
            
            
        } catch (error) {
            console.error("Error fetching profile image: ", error);
        }        
    }

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await getMenuImage(menu_id);
                const url = URL.createObjectURL(response);
                setMenuImg(url);
            }catch(error){
                console.error("Error fetching menu image: ", error);
            }
        }
        fetchImage();
        getProfileImg(customer_id); 
    }, [customer_id]);
    

    return (
            <div className="bg-slate-100 w-5/6 p-2 rounded-3xl mb-6 ml-7 flex flex-col shadow-xl">
            {/* header */}
                <div className="p-2">
                    <div className="flex">
                        <img 
                            className="w-12 h-12 rounded-full bg-slate-500 ml-0"
                            src={profile !== null ? profile : "/unset-profile.jpg"}/>
                        <div className="ml-2">
                            <h2 className="text-md text-blue-950 font-bold">{username}</h2>
                            <h2 className="text-sm text-slate-500">{date}</h2>
                        </div>
                        
                    </div>
                    <hr className="border-t-2 border-black mt-3 mb-3"/>
                    {/* body */}
                    <div className="flex flex-col text-center mt-5">
                        <h1 className="text-blue-950 font-bold text-2xl">{menu}</h1>
                        <div className="">
                            {

                                [
                                    //potential error : the same key
                                    ...Array(parseInt(numStar)).fill(0).map((_, i) => (
                                        <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-6 text-yellow-500"/>
                                    )),
                                    ...Array(5-parseInt(numStar)).fill(0).map((_, i) => (
                                        <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-6"/>
                                    ))
                                ]
                            }
                        </div>
                    </div>
                    

                    <h2 className="mb-3 text-lg break-words text-blue-950">{comment}</h2>
                    {/* //see more if comment is too long */}
                    <div className="overflow-hidden rounded-md h-52 bg-slate-300 ">
                        {/* foog img */}
                        <img className="object-cover w-full h-full" src={menuImg} alt="" />
                    </div>

                    <div className="w-full flex rounded-md mt-3 justify-center">
                        <FontAwesomeIcon className="text-3xl text-blue-950" icon={faThumbsUp} /> 
                        {/* text-blue-700 : click */}
                        <h2 className=" ml-2 text-blue-950">Helpful?</h2>
                    </div>
                </div>
                
                

            </div>
        
        
        
        
    );
}; 

export default Comment;