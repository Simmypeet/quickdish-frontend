// @ts-check

import RestaurantCard from '../../components/RestaurantCard';
import CarouselComponent from '../../components/CarouselComponent';
import QueueCard from '../../components/QueueCard';
import CarouselAutomate from '../../components/CarouselAutomate';
import React from 'react';

// @ts-expect-error
import defaultRestaurant from '../../assets/defaultRestaurant.jpeg';

const Home = () => {
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
