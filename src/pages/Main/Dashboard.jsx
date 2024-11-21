

import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Home from "./Home";
import PurchaseHistory from "./PurchaseHistory";
import MyProfile from "./MyProfile";
import Favourite from "./Favourite";
import Notification from "./Notification";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import BottomBar from "../../components/BottomBar";
import RequireAuth from "../../components/RequireAuth";
import useUser from "../../hooks/useUser";
import { getUser } from "../../api/customerApi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { OrderDetail } from './OrderDetail';



//sidebar, header, link to other pages
const Dashboard = () => {
    const { user, setUser } = useUser();
    const axiosPrivate = useAxiosPrivate();

    const getProfileImg = async (customer_id) => {
        try{
            const response = await axiosPrivate.get(`/customers/${customer_id}/get_profile_img`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            return url;
        } catch (error) {
            console.error("Error fetching profile image: ", error);
            return null;
        }        
    }

    const getUserInfo = async () => {
    
        try{
            const response = await getUser(axiosPrivate); 
            const profile = await getProfileImg(response.id);
            setUser({
                firstname: response.first_name,
                lastname: response.last_name,  
                username: response.username, 
                email: response.email, 
                profile: profile,
                customer_id: response.id
            }
            ); 
        }catch(err){
            console.log("Error fetching user: ", err); 
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []); 


     return (
        <>
            <div className="flex w-full h-svh overflow-y-auto ">
                <div className="
                    sticky top-0 left-0 h-svh max-h-svh p-4 hidden md:block 
                    z-10
                ">
                    <SideBar />
                </div>

                <div 
                    className="flex flex-col w-0 grow"
                >
                    <div className="flex flex-col grow">
                        <Routes>
                            <Route path="/" element={
                                <div className='md:-ml-4 sticky top-0 z-10'>
                                    <Header/>
                                </div>
                            }/>
                        </Routes>

                        <div className="h-full p-2 md:pr-4 md:pl-0">
                            <Routes>

                                {/* for several roles = ['user', 'admin', 'staff'] */}
                                <Route element={<RequireAuth allowedRoles={'user'}/>}>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="purchase_history" element={<PurchaseHistory/>}/>
                                    <Route path="myprofile" element={<MyProfile/>}/>
                                    <Route path="favourites" element={<Favourite/>}/>
                                    <Route path="orders/:orderID" element={<OrderDetail/>}/>
                                </Route>

                            </Routes>
                        </div>
                    </div>
                    <div className="sticky bottom-0 md:hidden">
                        <BottomBar />
                    </div>
                </div>
            </div>
        </> 
    )
}; 


export default Dashboard;
