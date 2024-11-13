// @ts-check

import RestaurantCard from '../../components/RestaurantCard';
import CarouselComponent from '../../components/CarouselComponent';
import QueueCard from '../../components/QueueCard';
import CarouselAutomate from '../../components/CarouselAutomate';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// @ts-expect-error
import defaultRestaurant from '../../assets/defaultRestaurant.jpeg';
import { getOnGoingOrders, getOrderQueue } from '../../api/orderApi';
import { getRestaurant } from '../../api/restaurantApi';

/**
 * @import { Order, Queue } from '../../types/order';
 * @import { Restaurant } from '../../types/restaurant';
 */

/**
 * @returns {React.ReactNode}
 */
const Home = () => {
    /**
     * @typedef {Object} OngoingOrder
     *
     * @property {Queue} queue
     * @property {Order} order
     * @property {string} restaurantName
     */
    const [ongoingOrders, setOngoingOrders] = useState(
        /** @type{undefined | OngoingOrder[]} */ (undefined)
    );
    const axiosPrivate = useAxiosPrivate();

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
            )}

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
                <RestaurantCard
                    name={'First Restaurant'}
                    food={'Some Food'}
                    image={defaultRestaurant}
                    canteenName={'First Canteen'}
                    busyness={'Busy'}
                    queue={2}
                    rating={4.5}
                />
                <RestaurantCard
                    name={'First Restaurant'}
                    food={'Some Food'}
                    image={defaultRestaurant}
                    canteenName={'First Canteen'}
                    busyness={'Busy'}
                    queue={2}
                    rating={4.5}
                />
            </div>
        </div>
    );
};

export default Home;
