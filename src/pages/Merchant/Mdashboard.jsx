
import React from "react";
import { useEffect } from "react";
import SideBar from "../../components/Merchant/Msidebar";
import Header from "../../components/Merchant/Mheader";
import Mhome from "./Mhome";
import { getMerchant } from "../../api/merchantApi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useMerchant from "../../hooks/useMerchant";
import useAuth from '../../hooks/useAuth';
import { Route, Routes } from 'react-router-dom';
import Mmenu from "./Mmenu";
import MuserReview from "./MuserReview";
import Msales from "./Msales";


//sidebar, header, link to other pages
const MerchantDashboard = () => {
    const { auth } = useAuth();
    const { merchant, setMerchant } = useMerchant();
    const axiosPrivate = useAxiosPrivate();
    const getMerchantInfo = async () => {
        try{

            const response = await getMerchant(axiosPrivate); 
            // const profile = await getProfileImg(response.id);
            console.log("response: ", response);
            setMerchant({
                firstname: response.first_name,
                lastname: response.last_name,  
                username: response.username, 
                email: response.email, 
                profile: '',
                restaurant_id: 4, 
                merchant_id: response.id
            }
            ); 
        }catch(err){
            console.log("Error fetching user: ", err); 
        }
    }

    useEffect(() => {
        console.log("auth token : ", auth.accessToken);
        if(auth.accessToken){
            getMerchantInfo();
        }
        // fetchAllOrder("ORDERED");
    }, [auth.accessToken]);


    return (
        <div className="flex">
            <div className="
                    fixed top-0 left-0 h-svh max-h-svh block md:block sm:block
                    z-10
                ">
                <SideBar/>
            </div>
            <div className="flex-grow flex-1 flex flex-col relative ">
                <div className="fixed top-0 lg:left-60 left-0 right-0 z-10">
                    {
                        merchant.username ?
                        <Header username={merchant.username}/>
                        : null
                    }
                    
                </div>
                <div className="absolute top-32 left-72 right-10 ">
                    {/* <Mhome/> */}
                    <Routes>
                        <Route path="/" element={<Mhome/>}/>

                        {/* for several roles = ['user', 'admin', 'staff'] */}
                        <Route path="menu" element={<Mmenu/>}/>
                        <Route path="review" element={<MuserReview/>}/>
                        <Route path="sales" element={<Msales/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    )
}; 

export default MerchantDashboard;
