// @ts-check

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import IdleTag from './idleTag';
import React from 'react';

/**
 *
 * @param {{
 *  name: string,
 *  food: string,
 *  image: string,
 *  canteenName: string,
 *  busyness: string,
 *  queue: number,
 *  rating: number
 * }} param0
 * @returns
 */
const RestaurantCard = ({
    name,
    food,
    image,
    canteenName,
    busyness,
    queue,
    rating,
}) => {
    const [flag, setFlag] = useState(false);
    const handleFlag = () => {
        setFlag(!flag);
    };

    return (
        <div
            className="
                relative flex h-40 rounded-xl border-2 
                bg-white p-2 hover:shadow-lg md:h-60 lg:shadow-md
            "
        >
            {/* <img src={ img } alt="" /> */}
            <img
                className="aspect-square h-full w-auto rounded-xl object-cover object-center"
                src={image}
                alt=""
            />
            <div className="mx-2 flex grow flex-col justify-between md:mx-4 md:my-2">
                <div className="flex items-center justify-between">
                    <h2 className="sub-title line-clamp-1">{name}</h2>
                    <button type="button" onClick={handleFlag}>
                        {/* change to black when click  */}
                        {flag ? (
                            <FontAwesomeIcon className="size-4" icon={faFlag} />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                viewBox="0 0 448 512"
                            >
                                <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z" />
                            </svg>
                        )}
                    </button>
                </div>
                <hr className="mt-2 md:mt-3"></hr>
                <div className="mx-1 flex w-full grow flex-col py-2 md:justify-evenly md:space-y-2">
                    <div className="flex justify-between">
                        <h2 className="card-info">Status:</h2>
                        <h2 className="card-info">{busyness}</h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="card-info">Queue:</h2>
                        <h2 className="card-info">{queue}</h2>
                    </div>
                    <div className="hidden justify-between md:flex">
                        <h2 className="card-info">Rating:</h2>
                        <h2 className="card-info">{`${rating.toFixed(
                            1
                        )}/5`}</h2>
                    </div>
                    <div className="hidden justify-between md:flex">
                        <h2 className="card-info">Price:</h2>
                        <h2 className="card-info">$$$</h2>
                    </div>
                </div>
                {/* needed: fetch from db */}
                <div className="mx-1 flex">
                    <div className="flex w-0 grow overflow-x-clip">
                        <IdleTag name="Thai" />
                        <IdleTag name={canteenName} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
