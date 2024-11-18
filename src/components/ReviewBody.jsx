import Comment from "./Comment";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { getMenu } from "../api/restaurantApi";
import { getUser } from "../api/customerApi";
import { dateFormatted, timeFormatted } from "../utils/datetimeFormatter";

const ReviewBody = () => { 
    const [reviews, setReviews] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const getCustomerReviews = async () => {
        const review_edit = []; 
        const response = await axiosPrivate.get('http://127.0.0.1:8000/customers/customer/reviews'); 
        if (response.status !== 200){
            throw new Error(
                `Error fetching restaurant data status: ${response.status};`
            );
        }
        for(let r of response.data){
            let temp = {}; 
            const menu = await getMenu(r.menu_id); 
            const username = await getUser(axiosPrivate);
            const date = new Date(r.created_at);
            temp["username"] = username.username; 
            temp["date"] = dateFormatted(date) + ", " + timeFormatted(date); 
            temp["menu"] = menu.name; 
            temp["menu_id"] = r.menu_id;
            temp["rating"] = (r.tastiness + r.hygiene + r.quickness)/3; 
            temp["comment"] = r.review; 
            review_edit.push(temp);
        }
        setReviews(review_edit);
    }

    useEffect(() => {
        getCustomerReviews(); 
    }, []);

    return (
        <div className="ml-5">
            <h1 className="big-title my-5">Reviews({reviews.length})</h1>
            <div className="flex flex-col justify-center items-center">
                {
                    reviews.map((review, index) => {
                        return (<Comment 
                        key={index}
                        username={review.username} 
                        date={review.date}
                        menu={review.menu}
                        menu_id={review.menu_id}
                        numStar={review.rating} 
                        comment={review.comment} />
                        ); 
                    })
                }
            </div>
        </div>
    );
}

export default ReviewBody;
