import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBookmark, faComment, faClockRotateLeft, faUser, faUtensils, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  return (
    <>
      {/* Vertical Sidebar for large screens */}
      <div
        className="
          hidden lg:flex w-60 bg-gradient-to-b from-[#FC7413] to-[#A71818] md:h-screen 
          flex-col justify-between py-7 px-4 
        "
      >
        {/* Logo */}
        <div className="text-5xl text-white flex justify-center mb-10">
          <FontAwesomeIcon icon={faUtensils} />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col items-start space-y-6">
        <NavLink to="/dashboard/favourites" className="w-full">
            <div
              className="
                flex items-center space-x-3 hover:bg-white hover:text-black 
                px-4 py-2 rounded-md
              "
            >
              <FontAwesomeIcon icon={faHouse} className="text-2xl text-white" />
              <h2 className="text-white text-lg">Dashboard</h2>
            </div>
          </NavLink>
    
          
          <NavLink to="/dashboard/favourites" className="w-full">
            <div
              className="
                flex items-center space-x-3 hover:bg-white hover:text-black 
                px-4 py-2 rounded-md
              "
            >
              <FontAwesomeIcon icon={faBookmark} className="text-2xl text-white" />
              <h2 className="text-white text-lg">Menus</h2>
            </div>
          </NavLink>
          <NavLink to="/dashboard/notification" className="w-full">
            <div
              className="
                flex items-center space-x-3 hover:bg-white hover:text-black 
                px-4 py-2 rounded-md
              "
            >
              <FontAwesomeIcon icon={faComment} className="text-2xl text-white" />
              <h2 className="text-white text-lg">Sales</h2>
            </div>
          </NavLink>
          <NavLink to="/dashboard/purchase_history" className="w-full">
            <div
              className="
                flex items-center space-x-3 hover:bg-white hover:text-black 
                px-4 py-2 rounded-md
              "
            >
              <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl text-white" />
              <h2 className="text-white text-lg">User reviews</h2>
            </div>
          </NavLink>
          <NavLink to="/dashboard/myprofile" className="w-full">
            <div
              className="
                flex items-center space-x-3 hover:bg-white hover:text-black 
                px-4 py-2 rounded-md
              "
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
              <h2 className="text-white text-lg">Profile</h2>
            </div>
          </NavLink>
        </div>

        {/* Logout */}
        <div
          className="
            text-3xl text-white hover:bg-white hover:text-black 
            p-4 rounded-full mt-10 flex justify-center
          "
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </div>

      {/* Horizontal Bottom Bar for medium or smaller screens */}
      <div
        className="
          fixed bottom-0 w-full bg-gradient-to-b from-[#FC7413] to-[#A71818] 
          flex justify-center space-x-8 py-4 h-20 lg:hidden
        "
      >
        <NavLink to="/dashboard">
          <div
            className="
              flex flex-col items-center space-y-1 
              hover:bg-white hover:text-black px-4 py-2 rounded-md
            "
          >
            <FontAwesomeIcon icon={faHouse} className="text-2xl text-white" />
          </div>
        </NavLink>
        <NavLink to="/dashboard/favourites">
          <div
            className="
              flex flex-col items-center space-y-1 
              hover:bg-white hover:text-black px-4 py-2 rounded-md
            "
          >
            <FontAwesomeIcon icon={faBookmark} className="text-2xl text-white" />
          </div>
        </NavLink>
        <NavLink to="/dashboard/notification">
          <div
            className="
              flex flex-col items-center space-y-1 
              hover:bg-white hover:text-black px-4 py-2 rounded-md
            "
          >
            <FontAwesomeIcon icon={faComment} className="text-2xl text-white" />
          </div>
        </NavLink>
        <NavLink to="/dashboard/purchase_history">
          <div
            className="
              flex flex-col items-center space-y-1 
              hover:bg-white hover:text-black px-4 py-2 rounded-md
            "
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl text-white" />
          </div>
        </NavLink>
        <NavLink to="/dashboard/myprofile">
          <div
            className="
              flex flex-col items-center space-y-1 
              hover:bg-white hover:text-black px-4 py-2 rounded-md
            "
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
          </div>
        </NavLink>

        {/* Logout */}
        <div
          className="
            text-3xl text-white hover:text-black 
            p-1 rounded-full
          "
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </div>
    </>
  );
};

export default SideBar;