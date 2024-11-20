// @ts-check

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import IdleTag from './idleTag';
import React from 'react';
import { getRestaurant, getRestaurantImage } from '../api/restaurantApi';

// @ts-expect-error
import defaultRestaurant from '/defaultRestaurant.jpeg';
import { Result } from 'postcss';
import { getRestaurantQueue } from '../api/orderApi';
import { getCanteenById } from '../api/canteenApi';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {
    addFavoriteRestaurant,
    removeFavoriteRestaurant,
} from '../api/customerApi';
import { useNavigate } from 'react-router-dom';

/**
 * @import { Restaurant } from '../types/restaurant'
 * @import { Queue } from '../types/order'
 * @import { Canteen } from '../types/canteen'
 */

/**
 * @typedef {Object} RestaurantCardProp
 *
 * @property {number} restaurantID
 * @property {boolean} userFavorite
 */

/**
 * @typedef {Object} RestaurantData
 *
 * @property {Restaurant} restaurant
 * @property {Queue} queue
 * @property {string} image
 * @property {Canteen} canteen
 */

/**
 *
 * @param {{
 *  restaurant: RestaurantData,
 *  userFavorite: boolean
 * }} prop
 * @returns {React.ReactNode}
 */
const Content = ({ restaurant, userFavorite }) => {
    const [flagValue, setFlagvalue] = useState(userFavorite);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    return (
        <>
            <img
                className="
                    aspect-square h-full w-auto cursor-pointer rounded-xl 
                    object-cover object-center
                "
                src={restaurant.image}
                onClick={() => {
                    navigate(`/restaurants/${restaurant.restaurant.id}`, {
                        replace: true,
                    });
                }}
                alt=""
            />
            <div className="mx-2 flex grow flex-col justify-between ">
                <div className="flex items-center justify-between">
                    <h2 className="line-clamp-1 font-semibold">
                        {restaurant.restaurant.name}
                    </h2>

                    <button
                        type="button"
                        onClick={() => {
                            try {
                                if (flagValue) {
                                    removeFavoriteRestaurant(axiosPrivate, [
                                        restaurant.restaurant.id,
                                    ]);

                                    setFlagvalue(false);
                                } else {
                                    addFavoriteRestaurant(axiosPrivate, [
                                        restaurant.restaurant.id,
                                    ]);

                                    setFlagvalue(true);
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }}
                    >
                        {/* change to black when click  */}
                        {flagValue ? (
                            <FontAwesomeIcon className="size-4" icon={faFlag} />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    d="
                                        M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 
                                        64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 
                                        24s24-10.7 24-24l0-100 
                                        80.3-20.1c41.1-10.3 84.6-5.5 122.5 
                                        13.4c44.2 22.1 95.5 24.8 141.7 
                                        7.4l34.7-13c12.5-4.7 20.8-16.6 
                                        20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 
                                        4.8c-46.3 23.2-100.8 23.2-147.1 
                                        0c-35.1-17.6-75.4-22-113.5-12.5L48 
                                        52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 
                                        80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 
                                        241.8-24.4 9.1c-33.7 12.6-71.2 
                                        10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 
                                        338.5l0-237z
                                    "
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <hr className="my-1"></hr>
                <div
                    className="
                        mx-1 line-clamp-1 flex w-full grow flex-col 
                        justify-evenly gap-y-1
                    "
                >
                    <div className="flex justify-between">
                        <h2 className="text-sm text-slate-600">Status:</h2>
                        <h2 className="text-sm text-slate-600 ">
                            {restaurant.restaurant.open ? 'Open' : 'Closed'}
                        </h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-sm text-slate-600">Queue:</h2>
                        <h2 className="text-sm text-slate-600">
                            {restaurant.queue.queue_count == 0
                                ? 'None'
                                : `${restaurant.queue.queue_count} queue(s)`}
                        </h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-sm text-slate-600">
                            Waiting Time:
                        </h2>
                        <h2 className="text-sm text-slate-600">
                            {restaurant.queue.estimated_time == 0
                                ? 'None'
                                : `${restaurant.queue.estimated_time} min(s)`}
                        </h2>
                    </div>
                </div>
                {/* needed: fetch from db */}
                <div className="my-1 flex">
                    <div className="flex w-0 grow overflow-x-auto">
                        <IdleTag name={restaurant.canteen.name} />
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * @param {RestaurantCardProp} param
 *
 * @returns {React.ReactNode}
 */
const RestaurantCard = ({ restaurantID, userFavorite }) => {
    const [restaurant, setRestaurant] = useState(
        /** @type {RestaurantData | undefined} */ (undefined)
    );

    useEffect(() => {
        async function fetchRestaurant() {
            const restaurant = await getRestaurant(restaurantID);
            const queue = await getRestaurantQueue(restaurantID);
            const image = await getRestaurantImage(restaurantID);
            const canteen = await getCanteenById(restaurant.canteen_id);

            setRestaurant({
                restaurant,
                queue,
                canteen,
                image: image ? URL.createObjectURL(image) : defaultRestaurant,
            });
        }

        fetchRestaurant();
    }, []);

    return (
        <div
            className="
                relative flex h-40 rounded-xl border-2 
                bg-white p-2 shadow-md hover:shadow-lg
            "
        >
            {restaurant ? (
                <Content restaurant={restaurant} userFavorite={userFavorite} />
            ) : (
                <div className="flex w-full items-center justify-center">
                    <img src="./loading_main.svg" className="w-28"></img>
                </div>
            )}
        </div>
    );
};

export default RestaurantCard;
