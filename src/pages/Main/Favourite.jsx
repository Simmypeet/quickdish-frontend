// @ts-check

import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { LoadingPage } from '../../components/LoadingPage';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getFavoriteRestaurants } from '../../api/customerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

/**
 * @param {{
 *  favoriteRestaurantIDs: number[] | undefined
 *  setFavoriteRestaurantIDs: React.Dispatch<React.SetStateAction<number[] | undefined>>
 * }} props
 *
 * @returns {React.ReactNode}
 */
const FavoriteRestaurantBody = ({ favoriteRestaurantIDs }) => {
    const navigate = useNavigate();

    if (favoriteRestaurantIDs === undefined) {
        return (
            <div className="h-full grow">
                <LoadingPage opacity={false} />
            </div>
        );
    } else {
        if (favoriteRestaurantIDs.length == 0) {
            return (
                <div
                    className="
                        bg-red-10 mx-auto flex h-full grow flex-col items-center 
                        justify-center gap-y-2
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
                    {favoriteRestaurantIDs.map((restaurantData) => (
                        <RestaurantCard
                            key={restaurantData}
                            restaurantID={restaurantData}
                            userFavorite={true}
                        />
                    ))}
                </div>
            );
        }
    }
};

/**
 * @returns {React.ReactNode}
 */
const Favourite = () => {
    const axiosPrivate = useAxiosPrivate();
    const [favoriteRestaurantIDs, setFavoriteRestaurantIDs] = useState(
        /** @type {undefined | number[]} */
        (undefined)
    );

    useEffect(() => {
        async function fetchData() {
            const favoriteRestaurants = await getFavoriteRestaurants(
                axiosPrivate
            );

            setFavoriteRestaurantIDs(favoriteRestaurants);
        }

        fetchData();
    }, []);

    return (
        <div className="flex h-full flex-col pl-3 pr-3 pt-5">
            <div className="flex items-center space-x-10">
                <h1 className="big-title">Favourite</h1>
            </div>
            <hr className="my-4"></hr>
            <FavoriteRestaurantBody
                favoriteRestaurantIDs={favoriteRestaurantIDs}
                setFavoriteRestaurantIDs={setFavoriteRestaurantIDs}
            />
        </div>
    );
};

export default Favourite;
