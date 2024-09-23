import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const PurchaseCard = ({date, time, name, price, canteen, userLocation, orderStatus}) => {
    // date : 1 Sep 24, 11:09
    return (
        <>
            <div className="flex width-full h-36 mt-2 mb-5">
                <div className="flex h-full w-28 justify-center align-middle">
                    <img className="w-20 h-20 rounded-full bg-slate-500 mt-2"/>
                </div>
                <div className="flex flex-col ml-5 w-full space-y-2">
                    <h2 className="text-slate-400 text-lg">{date}, {time}</h2>
                    <div className="flex justify-between">
                        <div className="flex w-full">
                            <FontAwesomeIcon className="text-red-600 size-5 mr-1" icon={faLocationDot} />
                            <h2 className=" detail-font w-5/6">{name} - {canteen}</h2>
                        </div>
                        <h2 className="detail-font w-36">Total: ฿{price}</h2>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon className="text-green-700 size-5 mr-1" icon={faLocationDot} />
                        <h2 className=" detail-font">{userLocation}</h2>
                    </div>
                    
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-green-700">{orderStatus}</h2>
                        <button className="general-button" type="submit">
                            <h2 className="text-lg">Rate and give review</h2>
                        </button> 
                    </div>
                    
                    
                </div>
            </div>
            <hr className="border-t-2 border-gray-400 mt-2 mb-4 md:mt-2 lg:mt-2"/>
        </>
        
    );
}

export default PurchaseCard;