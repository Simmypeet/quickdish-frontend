import CanteenCard from '../../components/CanteenCard';
import RestaurantCard from '../../components/RestaurantCard';
import CarouselComponent from '../../components/CarouselComponent';
import Banner from '../../components/Banner';
import QueueCard from '../../components/QueueCard';
import Header from '../../components/Header';
import CarouselAutomate from '../../components/CarouselAutomate';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; //temp -> axiosPrivate
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useLocation from '../../hooks/useLocation';

//get user's queue, rank canteens from near to far, nearest canteen, GET restaurants info from the canteen
//how to make fn only run/render once to improve performance
const Home = () => {
    //back : filter restaurants by canteen id 
    const [restaurants, setRestaurants] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const {userLocation, setUserLocation} = useLocation();

    const getRestaurants = async () => {
        console.log("latitude ", userLocation.latitude);
        try{
            const response = await axiosPrivate.get(`http://127.0.0.1:8000/canteens/canteen/restaurants?user_lat=${userLocation.latitude}&user_long=${userLocation.longtitude}`); //replace 
            console.log("get restaurant: ", response.data);
            setRestaurants(response.data);
            // return response.data;
        }catch(error){
            console.error("Error fetching restaurants:", error);
            // Additional logging
            if (error.response) {
                console.log("Status code:", error.response.status);
                console.log("Data:", error.response.data);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                console.log("Request:", error.request);
            } else {
                console.log("Message:", error.message);
            }
        }
    }


    useEffect(() => {
        if(userLocation.latitude > 0 && userLocation.longtitude > 0){
            getRestaurants();
        }
    }, [userLocation.latitude, userLocation.longtitude]);

    return (
        <div className="flex flex-col">
            {/* the md:ml-6 is used because the sidebar appear at md */}
            <div className="w-full">
                <CarouselAutomate />
            </div>

            <div className="mt-8 flex w-full flex-col">
                <h1 className="heading-font mb-5">My Queue(1)</h1>
                <div className="flex">
                    <div className="flex w-0 grow overflow-x-auto">
                        <QueueCard />
                        <QueueCard />
                    </div>
                </div>
            </div>

            <div className="">
                <h1 className="heading-font mt-10">Nearby Canteen</h1>
                <CarouselComponent />
            </div>

            <div className="flex flex-col gap-y-6">
                <div className="">
                    <h1 className="heading-font">
                        Food from your nearest: Canteen A
                    </h1>
                </div>
                {

                    restaurants.map((shop) => (
                        <RestaurantCard key={shop.id} storeName={shop.name} img={shop.img} status={shop.status} queues={shop.queues} rating={shop.rating} price={shop.price}/>
                    ))
                }
                {/* <RestaurantCard  />
                <RestaurantCard /> */}
            </div>
        </div>
    );
};

export default Home;
