import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CanteenCard from "./CanteenCard";
import axios from 'axios'; //temp -> axiosPrivate
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLocation from "../hooks/useLocation";
import { getRestaurantImage } from "../api/restaurantApi";
import { getCanteenImgFromId } from "../api/canteenApi";


const CarouselComponent = () => {
    const [canteens, setCanteens] = useState(null); 
    const [canteenImg, setCanteenImg] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const { userLocation, setUserLocation } = useLocation();

   
    const getCanteens = async () => {
        try {
            const response = await axiosPrivate.get(`http://127.0.0.1:8000/canteens/?user_lat=${userLocation.latitude}&user_long=${userLocation.longtitude}`);
            setCanteens(response.data);
    
            const images = {};
            for (let canteen of response.data) {
                // const img = await fetchCanteenImg(canteen.id);
                const img = await getCanteenImgFromId(canteen.id);

                images[canteen.id] = img
                    ? URL.createObjectURL(img)
                    : defaultCanteen;
            }
            console.log("Canteen Images fetched: ", images);
            setCanteenImg(images);
        } catch (error) {
            console.log('Error fetching canteens or images:', error);
        }
    };
    

    // const fetchCanteenImg = async (canteenId) => {
    //     const response = await axios.get(`/canteens/${canteenId}/img`, 
    //         { responseType: 'blob'}
    //     );
    //     console.log("canteen img response: ", response);
    //     if(response.status === 200){
    //         return response.data; 
    //     }else if(response.status === 204){
    //         return null; 
    //     }
    //     // return response.data; 
        
    //     throw new Error(
    //         `Error fetching restaurant image status: ${response.status};
    //         body : ${response.data}`
    //     ); 

        
    // }; 

    useEffect(() => {
        if(userLocation.latitude > 0 && userLocation.longtitude > 0){
            getCanteens();
        }
    }, [userLocation.latitude, userLocation.longtitude]);


    if (canteens == null){
        return (
            <div className="w-full h-full"> 
                Loading... 
            </div>);
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 2400, min: 1800 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1200 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1200, min: 600 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1, 
        }
    };

    return (
            <Carousel 
                className="z-0" 
                responsive={responsive} 
                renderDotsOutside={true} 
                itemClass="carousel-item-spacing"
                partialVisible={false}
                partialVisbile={false}
            >
                {canteens.map(canteen => (
                    // <CanteenCard key={it.id} canteenName={it.name} img={it.img}/>
                    <CanteenCard key={canteen.id} canteenName={canteen.name} img={canteenImg[canteen.id]}/>
                ))}
            </Carousel>
    );
}

export default CarouselComponent;