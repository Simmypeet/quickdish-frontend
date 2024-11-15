import React from 'react';
import PurchaseCard from '../../components/PurchaseCard';
import ProfileHeader from '../../components/ProfileHeader';
import ReviewBody from '../../components/ReviewBody';
import ProfileBody from '../../components/ProfileBody';
import PhotoBody from '../../components/PhotoBody';
import NotiBody from '../../components/NotiBody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
    const menulist = ['Profile Overview', 'Reviews', 'Photos', 'Notification','Security'];
    //try call api and manage 
    return (
        <div className="p-8 ml-10 mr-20 h-screen">
            <div className="">
                <ProfileHeader/>
            </div>
        
            <div className="flex">
                <div className="fixed top-80 left-10 mt-5 md:left-44 sm:left-10 w-1/4 p-2 md:h-80 sm:h-96 flex flex-col bg-white border-2 border-slate-400 border-opacity-50 rounded-xl">
                    <div className="m-3 title">
                        ACTIVITIES
                    </div>
                    {
                        menulist.map((menu) => {
                            return (
                                <div key={menu} className=" p-3 hover:border-l-4 hover:border-orange-500 hover:bg-gradient-to-r hover:from-transparent hover:to-orange-500 hover:rounded-r-lg text-slate-500 hover:text-red-500">
                                    <h1 className=''>{menu}</h1>
                                </div>
                            )
                        })
                    }
                </div>

                {/* <div className="fixed flex-1 overflow-scroll top-72 left-[640px] w-3/5 h-full flex mt-5 "> */}
                <div className="fixed flex-1 overflow-scroll top-80 left-1/4 w-3/4 h-full flex mt-5 ">
                    <div className="md:w-4/5 md:ml-48 sm:ml-10 sm:w-full ml-10 w-full">
                        <div className="relative w-full flex flex-col rounded-2xl z-0">
                            {/* <ProfileBody/> */}
                            <ReviewBody/>
                            {/* <PhotoBody/> */}
                            {/* <NotiBody/> */}

                            {/* photo, notification, security */}
                        </div>
                    </div>
                </div>
                

            </div>
            
            
        </div>
    )
}

export default MyProfile;