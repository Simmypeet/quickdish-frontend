import React, { useEffect } from "react";
import Comment from "../../components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CommentWindow from "../../components/CommentWindow";
import { useNavigate, useLocation } from "react-router-dom";
import { getMenu } from "../../api/restaurantApi";
import { getUserById } from "../../api/customerApi";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { dateFormatted, timeFormatted } from "../../utils/datetimeFormatter";

//rating
//reviews and number of reviews
const RateAndReview = () => {
    const location  = useLocation();
    const { restaurant_id, name, canteen, menu_id } = location.state || {}; //add menu id
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const closeModal = () => setShowModal(!showModal);
    const [reviews, setReviews] = React.useState([]);
    const [menuName, setMenuName] = React.useState("");
    const [overall_rate, setOverallRate] = React.useState(0);
    const axiosPrivate = useAxiosPrivate();

    const switchtoDashboard = () => {
        const path = "/dashboard/purchase_history";
        navigate(path);
    }

    const getAllReviews = async (restaurant_id) => {
        const review_edit = []; 
        let total_rate = 0; 
        const response = await axios.get(`http://127.0.0.1:8000/restaurants/reviews/${restaurant_id}`); 
        if (response.status !== 200){
            throw new Error(
                `Error fetching restaurant data status: ${response.status};`
            );
        }
        for(let r of response.data){
            let temp = {}; 
            const menu = await getMenu(r.menu_id); 
            const username = await getUserById(axiosPrivate, r.customer_id);
            const date = new Date(r.created_at);
            temp["username"] = username.username; 
            temp["customer_id"] = r.customer_id;
            temp["date"] = dateFormatted(date) + ", " + timeFormatted(date); 
            temp["menu"] = menu.name; 
            temp["menu_id"] = r.menu_id;
            temp["rating"] = (r.tastiness + r.hygiene + r.quickness)/3; 
            temp["comment"] = r.review; 
            review_edit.push(temp);
            total_rate += temp["rating"];
        }
        const avgRating = review_edit.length === 0 ? 0 : total_rate/review_edit.length;
        setOverallRate(Math.ceil(avgRating));
        setReviews(review_edit);
    }

    const handleReviewAdded = () => {
        getAllReviews(restaurant_id); 
    }


    const getMenuName = async () => {   
        const response = await getMenu(menu_id);
        setMenuName(response.data.name);
        console.log("Menu name: ", response.data.name);
    }

    useEffect(() => {
        getMenuName(); 
    }, []);

    useEffect(() => {   
        getAllReviews(restaurant_id); 
    }, [restaurant_id]);

    return (
        <div className="gradient-color-orange h-screen overflow-hidden">
            {/* Header section */}
            <div className="fixed top-0 w-full pt-8 text-white hover:text-blue-950 text-3xl flex">
                <button className="flex" type="button" onClick={switchtoDashboard}>
                    <FontAwesomeIcon className="m-1 ml-4 size-8 z-10" icon={faArrowLeft} />
                    <h1 className="font-medium z-10 ">Rate & Review</h1>
                </button>
                <div className="fixed top-0 h-32 w-full bg-gradient-to-b from-orange-800 to-transparent "></div>
            </div>

            {/* Main content area */}
            <div className="h-screen flex flex-col items-center mt-28">
                <div className="bg-slate-100 w-8/12 h-4/5 rounded-3xl mb-6 overflow-hidden">
                    {/* Content container with scrollable reviews */}
                    <div className="flex flex-col justify-center bg-slate-100 rounded-3xl">
                        {/* Header information */}
                        <div className="bg-slate-100 w-full p-2 rounded-t-3xl mb-6 flex flex-col space-y-3 shadow-2xl">
                            <div className="m-3 flex flex-col">
                                <h1 className="comment-heading-font">{name}</h1>
                                <div className="flex">
                                    <FontAwesomeIcon className="m-1 size-5 text-black" icon={faLocationDot} />
                                    <h1>{canteen}</h1>
                                </div>
                                <hr className="border-t-2 border-black mt-3 mb-3" />
                                <h1 className="comment-sub-heading-bold-font">Overall Rate({overall_rate})</h1>
                                <div className="">
                                    {
                                        [...Array(overall_rate).fill(0).map((_, i) => (
                                            <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-8 text-yellow-500" />
                                        )),
                                        ...Array(5 - overall_rate).fill(0).map((_, i) => (
                                            <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-8" />
                                        ))
                                        ]
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Reviews section with scrolling */}
                        <h1 className="comment-sub-heading-bold-font ml-3 mb-3">Reviews({reviews.length})</h1>
                        <div className="flex flex-col items-center overflow-y-auto h-[400px] p-4">
                            {
                                reviews.map((review, index) => {
                                    return (<Comment 
                                    key={index}
                                    username={review.username} 
                                    customer_id={review.customer_id}
                                    date={review.date}
                                    menu={review.menu}
                                    menu_id = {review.menu_id}
                                    numStar={review.rating} 
                                    comment={review.comment} />
                                    ); 
                                })
                            }
                         
                        </div>

                        {/* Button to add a new comment */}
                        <div className="fixed bottom-10 right-10">
                            <button className="add-button" type="submit" onClick={() => setShowModal(true)}>
                                <h2 className="text-3xl">+</h2>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for adding a new comment */}
            {showModal ? (
                <div>
                    <CommentWindow 
                    closeModal={closeModal} 
                    menuId={menu_id} 
                    menuName={menuName}
                    restaurant_id={restaurant_id}
                    handleReviewAdded={handleReviewAdded}/>
                    <div className="fixed top-0 left-0 bg-black opacity-50 w-screen h-screen"></div>
                </div>
            ) : null}
        </div>
    );
}

export default RateAndReview;


