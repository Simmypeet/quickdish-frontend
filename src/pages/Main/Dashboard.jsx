// import React from "react";
// import SideBar from "../../components/SideBar";
// import Header from "../../components/Header";
// import Home from "./Home";
// import PurchaseHistory from "./PurchaseHistory";
// import MyProfile from "./MyProfile";
// import Favourite from "./Favourite";
// import Notification from "./Notification";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// import BottomBar from "../../components/BottomBar";
// import RequireAuth from "../../components/RequireAuth";


// //sidebar, header, link to other pages
// /**
//  *
//  * @param {{
//  *  children: React.ReactNode,
//  *  header: boolean
//  * }}  props
//  * @returns {React.ReactNode}
//  */
// const Dashboard = ({ children, header }) => {
//     return (

//         <>
//             <div className="flex w-full h-svh overflow-y-auto ">
//                 <div className="
//                     sticky top-0 left-0 h-svh max-h-svh p-4 hidden md:block 
//                     z-10
//                 ">
//                     <SideBar />
//                 </div>

//                 <div 
//                     className="flex flex-col w-0 grow"
//                 >
//                     <div className="grow">
//                         <Routes>
//                             <Route path="/" element={
//                                 <div className='md:-ml-4 sticky top-0 z-10'>
//                                     <Header/>
//                                 </div>
//                             }/>
//                         </Routes>

//                         <div className="p-2 md:pr-4 md:pl-0">
//                             <Routes>
//                                 <Route path="/" element={<Home/>}/>

//                                 {/* for several roles = ['user', 'admin', 'staff'] */}
//                                 <Route element={<RequireAuth allowedRoles={'user'}/>}> 
//                                     <Route path="purchase_history" element={<PurchaseHistory/>}/>
//                                     <Route path="myprofile" element={<MyProfile/>}/>
//                                     <Route path="favourites" element={<Favourite/>}/>
//                                     <Route path="notification" element={<Notification/>}></Route>
//                                 </Route>

//                             </Routes>

//                         </div>
//                     )}

//                     <div className="p-2 md:pl-0 md:pr-4">{children}</div>
//                 </div>
//                 <div className="sticky bottom-0 md:hidden">
//                     <BottomBar />
//                 </div>
//             </div>
//         </> 
//     )
// }; 


// export default Dashboard;

import React from "react";
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

//sidebar, header, link to other pages
const Dashboard = () => {
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
                    <div className="grow">
                        <Routes>
                            <Route path="/" element={
                                <div className='md:-ml-4 sticky top-0 z-10'>
                                    <Header/>
                                </div>
                            }/>
                        </Routes>

                        <div className="p-2 md:pr-4 md:pl-0">
                            <Routes>
                                <Route path="/" element={<Home/>}/>

                                {/* for several roles = ['user', 'admin', 'staff'] */}
                                <Route element={<RequireAuth allowedRoles={'user'}/>}> 
                                    <Route path="purchase_history" element={<PurchaseHistory/>}/>
                                    <Route path="myprofile" element={<MyProfile/>}/>
                                    <Route path="favourites" element={<Favourite/>}/>
                                    <Route path="notification" element={<Notification/>}></Route>
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
