import React from 'react';
import SearchBar from './SearchBar';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    // const getCustomerData = async() => {
    //     try{
    //         const response = await axiosPrivate.get('http://127.0.0.1:8000/customers/me');
    //         setUser(response.data);
    //     }catch(err){
    //         console.log("Error fetching: ", err);
    //     }
    // }

    //problem
    //ask permission only once
    //store user location in local storage ?

    //find user location

    return (
        <div className="left-0 w-full bg-white shadow-md">
            <div
                className="
                    grid grid-cols-[auto_1fr] items-center 
                    px-3 py-4 md:px-5 lg:grid-cols-[auto_1fr_auto]
                "
            >
                <div className="">
                    <h1
                        className="
                            hidden cursor-pointer sm:block sm:text-3xl 
                            md:text-4xl
                        "
                        onClick={() => {
                            navigate('/dashboard', { replace: true });
                        }}
                    >
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
                        src={user.profile}
                        className="h-12 w-12 rounded-full bg-slate-500"
                        alt=""
                    />
                    {user ? (
                        <h1 className="title ml-3 mt-3">{user.username}</h1>
                    ) : (
                        <h1 className="title ml-3 mt-3">Login</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
