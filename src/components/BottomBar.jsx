// @ts-check

import {
    faBookmark,
    faClockRotateLeft,
    faComment,
    faHouse,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
    const navigate = useNavigate();
    return (
        <div
            className="
                flex h-16 w-full items-center justify-around bg-gradient-to-b 
                from-[#FC7413] to-[#A71818]
            "
        >
            <button
                type="button"
                className="sidebar-button text-2xl"
                onClick={() => {
                    navigate('/dashboard', { replace: true });
                }}
            >
                <FontAwesomeIcon icon={faHouse} className="bottom-bar-icon" />
            </button>
            <button
                type="button"
                className="sidebar-button text-2xl"
                onClick={() => {
                    navigate('/dashboard/favourites', { replace: true });
                }}
            >
                <FontAwesomeIcon
                    icon={faBookmark}
                    className="bottom-bar-icon"
                />
            </button>
            <button type="button" className="sidebar-button text-2xl">
                <FontAwesomeIcon icon={faComment} className="bottom-bar-icon" />
            </button>
            <button
                type="button"
                className="sidebar-button text-2xl"
                onClick={() => {
                    navigate('/dashboard/purchase_history', { replace: true });
                }}
            >
                <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className="bottom-bar-icon"
                />
            </button>
            <button
                type="button"
                className="sidebar-button text-2xl"
                onClick={() => {
                    navigate('/dashboard/myprofile', { replace: true });
                }}
            >
                <FontAwesomeIcon icon={faUser} className="bottom-bar-icon" />
            </button>
        </div>
    );
};

export default BottomBar;
