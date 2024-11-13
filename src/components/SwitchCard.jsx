
import React, { useState } from 'react'

const SwitchCard = ({ title, description }) => {
    
    return (
        <div className="relative flex bg-slate-100 shadow-md rounded-xl p-5 m-5">
            <div className="w-3/4">
                <h1 className="title">{title}</h1>
                <h1>{description}</h1>
            </div>
            
            <div className="flex flex-1 justify-end items-end mt-5">
                <label className="relative inline-flex cursor-pointer mr-5">
                    <input id="switch" type="checkbox" className="peer sr-only" />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
            </div>
            

        </div>
    );
}; 

export default SwitchCard;