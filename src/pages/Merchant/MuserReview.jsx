import React, { useEffect } from "react";
import Comment from "../../components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getMenu } from "../../api/restaurantApi";
import { getUserById } from "../../api/customerApi";
import axios from "axios";
import useMerchant from '../../hooks/useMerchant';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { dateFormatted, timeFormatted } from "../../utils/datetimeFormatter";


const MuserReview = () => {
    const { merchant } = useMerchant();
    const { restaurant_id, name, canteen, menu_id } = location.state || {}; //add menu id
    const [showModal, setShowModal] = React.useState(false);
    const closeModal = () => setShowModal(!showModal);
    const [reviews, setReviews] = React.useState([]);
    const [menuName, setMenuName] = React.useState("");
    const [overall_rate, setOverallRate] = React.useState(0);
    const axiosPrivate = useAxiosPrivate();

    const getAllReviews = async (restaurant_id) => {
        const review_edit = []; 
        let total_rate = 0; 
        const response = await axios.get(`http://127.0.0.1:8000/restaurants/reviews/${merchant.restaurant_id}`); 
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
        <>
            <h1 className="heading-font mb-5">User reviews({reviews.length})</h1>
            <div className="flex flex-col items-center">
                
                <div className="w-3/4 flex flex-col items-center">
                    <h2 className="sub-heading-font">Overall rate</h2>
                    <div className="mb-5">
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
                    {
                        reviews.map((review, index) => {
                            return (
                                <Comment 
                                    key={index}
                                    username={review.username} 
                                    date={review.date}
                                    menu={review.menu}
                                    menu_id={review.menu_id}
                                    numStar={review.rating} 
                                    comment={review.comment} 
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}
export default MuserReview;