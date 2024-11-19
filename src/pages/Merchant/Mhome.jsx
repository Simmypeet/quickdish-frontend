import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderCard from '../../components/Merchant/MorderCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import useMerchant from '../../hooks/useMerchant';
import { getMenuImage, getMenu } from '../../api/restaurantApi';
import axios from 'axios'; //temp -> axiosPrivate

//get total queue
//new endpoint : update order status 

const Mhome = () => {
    const { auth } = useAuth();
    const { merchant } = useMerchant();
    const axiosPrivate = useAxiosPrivate();
    const currentDate = new Date(); 
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    //logic
    const [state, setState] = React.useState("ORDERED"); //default state change 
    const [orders, setOrders] = React.useState([]); //pop first order when merchant clicks finish order
    const [loading, setLoading] = React.useState(true);

    const fetchAllOrder = async (status) => {
        setState(status);
        setLoading(true); 
        try{
            const orders_raw = []; 
            //get restaurant id
            const response = await axiosPrivate.get(`http://127.0.0.1:8000/orders/?restaurant_id=${merchant.restaurant_id}&status=${status}`); 
            console.log("response: ", response.data);
            for(let order of response.data){
                let temp = {};
                let menu_id = order.items[0]["menu_id"]; 
                let menu_response = await getMenu(menu_id);
                let menu_img = URL.createObjectURL(await getMenuImage(menu_id));
                temp["order_id"] = order.id; 
                temp["menu_id"] = menu_id; 
                temp["menu_name"] = menu_response.name;
                temp["menu_quantity"] = order.items[0]["quantity"];
                temp["menu_img"] = menu_img;
                temp["menu_prep_time"] = menu_response.estimated_prep_time;
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

    useEffect(() => {
        // Run fetchAllOrder("ORDERED") when component mounts
        if(merchant.restaurant_id){
            fetchAllOrder("ORDERED");
        }
    }, [merchant.restaurant_id]);
        

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
                {/* Big Card */}
                {orders.length > 0 ? (
                    <div
                        className="
                            relative flex h-40 rounded-xl border-2 
                            bg-white p-2 hover:shadow-lg md:h-60 lg:shadow-md
                            shadow-green-600/60
                        "
                    >
                        <img
                            className="aspect-square h-full w-auto rounded-xl object-cover object-center"
                            src={orders[0].menu_img}
                            alt="Order Image"
                        />
                        <div className="mx-2 flex grow flex-col justify-between md:mx-4 md:my-2">
                            <div className="flex items-center justify-between">
                                <h2 className="sub-title line-clamp-1">
                                    {state === "ORDERED" ? `Order ID: ${orders[0].order_id}` : "Not Available"}
                                </h2>
                            </div>
                            <hr className="mt-2 md:mt-3"></hr>
                            <div className="mx-1 flex w-full grow flex-col py-2 md:justify-evenly md:space-y-2">
                                <div className="flex justify-between">
                                    <h2 className="">Order details:</h2>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">
                                        <h2>
                                            {state === "ORDERED" ? ` ${orders[0].menu_name} x ${orders[0].menu_quantity}` : "No details available"}
                                        </h2>
                                        <h2>Dine-in</h2>
                                        <h2 className="text-red-500">
                                            {state === "ORDERED" ? `Extra requests: ${orders[0].extra_requests}` : "No details available"}
                                        </h2>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                       
                                        <h2 >
                                        Price : {state === "ORDERED" ? `${orders[0].price_paid} ฿` : "N/A"}
                                        </h2>
                                        <h2 className="text-green-500">
                                        Status : {state === "ORDERED" ? 'Preparing' : "N/A"}
                                        </h2>
                                    </div>
                                    
                                </div>

                                {state === "ORDERED" && (
                                    <div className="hidden justify-end md:flex">
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            Order Completed
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : 
                   null
                }


                <div className="">
                    <h1 className='heading-font my-6'>Ongoing Orders</h1>
                </div>
               

                {/* card */}
                { loading ? (
                    <div className="flex justify-center items-center h-48">
                        <img src="/loading_main.svg" className='w-28'></img>
                    </div>
                ) : (
                    orders.map((order, index) => (

                        index > 0 ? (
                            <OrderCard
                            key={index}
                            order_id={order.order_id}
                            menu_id={order.menu_id}
                            menu_name={order.menu_name}
                            menu_quantity={order.menu_quantity}
                            menu_img={order.menu_img}
                            price={order.price_paid}
                            status={order.order_status}
                            order_request={order.extra_requests}
                            order_at={order.ordered_at}
                            />
                        ) : null

         
                        
                    ))
                )}
                {/* <OrderCard order_id={1} menu_id={2} price={90} status="Cooking" order_request={"Not spicy"} order_at={"12.00"} ></OrderCard> */}
                {/* card */}

            </div>
            
        </div>
        
    ); 
    
}


export default Mhome;