// @ts-check

import RestaurantCard from '../../components/RestaurantCard';
import CarouselComponent from '../../components/CarouselComponent';
import QueueCard from '../../components/QueueCard';
import CarouselAutomate from '../../components/CarouselAutomate';
import React, { useEffect, useState } from 'react';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useLocation from '../../hooks/useLocation';
import {
    getCanteenByRestId,
    getNearestRestaurants,
} from '../../api/canteenApi';
import { getRestaurantImage } from '../../api/restaurantApi';

// @ts-expect-error
import defaultRestaurant from '../../assets/defaultRestaurant.jpeg';
import { getOnGoingOrders, getOrderQueue } from '../../api/orderApi';
import { getRestaurant } from '../../api/restaurantApi';
import { EventHandlerProvider } from '../../context/EventProvider';

/**
 * @import { Order, Queue } from '../../types/order';
 * @import { Restaurant } from '../../types/restaurant';
 * @import { Location } from '../../types/location';
 */

/**
 * @returns {React.ReactNode}
 */

//get user's queue, rank canteens from near to far, nearest canteen, GET restaurants info from the canteen
//how to make fn only run/render once to improve performance
const Home = () => {
    /**
     * @typedef {Object} OngoingOrder
     *
     * @property {Queue} queue
     * @property {Order} order
     * @property {string} restaurantName
     */

    //back : filter restaurants by canteen id
    const [restaurants, setRestaurants] = useState(
        /** @type{Restaurant[]} */ ([])
    );
    const axiosPrivate = useAxiosPrivate();
    const { location } = useLocation();
    const [canteen, setCanteen] = useState(null);
    const [restImgs, setRestImgs] = useState({});
    const [ongoingOrders, setOngoingOrders] = useState(
        /** @type{undefined | OngoingOrder[]} */ (undefined)
    );

    /**
     *
     * @param {Location} location
     */
    const getRestaurants = async (location) => {
        try {
            console.log(location);
            const restaurants = await getNearestRestaurants(
                location.latitude,
                location.longtitude
            );
            setRestaurants(restaurants);

            if (restaurants.length === 0) {
                return;
            }

            const canteen = await getCanteenByRestId(restaurants[0].id);
            setCanteen(canteen.name);

            for (let restaurant of restaurants) {
                // const rest = [];
                // rest["id"] = restaurant.id;
                // rest["name"] = restaurant.name;

                // rest["status"] = restaurant.status;
                // rest["queues"] = restaurant.queues;
                // rest["canteenName"] = restaurant.queues;
                // rest["busyness"] = restaurant.queues;
                // rest["queues"] = restaurant.queues;
                // rest["rating"] = restaurant.queues;

                const img = await getRestaurantImage(restaurant.id);
                restImgs[restaurant.id] = img
                    ? URL.createObjectURL(img)
                    : defaultRestaurant;
            }

            setRestImgs(restImgs);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            // Additional logging
            if (error.response) {
                console.log('Status code:', error.response.status);
                console.log('Data:', error.response.data);
                console.log('Headers:', error.response.headers);
            } else if (error.request) {
                console.log('Request:', error.request);
            } else {
                console.log('Message:', error.message);
            }
        }
    };

    useEffect(() => {
        if (location) {
            getRestaurants(location);
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            const restaurants = /** @type {{[key: number]: Restaurant}} */ ({});
            const orders = await getOnGoingOrders(axiosPrivate);
            let ongoingOrders = [];

            for (let i = 0; i < orders.length; i++) {
                const queue = await getOrderQueue(axiosPrivate, orders[i].id);

                if (!restaurants[orders[i].restaurant_id]) {
                    restaurants[orders[i].restaurant_id] = await getRestaurant(
                        orders[i].restaurant_id
                    );
                }

                ongoingOrders.push({
                    queue,
                    order: orders[i],
                    restaurantName: restaurants[orders[i].restaurant_id].name,
                });
            }

            // sort by the date
            ongoingOrders.sort(
                (a, b) => a.order.ordered_at - b.order.ordered_at
            );

            setOngoingOrders(ongoingOrders);
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-col">
            {/* the md:ml-6 is used because the sidebar appear at md */}
            <div className="w-full">
                <CarouselAutomate />
            </div>

            {ongoingOrders && ongoingOrders.length > 0 && (
                <EventHandlerProvider>
                    <div className="mt-8 flex w-full flex-col">
                        <h1 className="heading-font mb-5">
                            {`My Queue (${ongoingOrders.length})`}
                        </h1>
                        <div className="flex">
                            <div className="flex w-0 grow overflow-x-auto">
                                {ongoingOrders.map((order, index) => (
                                    <QueueCard key={index} {...order} />
                                ))}
                            </div>
                        </div>
                    </div>
                </EventHandlerProvider>
            )}

            {restaurants.length != 0 ? (
                <>
                    <div className="">
                        <h1 className="heading-font mt-10">Nearby Canteen</h1>
                        <CarouselComponent />
                    </div>

                    <div className="flex flex-col gap-y-6">
                        <div className="">
                            <h1 className="heading-font">
                                Food from your nearest:{' '}
                                <span className="text-orange-500">
                                    {canteen}
                                </span>
                            </h1>
                        </div>
                        {restaurants.map((shop) => (
                            <RestaurantCard
                                key={shop.id}
                                name={shop.name}
                                image={restImgs[shop.id]}
                                canteenName={'First Canteen'} //problem : add canteen name
                                busyness={'busy'}
                                queue={123}
                                rating={3.5}
                                food="Krapao"
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex w-full items-center justify-center">
                    <img src="./loading_main.svg" className="w-28"></img>
                </div>
            )}
        </div>
    );
};

export default Home;
