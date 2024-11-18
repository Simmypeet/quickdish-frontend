import React, { useEffect, useState } from 'react';


const Mhome = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    //try call api and manage 
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };


    return (
        <div className="">
            {/* header */}
            <div className="">
                <div className="flex justify-between items-center">
                    <h1>Total Queue</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Date
                    </button>
                </div>
                
                <div className="flex space-x-5 my-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Current
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Pending Payment
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Completed
                    </button>
                </div>
            </div>

            {/* body */}
            <div className="w-5/6">
                {/* big one */}
                <div
                className="
                    relative flex h-40 rounded-xl border-2 
                    bg-white p-2 hover:shadow-lg md:h-60 lg:shadow-md
                    shadow-green-600/60
                "
                >
                    <img
                        className="aspect-square h-full w-auto rounded-xl object-cover object-center"
                        src="/profile.jpg"
                        alt=""
                    />
                    <div className="mx-2 flex grow flex-col justify-between md:mx-4 md:my-2">
                        <div className="flex items-center justify-between">
                            <h2 className="sub-title line-clamp-1">Burger</h2>
                            
                        </div>
                        <hr className="mt-2 md:mt-3"></hr>
                        <div className="mx-1 flex w-full grow flex-col py-2 md:justify-evenly md:space-y-2">
                            <div className="flex justify-between">
                                <h2 className="card-info">Status:</h2>
                                <h2 className="card-info">busy</h2>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="card-info">Queue:</h2>
                                <h2 className="card-info">10</h2>
                            </div>
                            <div className="hidden justify-between md:flex">
                                <h2 className="card-info">Rating:</h2>
                                <h2 className="card-info">5/5</h2>
                            </div>
                            <div className="hidden justify-between md:flex">
                                <h2 className="card-info">Price:</h2>
                                <h2 className="card-info">100</h2>
                            </div>
                        </div>
                        {/* needed: fetch from db */}
                       
                    </div>
                </div>







                <div className="">
                    <h1 className='my-6'>Your Orders</h1>
                    <h1>filter</h1>
                </div>
               

                {/* card */}
                <div className="mb-2">
                    <div className={`bg-slate-400 w-full h-20 ${isExpanded ? "rounded-t-lg" : "rounded-lg"} flex items-center justify-center space-x-16`}>
                        <img src="/profile.jpg" className="w-20 h-16 pl-2 rounded-lg" alt="Profile" />
                        <h1>Order ID</h1>
                        <h1>Menu Name</h1>
                        <h1>Takeaways</h1>
                        <h1>Price</h1>
                        <h1>Status</h1>
                        {/* Toggle Icon */}
                        <button
                            onClick={toggleExpand}
                            className="text-lg font-bold flex items-center"
                        >
                            {isExpanded ? "▲" : "▼"}
                        </button>
                    </div>

                    {/* Expanded Content */}
                
                    <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? "max-h-40 p-4" : "max-h-0 p-0"
                    } bg-slate-400 rounded-b-lg w-full `}
                    >
                        <p>Additional details about the order can go here:</p>
                        <ul className="list-disc list-inside">
                            <li>Customer Name: John Doe</li>
                            <li>Pickup Time: 2:30 PM</li>
                            <li>Special Requests: Extra spicy</li>
                        </ul>
                    </div>
                </div>
                {/* card */}


                
                

            </div>
            
        </div>
        
    ); 
    
}


export default Mhome;