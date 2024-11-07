// @ts-check

import React, { useEffect } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { LoadingPage } from '../../components/LoadingPage';
import { getRestaurant, getRestaurantImage } from '../../api/restaurantApi';

// @ts-expect-error
import defaultRestaurant from '../../assets/defaultRestaurant.jpeg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
    getFavoriteRestaurants,
    removeFavoriteRestaurant,
} from '../../api/customerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

/**
 * @import {Restaurant} from '../../types/restaurant'
 */

/**
 * @typedef {Object} RestaurantData
 *
 * @prop {Restaurant} data
 * @prop {string} image
 */

/**
 * @returns {React.ReactNode}
 */
const Favourite = () => {
    const axiosPrivate = useAxiosPrivate();
    const [favoriteRestaurantDatas, setFavrotieRestaurantDatas] =
        React.useState(
            /** @type {undefined | null | RestaurantData[]} */
            (undefined)
        );

    // TODO: fetch favourite restaurants from the user.
    useEffect(() => {
        async function fetchData() {
            const favoriteRestaurantIds = await getFavoriteRestaurants(
                axiosPrivate
            );

            let newFavoriteRestaurantDatas =
                /** @typedef {RestaurantData[]} */ [];

            for (const restaurantId of favoriteRestaurantIds) {
                const fetchedImage = await getRestaurantImage(restaurantId);

                newFavoriteRestaurantDatas.push({
                    data: await getRestaurant(restaurantId),
                    image:
                        fetchedImage == null
                            ? /** @type {string} */ (defaultRestaurant)
                            : URL.createObjectURL(fetchedImage),
                });
            }

            setFavrotieRestaurantDatas(newFavoriteRestaurantDatas);
        }

        fetchData();
    }, []);

    const FavoriteRestaurantBody = () => {
        const navigate = useNavigate();

        if (favoriteRestaurantDatas === undefined) {
            return (
                <div className="h-full grow">
                    <LoadingPage opacity={false} />
                </div>
            );
        } else if (favoriteRestaurantDatas === null) {
            return (
                <div className="h-full grow">
                    <LoadingPage opacity={false} />
                </div>
            );
        } else {
            if (favoriteRestaurantDatas.length == 0) {
                return (
                    <div
                        className="
                            bg-red-10 mx-auto flex h-full grow flex-col
                            items-center justify-center gap-y-2
                        "
                    >
                        <div>
                            <FontAwesomeIcon
                                icon={faShopSlash}
                                className="text-3xl"
                            />
                        </div>
                        <h1 className="text-xl font-light italic">
                            You Don't Have Any Favorite Restaurants
                        </h1>
                        <h1
                            className="
                                rounded-md  bg-gradient-to-r from-orange-300 
                                to-red-400 px-2 py-1 text-white 
                                drop-shadow-md hover:cursor-pointer 
                                hover:shadow-lg
                            "
                            onClick={() => {
                                navigate('/dashboard/', { replace: true });
                            }}
                        >
                            Back to Homepage
                        </h1>
                    </div>
                );
            } else {
                return (
                    <div className="flex grow flex-col gap-y-4">
                        {favoriteRestaurantDatas.map((restaurantData) => (
                            <RestaurantCard
                                name={restaurantData.data.name}
                                key={restaurantData.data.id}
                                food={'test'}
                                image={restaurantData.image}
                                canteenName={'Canteen A'}
                                busyness={'Busy'}
                                queue={0}
                                rating={0}
                                flag={true}
                                onFlag={(toFlag) => {
                                    if (toFlag) {
                                        return;
                                    }

                                    // remove from favorite
                                    setFavrotieRestaurantDatas(
                                        favoriteRestaurantDatas.filter(
                                            (data) =>
                                                data.data.id !==
                                                restaurantData.data.id
                                        )
                                    );
                                    removeFavoriteRestaurant(axiosPrivate, [
                                        restaurantData.data.id,
                                    ]);
                                }}
                            />
                        ))}
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex h-full flex-col pl-3 pr-3 pt-5">
            <div className="flex items-center space-x-10">
                <h1 className="big-title">Favourite</h1>
            </div>
            <hr className="my-4"></hr>
            <FavoriteRestaurantBody />
        </div>
    );
};

export default Favourite;
