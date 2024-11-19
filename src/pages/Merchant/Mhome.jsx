import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderCard from '../../components/Merchant/MorderCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

import axios from 'axios'; //temp -> axiosPrivate


//new endpoint : update order status 
const Mhome = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const currentDate = new Date(); 
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    //logic
    const [state, setState] = React.useState("ORDERED"); //default state change 
    const [orders, setOrders] = React.useState([]); //pop first order when merchant clicks finish order
    const [loading, setLoading] = React.useState(true);
    const handleState = (status) => {
        setState(status);
    }

    const fetchAllOrder = async (status) => {
        handleState(status);
        try{
            const orders_raw = []; 
            //get restaurant id
            const response = await axiosPrivate.get(`http://127.0.0.1:8000/orders/restaurant_id=${restaurant_id}&?status=${status}`); 
            for(let order of response.data){
                let temp = {};
               
                temp["order_id"] = order.id; 
                temp["menu_id"] = order.items[0]["menu_id"]; 
                temp["extra_requests"] = order.items[0]["extra_requests"]; 
                temp["price_paid"] = order.price_paid; 
                temp["order_status"] = status; 
                temp["ordered_at"] = order.ordered_at;
                orders_raw.push(temp);
            }
            
            setOrders(orders_raw);
        }catch(error){
            console.error("Error fetching orders:", error);
        }finally{
            setLoading(false);
        }
    }

    const updateOrderState = async (order_id, status) => {

    }

    return (
        <div className="">
            {/* header */}
            <div className="">
                <div className="flex justify-between items-center">
                    <h1 className='heading-font'>Total Queues</h1>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                        {formattedDate}
                    </button>
                </div>
                
                <div className="flex space-x-5 my-5">
                    <button 
                        className={` ${state === "ORDERED" ? "bg-orange-500 " : "bg-slate-500 "} text-white font-bold py-2 px-4 rounded-full`}
                        onClick={() => fetchAllOrder("ORDERED")} 
                        >
                        Current
                    </button>
                    <button 
                    className={`${state === "READY" ? "bg-yellow-500 " : "bg-slate-500 "} text-white font-bold py-2 px-4 rounded-full`}
                    onClick={() => fetchAllOrder("READY")}
                    >
                        Pending Payment
                    </button>
                    <button 
                    className={` ${state === "COMPLETED" ? "bg-green-500 " : "bg-slate-500 "} text-white font-bold py-2 px-4 rounded-full`}
                    onClick={() => fetchAllOrder("COMPLETED")}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {/* body */}
            <div className="w-5/6">
                {/* big one */}
                {
                    state === "ORDERED" ?
                    <div
                    className="
                        relative flex h-40 rounded-xl border-2 
                        bg-white p-2 hover:shadow-lg md:h-60 lg:shadow-md
                        shadow-green-600/60
                    "
                    >
                        <img
                            className="aspect-square h-full w-auto rounded-xl object-cover object-center"
                            src="/profile.jpg"
                            alt=""
                        />
                        <div className="mx-2 flex grow flex-col justify-between md:mx-4 md:my-2">
                            <div className="flex items-center justify-between">
                                <h2 className="sub-title line-clamp-1">Burger</h2>
                                
                            </div>
                            <hr className="mt-2 md:mt-3"></hr>
                            <div className="mx-1 flex w-full grow flex-col py-2 md:justify-evenly md:space-y-2">
                                <div className="flex justify-between">
                                    <h2 className="card-info">Details</h2>
                                    <h2 className="card-info">Status</h2>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <h2 className="card-info">Foodname x Quantity</h2>
                                        <h2 className="card-info">Price</h2>
                                    </div>
                                    <h2 className="card-info">Order details</h2>
                                </div>
                            
                                <div className="hidden justify-end md:flex">
                                    <button 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                        Order Completed
                                    </button>
                                </div>
                            </div>
                            {/* needed: fetch from db */}
                        
                        </div>
                    </div> : 

                    null

                }

                <div className="">
                    <h1 className='heading-font my-6'>Ongoing Orders</h1>
                    <h1>filter</h1>
                </div>
               

                {/* card */}
                {
                    orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            order_id={order.order_id}
                            menu_id={order.menu_id}
                            price={order.price_paid}
                            status={order.order_status}
                            order_request={order.extra_requests}
                            order_at={order.ordered_at}
                        />
                    ))
                }
                {/* <OrderCard order_id={1} menu_id={2} price={90} status="Cooking" order_request={"Not spicy"} order_at={"12.00"} ></OrderCard> */}
                {/* card */}

            </div>
            
        </div>
        
    ); 
    
}


export default Mhome;