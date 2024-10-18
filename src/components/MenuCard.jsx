// @ts-check

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

/**
 * @import { Menu } from "../types/restaurant";
 */

/**
 *
 * @param {{
 *  menu: Menu,
 *  image: string,
 *  onClick?: () => void,
 * }} props
 *
 * @returns {React.ReactNode}
 */
const MenuCard = ({ menu, image, onClick }) => {
    return (
        <div
            className="
                flex h-32 max-h-32 flex-row overflow-hidden rounded-2xl 
                bg-slate-50 shadow-lg hover:shadow-xl md:h-fit md:max-h-none
                md:w-64 md:max-w-64 md:flex-col
            "
        >
            <img
                src={image}
                className="
                    aspect-square h-full w-auto rounded-xl object-cover 
                    object-center p-2 drop-shadow-sm md:h-auto md:w-full 
                    md:rounded-none md:p-0 
              "
            />
            <div className="flex grow justify-between p-2">
                <div className="flex flex-col">
                    <div className="line-clamp-1 text-lg font-semibold">
                        {menu.name}
                    </div>
                    <div className="mt-4 line-clamp-1 text-sm">
                        {menu.description}
                    </div>
                    <div className="mt-4 line-clamp-1 text-sm">
                        {`฿${menu.price}`}
                    </div>
                    <div className="mt-4 hidden gap-x-2 md:flex">
                        <FontAwesomeIcon
                            className="self-center text-sm"
                            icon={faClock}
                        />
                        <div className="line-clamp-1 text-sm">
                            {menu.estimated_prep_time == null
                                ? 'Not Specified'
                                : `${menu.estimated_prep_time} mins`}
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    className="
                        mb-1 self-end rounded-full bg-green-400 p-2 text-sm
                        shadow-sm  hover:cursor-pointer hover:bg-green-500
                        hover:shadow-lg
                    "
                    icon={faPlus}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default MenuCard;
