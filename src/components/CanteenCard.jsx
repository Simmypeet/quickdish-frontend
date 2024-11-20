// @ts-check

import React from 'react';

/**
 *
 * @param {{
 *  canteenName: string;
 *  img: string;
 *  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
 * }} prop
 * @returns {React.ReactNode}
 */
const CanteenCard = ({ canteenName, img, onClick }) => {
    return (
        <div
            className="
                relative mb-10 mt-3 h-64 w-full rounded-2xl drop-shadow-md 
                hover:shadow-xl
            "
            onClick={onClick}
        >
            {/* <div className="w-full h-full rounded-2xl bg-slate-300">
                
            </div> */}
            {/* <div className="fixed bg-gradient-to-b from-transparent via-transparent to-black rounded-2xl w-96 mr-2 h-64 z-10"></div> */}
            <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black"></div>
            {/* <img className="w-full h-full rounded-2xl object-cover" src={img} alt="" /> */}
            <img
                className="h-full w-full rounded-2xl object-cover"
                src={img}
                alt=""
            />

            <h1 className="absolute bottom-5 left-7 z-20 text-lg text-white">
                {canteenName}
            </h1>
        </div>
    );
};

export default CanteenCard;
