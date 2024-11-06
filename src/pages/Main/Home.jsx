import CanteenCard from '../../components/CanteenCard';
import RestaurantCard from '../../components/RestaurantCard';
import CarouselComponent from '../../components/CarouselComponent';
import Banner from '../../components/Banner';
import QueueCard from '../../components/QueueCard';
import Header from '../../components/Header';
import CarouselAutomate from '../../components/CarouselAutomate';
import React from 'react';

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
                <RestaurantCard />
                <RestaurantCard />
            </div>
        </div>
    );
};

export default Home;
