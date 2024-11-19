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


const Header = ({username}) => {
    // const { user, setUser } = useUser();
    const [ user, setUser ] = useState({
        username: username,
        profile: '/profile.jpg'
    }); 

    const [focus, setFocus] = useState(false);
    const [closeTag, setCloseTag] = useState(false);
    const [clickedFood, setclickedFood] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null); 

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
                    <h1 className="sm:block text-4xl">
                        <span className="font-bold text-orange-600">Quick</span>
                        <span className="font-bold text-orange-400">Dish</span>
                    </h1>
                    <h1 className="mt-1 text-xl font-semibold md:block">
                        For merchant
                    </h1>
                </div>

                
                <div className="hidden justify-end lg:flex">
                    <img
                        src={user.profile}
                        className="h-12 w-12 rounded-full bg-slate-500"
                        alt=""
                    />
                    {
                       user ?  <h1 className="title ml-3 mt-3">{user.username}</h1> :  <h1 className="title ml-3 mt-3">Login</h1>
                    }
                    
                </div>

                
            </div>
             {/* location */}
            
            
        </div>
    );
};

export default Header;