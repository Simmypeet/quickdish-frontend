
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const PickRestaurant = ({ merchant, setMerchant, axiosPrivate }) => {
    const [id, setId] = React.useState(0);
    const [ choice, setChoice ] = React.useState([]);

    const handleChange = (event) => {
        setId(event.target.value);
    };

    const getRestaurant = async () => {
        const response = await axiosPrivate.get(`/merchants/${merchant.merchant_id}/restaurants`); 
        const restaurantChoices = response.data.map((r) => ({
            name: r.name,
            id: r.id,
        }));
        setChoice(restaurantChoices);
    }

    useEffect(() => {
        getRestaurant();
    }, [merchant]); 

    return (
        <div className="flex justify-center object-cover">
            <img className="w-screen fixed top-0 blur-sm z-0" src="./loginBg.jpg"></img>
            <div className="absolute flex flex-col space-y-5 items-center w-96 h-96 top-60 rounded-md bg-white z-30">
                <h2 className="heading-font mt-12">Welcome back </h2>
                <h2 className="heading-font mt-12">{ merchant.username }</h2>
                <h2 className="card-info">Please choose your desired restaurants</h2>
                <div>
                <FormControl sx={{ m: 1, minWidth: 320 }}>
                    <InputLabel id="demo-simple-select-helper-label">Shops</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={id}
                    label="Shops"
                    onChange={handleChange}
                    >
                    
                    {
                        choice.map((c) => (
                            <MenuItem value={c.id}>{c.name}</MenuItem>
                        ))
                    }

                    </Select>
                </FormControl>
                </div>
                <button 
                    className="px-20 p-3 text-white bg-gradient-to-bl hover:from-pink-500 hover:to-orange-600 hover:bg-gradient-to-bl  from-orange-400 to-pink-500 justify-center align-middle text-center rounded-full"
                    onClick={() => setMerchant({...merchant, restaurant_id: id})}
                >Proceed</button>
            </div>
        </div>
    )
}

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
                restaurant_id: 0, 
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
        <>
        { merchant.restaurant_id !== 0 && merchant.username !== '' ?

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

        :

        <PickRestaurant merchant={merchant} setMerchant={setMerchant} axiosPrivate={axiosPrivate}></PickRestaurant>
            }

        </>
    )
}; 

export default MerchantDashboard;
