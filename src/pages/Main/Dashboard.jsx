import React, {useState} from "react";
import SideBar from "../../components/Sidebar";
import Header from "../../components/Header";
import Home from "./Home";
import PurchaseHistory from "./PurchaseHistory";
import MyProfile from "./MyProfile";
import Favourite from "./Favourite";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
//sidebar, header, link to other pages
const Dashboard = () => {
    return (
        <Router>
            <div className="flex">
                <div className="relative z-20">
                    <SideBar/>
                </div>
                <div className="flex-grow flex flex-col">
                    <div className="absolute top-32 right-0 left-0 md:left-40 sm:left-0">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                    </div>
                    <div className="absolute top-7 right-0 left-3 md:left-40 sm:left-0">
                        <Routes>
                            <Route path="/purchase_history" element={<PurchaseHistory/>}/>
                            <Route path="/myprofile" element={<MyProfile/>}/>
                            <Route path="/favourites" element={<Favourite/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    )
}; 

export default Dashboard;