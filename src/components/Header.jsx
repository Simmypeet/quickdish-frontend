import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faShoppingCart,
    faCircleXmark,
    faLocationCrosshairs, 
    faCircleCheck, 
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';
import { remove } from '../utils/array';
import SearchBar from './SearchBar';
import useLocation from '../hooks/useLocation';

const Header = () => {
    const [focus, setFocus] = useState(false);
    const [closeTag, setCloseTag] = useState(false);
    const [clickedFood, setclickedFood] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null); 
    const { userLocation, setUserLocation } = useLocation();
    const [ inputLocation, setInputLocation] = useState(userLocation.location || '');

    const handleFocus = () => {
        console.log('focus');
        setCloseTag(false);
        setFocus(true);
    }

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

    const toggleLocation = () => {
        setOpenModel(!openModel);
        console.log("click");
    }

    //problem
    //replace with google map api
    //ask permission only after login after user redirect to dashboard, only ask permission once
    //loading effect when fetching location

    //find user location
    const getLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setLatitude(position.coords.latitude); 
                    setLongitude(position.coords.longitude); 
                    try{
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json` 
                        );
                        const data = await response.json(); 
                        if(data && data.display_name){
                            setLocation(data.display_name); 
                            setUserLocation({ location: data.display_name, latitude: latitude, longitude: longitude });
                        }else{
                            console.error("Address not found"); 
                        }

                    }catch(error){
                        console.error("Error fetching address: ", error); 
                    } 
                },
                (error) => console.error("Error getting location:", error)
            ); 
        }else{
            console.log("Geolocation is not supported by this browser"); 
        }
    }

    //ask user permission
    useEffect(() => {
        if (userLocation.location) return;
        const askPermission = window.confirm("Do you allow us to access your location?"); 
        if(askPermission){
            getLocation(); 
        }
    }, [userLocation.location]); 

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

                <div className="flex flex-col self-center mx-4 lg:mx-8"> 
                    <div className="relative w-full flex flex-1 items-center">
                        <input type="text"
                            name="search"
                            placeholder="Search talk"
                            autoComplete="off"
                            aria-label="Search talk"
                            onFocus={handleFocus}
                            className="w-full pl-10 py-3 font-semibold placeholder-gray-500 bg-white text-black rounded-full border-none ring-1 ring-gray-300 focus:ring-gray-500 focus:ring-2"/>
                        <div className="relative">
                            
                            {
                                userLocation.location ? <FontAwesomeIcon className='absolute left-9 text-lg text-green-500' icon={faCircleCheck} /> : null
                            }
                            <svg 
                            className="text-orange-600 ml-2 lg:ml-4" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="2em" height="2em" 
                            viewBox="0 0 100 100"
                            onClick={toggleLocation}
                            >
                                <path fill="currentColor" d="M50.001 0C33.65 0 20.25 13.36 20.25 29.666c0 6.318 2.018 12.19 5.433 17.016L46.37 82.445c2.897 3.785 4.823 3.066 7.232-.2l22.818-38.83c.46-.834.822-1.722 1.137-2.629a29.3 29.3 0 0 0 2.192-11.12C79.75 13.36 66.354 0 50.001 0m0 13.9c8.806 0 15.808 6.986 15.808 15.766S58.807 45.43 50.001 45.43c-8.805 0-15.81-6.982-15.81-15.763S41.196 13.901 50 13.901"></path><path fill="currentColor" d="m68.913 48.908l-.048.126l.042-.115zM34.006 69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 26.508 100 50 100s40-7.675 40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 9.143-32 9.143s-32-4.093-32-9.143c-.001-3.59 7.266-6.691 17.945-8.174z" color="currentColor"></path></svg>
                        </div>
                        
                        <FontAwesomeIcon className="absolute left-2 top-2 size-6 text-gray-500 mr-3 mt-1" icon={faMagnifyingGlass} />
                    </div>
                    
                </div>
                
                <div className="hidden justify-end lg:flex">
                    <img
                        src=""
                        className="h-12 w-12 rounded-full bg-slate-500"
                        alt=""
                    />
                    <h1 className="title ml-3 mt-3">Arhway</h1>
                </div>

                { focus && !closeTag ? 
                    <div 
                        className="
                            flex flex-col py-3 col-start-1 col-end-3 
                            lg:col-start-2 lg:col-end-3 mx-4 lg:mx-8
                        "
                    >
                        <div className='flex justify-between'>
                            <h1 className=''>Recent & Popular food</h1>
                            <button type="button" className='self-end' onClick={handleCloseTag}>
                                <FontAwesomeIcon className="" icon={faCircleXmark} />
                            </button>
                        </div>
                        
                       
                        <div className="grow flex flex-wrap justify-start mt-3 gap-y-2">
                            {
                                //global state : user's prev order
                                ['Krapao', 'Padthai', 'Japanese food', 'Dog', 'Cat', 'Bat', 'Rat', 'Bao', 'Test'].map((foodName) => (
                                    <Tag key={foodName} name={foodName} handleButtonClick={handleButtonClick}/>
                                ))
                            }
                            
                        </div>
                        
                    </div> : null
                }

            </div>

             {/* location */}
            {
                openModel ? 
                <div className="absolute top-28 p-1 right-20 w-56 bg-slate-200 rounded-lg shadow-lg ">
                    <div className="w-full h-full py-2 px-1 flex items-center justify-center rounded-lg hover:bg-slate-300">
                       {
                        userLocation.location ? <FontAwesomeIcon className='text-orange-600 mr-1' icon={faLocationCrosshairs} /> : <img className="text-sm mr-1" src="./loading.svg"></img> //loading effect
                       }
                       
                        <button onClick={getLocation}>
                            <h2 className='text-orange-600 font-semibold'>Detect current location</h2>
                        </button>
                    </div>
                       
                    {
                        userLocation.location ? 
                        <form>
                            <textarea
                                id="message"
                                defaultValue={userLocation.location}
                                onChange={(e) => setInputLocation(e.target.value)}
                                rows="3" // Sets the number of visible lines in the textarea
                                className="mt-1 block w-full bg-slate-100 p-2 border border-gray-300 rounded-md"
                                />
                        </form>
                        : null
                    }
                    
                </div>
                : null
            }
            
        </div>
    );
};

export default Header;
