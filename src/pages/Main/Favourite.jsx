// @ts-check

import React, { useEffect } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { LoadingPage } from '../../components/LoadingPage';
import { getRestaurant, getRestaurantImage } from '../../api/restaurantApi';

// @ts-expect-error
import defaultRestaurant from '../../assets/defaultRestaurant.jpeg';

const Favourite = () => {
    const [favoriteRestaurantDatas, setFavrotieRestaurantDatas] =
        React.useState(
            /** @type {undefined | null | any[]} */
            ([])
        );

    // TODO: fetch favourite restaurants from the user.
    useEffect(() => {
        async function fetchData() {
            const favoriteRestaurantIds =
                /*TODO: actually fetch the correct id here*/ [8, 6];

            let newFavoriteRestaurantDatas = [];

            for (const restaurantId of favoriteRestaurantIds) {
                const fetchedImage = await getRestaurantImage(restaurantId);

                const restaurantData = {
                    data: await getRestaurant(restaurantId),
                    image:
                        fetchedImage == null
                            ? defaultRestaurant
                            : URL.createObjectURL(fetchedImage),
                };

                newFavoriteRestaurantDatas.push(restaurantData);
            }

            setFavrotieRestaurantDatas(newFavoriteRestaurantDatas);
        }

        fetchData();
    }, []);

    const FavoriteRestaurantBody = () => {
        if (favoriteRestaurantDatas === undefined) {
            return (
                <div className="h-full grow">
                    <LoadingPage opacity={20} />
                </div>
            );
        } else if (favoriteRestaurantDatas === null) {
        } else {
            if (favoriteRestaurantDatas.length == 0) {
            } else {
                return (
                    <div className="full flex h-0 grow">
                        <div
                            className="
                                flex grow flex-col gap-y-4 overflow-y-auto
                            "
                        >
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
                                />
                            ))}
                        </div>
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex h-full flex-col pl-7 pr-7 pt-7">
            <div className="flex items-center space-x-10">
                <h1 className="big-title">Favourite</h1>
            </div>
            <hr className="my-4"></hr>
            <FavoriteRestaurantBody />
        </div>
    );
};

export default Favourite;
