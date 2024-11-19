// @ts-check

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import ErrorPage from '../Others/Error';
import {
    getCanteenById,
    getCanteenImgFromId,
    getRestaurantsByCanteenId,
} from '../../api/canteenApi';
import { getRestaurant, getRestaurantImage } from '../../api/restaurantApi';

// @ts-expect-error
import defaultRestaurantImage from '../../assets/defaultRestaurant.jpeg';
import Header from '../../components/Header';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRestaurantQueue } from '../../api/orderApi';
import { faClock, faTicket } from '@fortawesome/free-solid-svg-icons';

/**
 * @import { Restaurant } from '../../types/restaurant';
 * @import { Canteen } from '../../types/canteen';
 * @import { Queue } from '../../types/order';
 */

/**
 * @typedef {Object} RestaurantData
 *
 * @property {Restaurant} restaurant
 * @property {Queue} queue
 * @property {string} image
 *
 */

/**
 * @typedef {Object} CanteenData
 *
 * @property {Canteen} canteen
 * @property {string} image
 * @property {Map<number, RestaurantData>} restaurants
 */

/**
 * @typedef {Object} CanteenContextType
 *
 * @property {CanteenData} canteenData
 * @property {React.Dispatch<React.SetStateAction<CanteenData>>} setCanteenData
 */

const CanteenContext = React.createContext(
    /** @type {CanteenContextType | undefined} */ (undefined)
);

/**
 *
 * @param {{
 *  children: React.ReactNode,
 *  canteenData: CanteenData
 * }} prop
 * @returns
 */
const CanteenProvider = ({ children, canteenData }) => {
    const [canteenDataState, setCanteenData] = useState(canteenData);

    return (
        <CanteenContext.Provider
            value={{
                canteenData: canteenDataState,
                setCanteenData,
            }}
        >
            {children}
        </CanteenContext.Provider>
    );
};

/**
 * @returns {CanteenContextType}
 */
const useCanteen = () => {
    const context = React.useContext(CanteenContext);

    if (context === undefined) {
        throw new Error('useCanteen must be used within a CanteenProvider');
    }

    return context;
};

/**
 *
 * @param {{
 *  restaurantData: RestaurantData,
 *  onClick?: () => void,
 * }} props
 *
 * @returns {React.ReactNode}
 */
const RestaurantCard = ({ restaurantData }) => {
    const navigate = useNavigate();

    return (
        <div
            className="
                flex h-32 max-h-32 flex-row overflow-hidden rounded-2xl 
                bg-slate-50 shadow-lg hover:shadow-xl md:h-fit md:max-h-none
                md:w-64 md:max-w-64 md:flex-col
            "
            onClick={() => {
                navigate(`/restaurants/${restaurantData.restaurant.id}`, {
                    replace: true,
                });
            }}
        >
            <img
                src={restaurantData.image}
                className="
                    aspect-square h-full w-auto rounded-xl object-cover 
                    object-center p-2 drop-shadow-sm md:h-auto md:w-full 
                    md:rounded-none md:p-0 
              "
            />
            <div className="flex grow justify-between p-2">
                <div className="flex flex-col gap-y-2">
                    <div className="line-clamp-1 text-lg font-semibold">
                        {restaurantData.restaurant.name}
                    </div>
                    <div className="line-clamp-1 text-sm font-semibold">
                        {restaurantData.restaurant.open ? (
                            <span className="text-green-600">Open</span>
                        ) : (
                            <span className="text-red-600">Closed</span>
                        )}
                    </div>
                    <div className="line-clamp-1 flex gap-x-2 text-sm">
                        <FontAwesomeIcon
                            className="self-center text-slate-600"
                            icon={faTicket}
                        />
                        {restaurantData.restaurant.open ? (
                            restaurantData.queue.queue_count == 0 ? (
                                `No queue`
                            ) : (
                                `${restaurantData.queue.queue_count} queue(s)`
                            )
                        ) : (
                            <div>No queue</div>
                        )}
                    </div>
                    <div className="flex gap-x-2">
                        <FontAwesomeIcon
                            className="self-center text-sm text-slate-600"
                            icon={faClock}
                        />
                        <div className="line-clamp-1 text-sm">
                            {restaurantData.queue.estimated_time == 0 ? (
                                <div>No Waiting Time</div>
                            ) : (
                                <div>
                                    Waiting Time:{' '}
                                    {restaurantData.queue.estimated_time} min(s)
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MainPage = () => {
    const { canteenData } = useCanteen();

    return (
        <div className="flex min-h-svh flex-col">
            <div className="sticky top-0 z-[10]">
                <Header />
            </div>
            <div className="relative">
                <img
                    src={canteenData.image}
                    className="
                      h-52 w-full object-cover object-center drop-shadow-2xl
                    "
                />
                <div className="absolute left-0 right-0 top-16">
                    <div
                        className="
                            mx-4 rounded-xl bg-slate-50 p-4 drop-shadow-xl 
                            md:mx-auto md:w-fit md:min-w-[50%]
                        "
                    >
                        <div className="flex justify-between pb-4">
                            <div className="h-fit text-2xl font-semibold">
                                {canteenData.canteen.name}
                            </div>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="self-center"
                            />
                        </div>
                        <hr></hr>
                        <div>
                            <div className="flex justify-between p-1 text-sm">
                                <div>Total Restaurant(s)</div>
                                <div>{canteenData.restaurants.size}</div>
                            </div>
                            <hr></hr>
                            <div className="flex justify-between p-1 text-sm">
                                <div>Opened Restaurant(s)</div>
                                <div>
                                    {
                                        Array.from(
                                            canteenData.restaurants.values()
                                        ).filter(
                                            (restaurant) =>
                                                restaurant.restaurant.open
                                        ).length
                                    }
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex justify-between p-1 text-sm">
                                <div>Total Queue(s)</div>
                                <div>
                                    {Array.from(
                                        canteenData.restaurants.values()
                                    ).reduce(
                                        (acc, restaurant) =>
                                            acc + restaurant.queue.queue_count,
                                        0
                                    )}
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="
                    mx-4 mt-12 flex grow flex-col gap-x-2 gap-y-2 md:flex-row
                    md:flex-wrap md:justify-center
                "
            >
                {Array.from(canteenData.restaurants.values()).map(
                    (restaurantData) => (
                        <RestaurantCard
                            key={restaurantData.restaurant.id}
                            restaurantData={restaurantData}
                        />
                    )
                )}
            </div>
        </div>
    );
};

/**
 * @returns {React.ReactNode}
 */
const CanteenPage = () => {
    const { canteenID: canteenIDString } = useParams();

    if (canteenIDString == null) {
        throw new Error('Restaurant ID is not provided');
    }

    const [canteen, setCanteen] = useState(
        /** @type {CanteenData | undefined | null}*/
        (undefined)
    );

    const canteenID = parseInt(canteenIDString);

    useEffect(() => {
        const getData = async () => {
            try {
                const canteen = await getCanteenById(canteenID);
                const image = await getCanteenImgFromId(canteenID);
                const map = /** @type{Map<number, RestaurantData>}*/ (
                    new Map()
                );
                const restaurantIds = await getRestaurantsByCanteenId(
                    canteenID
                );

                for (const restaurantId of restaurantIds) {
                    const restaurant = await getRestaurant(restaurantId);
                    const restaurantImage = await getRestaurantImage(
                        restaurantId
                    );
                    const queue = await getRestaurantQueue(restaurantId);

                    map.set(restaurantId, {
                        restaurant,
                        image: restaurantImage
                            ? URL.createObjectURL(restaurantImage)
                            : defaultRestaurantImage,
                        queue,
                    });
                }

                setCanteen({
                    canteen,
                    image: image
                        ? URL.createObjectURL(image)
                        : defaultRestaurantImage,
                    restaurants: map,
                });
            } catch {
                setCanteen(null);
            }
        };

        getData();
    }, [canteenIDString]);

    if (canteen === undefined) {
        return <LoadingPage opacity={true} />;
    } else if (canteen === null) {
        return <ErrorPage message="We couldn't find the canteen for you" />;
    } else {
        return (
            <CanteenProvider canteenData={canteen}>
                <MainPage />
            </CanteenProvider>
        );
    }
};

export default CanteenPage;
