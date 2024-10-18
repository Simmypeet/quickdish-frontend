import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faShoppingCart,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';
import { remove } from '../utils/array';
import SearchBar from './SearchBar';

const Header = () => {
    const [focus, setFocus] = useState(false);
    const [closeTag, setCloseTag] = useState(false);
    const [clickedFood, setclickedFood] = useState([]);

    const handleFocus = () => {
        console.log('focus');
        setCloseTag(false);
        setFocus(true);
    };
    const handleCloseTag = () => {
        console.log('close tag');
        setCloseTag(true);
    };

    const handleButtonClick = (foodName) => {
        setclickedFood((prevClickedFood) => {
            if (prevClickedFood.includes(foodName)) {
                console.log('remove' + foodName);
                return remove(prevClickedFood, foodName);
            } else {
                console.log('pick' + foodName);
                return [...prevClickedFood, foodName];
            }
        });
    };

    return (
        <div className="left-0 w-full bg-white shadow-md">
            <div
                className="
                    grid grid-cols-[auto_1fr] items-center 
                    px-3 py-4 md:px-5 lg:grid-cols-[auto_1fr_auto]
                "
            >
                {/* <button onClick={handleShowModel}> */}
                <div className="">
                    <h1 className="hidden sm:block sm:text-3xl md:text-4xl">
                        <span className="font-bold text-orange-600">Quick</span>
                        <span className="font-bold text-orange-400">Dish</span>
                    </h1>
                    <h1 className="mt-1 hidden text-xl font-semibold md:block">
                        What do you want to eat today?
                    </h1>
                </div>
                <div className="mx-4 flex flex-col self-center lg:mx-8">
                    <SearchBar />
                </div>
                <div className="hidden justify-end lg:flex">
                    <img
                        src=""
                        className="h-12 w-12 rounded-full bg-slate-500"
                        alt=""
                    />
                    <h1 className="title ml-3 mt-3">Arhway</h1>
                </div>
                {/* <div className="mt-14 mr-8">
                    <FontAwesomeIcon className="size-7" icon={faShoppingCart}/>
                    <div className="absolute w-7 h-5 top-16 right-4 bg-orange-500 rounded-2xl">
                        <h2 className="pl-2.5 pb-2">0</h2>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Header;
