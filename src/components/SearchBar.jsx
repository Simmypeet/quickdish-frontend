// @ts-check

import {
    faCircleCheck,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Tag from './Tag';
import { getRestaurant, searchRestaurants } from '../api/restaurantApi';
import {
    NavLink,
    replace,
    UNSAFE_DataRouterStateContext,
    useNavigate,
} from 'react-router-dom';
import useLocation from '../hooks/useLocation';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons/faLocationCrosshairs';

/**
 * @import { Restaurant } from '../types/restaurant'
 */

/**
 * @returns {React.ReactNode}
 */
const RecentAndPopular = () => (
    <div
        className="
            col-start-1 col-end-3 mx-4 flex flex-col py-3 lg:col-start-2 
            lg:col-end-3 lg:mx-8
        "
    >
        <div className="flex justify-between">
            <h1 className="">Recent & Popular food</h1>
        </div>

        {/* <div className="flex justify-start space-x-6">
                            <Tag name="Canteen1"/>
                            <Tag name="Canteen2"/>
                            <Tag name="Canteen3"/>
                            <Tag name="Canteen4"/>
                            <Tag name="Canteen5"/>
                        </div> */}
        <div className="mt-3 flex grow flex-wrap justify-start gap-y-2">
            {
                //global state : user's prev order
                [
                    'Krapao',
                    'Padthai',
                    'Japanese food',
                    'Dog',
                    'Cat',
                    'Bat',
                    'Rat',
                    'Bao',
                    'Test',
                ].map((foodName) => (
                    <Tag
                        key={foodName}
                        name={foodName}
                        handleButtonClick={() => {}}
                    />
                ))
            }
        </div>
    </div>
);

/**
 *
 * @param {{
 *  name: string,
 *  address: string,
 *  restaurantID: number,
 * }} props
 * @returns {React.ReactNode}
 */
const SearchResult = ({ name, address, restaurantID }) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="flex w-full items-center hover:bg-slate-100"
            onClick={() => {
                navigate(`/restaurants/${restaurantID}`, {
                    replace: true,
                });
            }}
        >
            <i
                className="
                    fa fa-location-arrow ml-2 rounded-full bg-orange-400 p-2 
                    text-white
                "
                aria-hidden="true"
            />

            <div
                className="
                    grow overflow-x-hidden p-1 px-2 hover:cursor-pointer
                    hover:bg-slate-100
                 "
            >
                <div className="font-semicbold line-clamp-1 text-start">
                    {name}
                </div>
                <div className="line-clamp-1 text-start font-light">
                    {address}
                </div>
            </div>
        </button>
    );
};

/**
 * @returns {React.ReactNode}
 */
const SearchBar = () => {
    const [focus, setFocus] = useState(false);
    const [text, setText] = useState('');
    const { location, setLocation } = useLocation();
    const [searchResult, setSearchResult] = useState(
        /** @type {Restaurant[]} */ ([])
    );
    const [openLocationModal, setLocationModal] = useState(false);

    useEffect(() => {
        // debounce for 100ms
        const timer = setTimeout(async () => {
            if (text === '') {
                setSearchResult([]);
                return;
            }

            const restaurantsIDs = await searchRestaurants(text, 10);
            let restaurants = [];

            for (const restaurantID of restaurantsIDs) {
                const restaurant = await getRestaurant(restaurantID);

                if (restaurant) {
                    restaurants.push(restaurant);
                }
            }

            setSearchResult(restaurants);
        }, 200);

        return () => clearTimeout(timer);
    }, [text, focus]);

    return (
        <div className="relative flex w-full flex-1 items-center">
            <div className="relative w-full">
                {focus && (
                    <button
                        className="
                            absolute right-0 top-0 my-auto grid h-full 
                            items-center
                        "
                    >
                        <i
                            className="
                                fa fa-times my-auto mr-4 text-slate-500 
                                hover:cursor-pointer
                            "
                            aria-hidden="true"
                            onClick={() => setFocus(false)}
                        />
                    </button>
                )}
                <input
                    className="
                        w-full rounded-lg border-none bg-white py-3 pl-10 
                        pr-10 text-black placeholder-gray-500 
                        ring-1 ring-gray-300 focus:ring-2
                        focus:ring-gray-500
                    "
                    type="text"
                    name="search"
                    placeholder="Search talk"
                    autoComplete="off"
                    aria-label="Search talk"
                    onFocus={() => setFocus(true)}
                    onBlur={(e) => {
                        if (e.relatedTarget == null) {
                            setFocus(false);
                        }
                    }}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />

                {focus && (
                    <div
                        className="
                            absolute float-end mt-1 w-full rounded-lg border
                            border-gray-300 bg-white drop-shadow-lg
                        "
                    >
                        {searchResult.length !== 0 ? (
                            <div className="flex flex-col gap-y-1 py-2">
                                {searchResult.map((restaurant) => (
                                    <SearchResult
                                        name={restaurant.name}
                                        address={restaurant.address}
                                        restaurantID={restaurant.id}
                                        key={restaurant.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <RecentAndPopular />
                        )}
                    </div>
                )}
            </div>
            <div className="relative h-full">
                {location ? (
                    <FontAwesomeIcon
                        className="absolute left-9 text-lg text-green-500"
                        icon={faCircleCheck}
                    />
                ) : null}
                <svg
                    className="ml-2 text-orange-400 lg:ml-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 100 100"
                    onClick={() => {
                        setLocationModal(!openLocationModal);
                    }}
                >
                    <path
                        fill="currentColor"
                        d="
                            M50.001 0C33.65 0 20.25 13.36 20.25 29.666c0 6.318 
                            2.018 12.19 5.433 17.016L46.37 82.445c2.897 3.785 
                            4.823 3.066 7.232-.2l22.818-38.83c.46-.834.822-1.722 
                            1.137-2.629a29.3 29.3 0 0 0 2.192-11.12C79.75 13.36 
                            66.354 0 50.001 0m0 13.9c8.806 0 15.808 6.986 15.808 
                            15.766S58.807 45.43 50.001 45.43c-8.805 
                            0-15.81-6.982-15.81-15.763S41.196 13.901 50 13.901
                        "
                    />
                    <path
                        fill="currentColor"
                        d="
                            m68.913 48.908l-.048.126l.042-.115zM34.006 
                            69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 
                            26.508 100 50 100s40-7.675 
                            40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 
                            3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 
                            9.143-32 9.143s-32-4.093-32-9.143c-.001-3.59 
                            7.266-6.691 17.945-8.174z
                        "
                        color="currentColor"
                    />
                </svg>

                {openLocationModal && !focus ? (
                    <div className="absolute right-0 float-end w-56 rounded-lg bg-slate-200 p-1 shadow-lg ">
                        <div className="flex h-full w-full items-center justify-center rounded-lg px-1 py-2 hover:bg-slate-300">
                            {
                                location ? (
                                    <FontAwesomeIcon
                                        className="mr-1 text-orange-600"
                                        icon={faLocationCrosshairs}
                                    />
                                ) : (
                                    <img
                                        className="mr-1 text-sm"
                                        src="./loading.svg"
                                    ></img>
                                ) //loading effect
                            }
                            <button>
                                <h2 className="font-semibold text-orange-600">
                                    Detect current location
                                </h2>
                            </button>
                        </div>

                        {location ? (
                            <form>
                                <textarea
                                    id="message"
                                    defaultValue={location.address}
                                    onChange={(e) => {
                                        if (location) {
                                            setLocation({
                                                latitude: location.latitude,
                                                longtitude: location.longtitude,
                                                address: e.target.value,
                                            });
                                        }
                                    }}
                                    rows={3} // Sets the number of visible lines in the textarea
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-slate-100 p-2"
                                />
                            </form>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <FontAwesomeIcon
                className="absolute left-2 top-2 mr-3 mt-1 size-6 text-gray-500"
                icon={faMagnifyingGlass}
            />
        </div>
    );
};

export default SearchBar;
