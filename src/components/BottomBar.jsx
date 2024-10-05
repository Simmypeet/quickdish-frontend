import { faBookmark, faClockRotateLeft, faComment, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BottomBar = () => (
    <div 
        className="
            w-full bg-gradient-to-b from-[#FC7413] to-[#A71818] h-16 flex 
            justify-around items-center
        "
    >
        <button type="button" className="sidebar-button text-2xl">
            <FontAwesomeIcon icon={faHouse} className="bottom-bar-icon"/>
        </button>
        <button type="button" className="sidebar-button text-2xl">
            <FontAwesomeIcon icon={faBookmark} className="bottom-bar-icon"/>
        </button>
        <button type="button" className="sidebar-button text-2xl">
            <FontAwesomeIcon icon={faComment} className="bottom-bar-icon"/>
        </button>
        <button type="button" className="sidebar-button text-2xl">
            <FontAwesomeIcon 
                icon={faClockRotateLeft} 
                className="bottom-bar-icon"
            />
        </button>
        <button type="button" className="sidebar-button text-2xl">
            <FontAwesomeIcon icon={faUser} className="bottom-bar-icon"/>
        </button>
    </div>
)

export default BottomBar;