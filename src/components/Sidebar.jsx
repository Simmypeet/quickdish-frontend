import React from 'react'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBookmark, faComment,faClockRotateLeft,faUser, faUtensils, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

const SideBar = () => {
    const { setAuth } = useAuth();
    const logout = () => {
        setAuth({});
    }

    return (    
        <div 
            className='
                w-28 bg-gradient-to-b from-[#FC7413] to-[#A71818] h-full 
                rounded-xl justify-center text-center flex flex-col 
                overflow-y-hidden 
            '
        >
            <div className="flex flex-col w-full grow justify-between items-center py-7">
                <FontAwesomeIcon className="text-5xl text-white" icon={faUtensils} />
                <div className="flex flex-col space-y-10 items-center">
                    <NavLink to="/dashboard">
                        <button type="button" className="sidebar-button">
                            <FontAwesomeIcon icon={faHouse} className="sidebar-icon"/>
                        </button>
                    </NavLink>
                    <NavLink to="/dashboard/favourites">
                        <button type="button" className="sidebar-button">
                            <FontAwesomeIcon icon={faBookmark} className="sidebar-icon"/>
                        </button>
                    </NavLink>
                    <NavLink to="/dashboard/notification">
                        <button type="button" className="sidebar-button">
                            <FontAwesomeIcon icon={faComment} className="sidebar-icon"/>
                        </button>
                    </NavLink>
                    <NavLink to="/dashboard/purchase_history">
                        <button type="button" className="sidebar-button">
                            <FontAwesomeIcon icon={faClockRotateLeft} className="sidebar-icon" />
                        </button>
                    </NavLink>
                    <NavLink to="/dashboard/myprofile">
                        <button type="button" className="sidebar-button">
                            <FontAwesomeIcon icon={faUser} className="sidebar-icon"/>
                        </button>
                    </NavLink>
                </div>
                <FontAwesomeIcon className="sidebar-button text-3xl p-2" icon={faArrowRightFromBracket} onClick={logout}/>
            </div>
            
        </div>

    );
}

export default SideBar; 

