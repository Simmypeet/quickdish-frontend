import React from 'react';
import PurchaseCard from '../../components/PurchaseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { dateFormatted,timeFormatted } from '../../utils/datetimeFormatter';

const PurchaseHistory = () => {
    //try call api and manage 
    const [color, setColor] = React.useState("green");
    const [orders, setOrders] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();
    const handleState = (color) => {
        setColor(color);
    }

    

    const fetchAllOrder = async (status) => {
        try{
            const orders_raw = []; 
            const response = await axiosPrivate.get(`http://127.0.0.1:8000/orders/?status=${status}`); 
            for(let order of response.data){
                let temp = {}; 
                const datetime = new Date(order.ordered_at * 1000);
                temp["date"] = dateFormatted(datetime); 
                temp["time"] = timeFormatted(datetime);
                temp["restaurant_id"] = order.restaurant_id;  //call restaurant details from restaurant_id
                temp["menu_id"] = order.items[0]["menu_id"]; //call menu details from menu_id
                temp["price_paid"] = order.price_paid; 
                temp["order_status"] = status; 
                orders_raw.push(temp);

                for(let order of orders_raw){
                    console.log(order);
                }
            }
            setOrders(orders_raw);
        }catch(error){
            console.error("Error fetching orders:", error);
        }
        
    }
    
    return (
        <div className="p-7">
            <div className="">
                <FontAwesomeIcon className="sidebar-icon" icon={faClockRotateLeft} />
                <h1 className="big-title" >Purchase History</h1>
            </div>
            
            <div className="flex flex-col mt-12">
                <div className="flex justify-between space-x-10 mb-3">
                    <button type="button" onClick={() => fetchAllOrder("ORDERED")}>
                        {/* CANCELLED, SETTLED, PREPARING */}
                        <h2 className='sub-heading-font active:text-blue-600'>Ongoing</h2>
                    </button>
                    <button type="button">
                        <h2 className='sub-heading-font active:text-green-600'>Completed</h2>
                    </button>
                    <button type="button">
                        <h2 className='sub-heading-font active:text-red-600'>Canceled/Failed</h2>
                    </button>
                </div>
                <hr className="border-t-2 border-gray-300 mb-3"/>
              {
                orders.length > 0 ?
                    orders.map((order, index) => ( 
                        <PurchaseCard
                        key={index}
                        date={order.date}
                        time={order.time}
                        name="Mc donalds"
                        price={order.price_paid}
                        canteen="Prathep canteen"
                        userLocation="Building A"
                        orderStatus={order.order_status}/>
                        
                    )) : <h1>No Order history found</h1>
            }
                {/* {/* // <PurchaseCard date="1 Sep 24" time="11:09" name="Mc donalds" price="93" canteen="Prathep canteen" userLocation="Building A" orderStatus="Order completed"/> */}

            </div>

            {/* date, time, restaurant name, price, canteen, order status
            ordered_at,    Restaurant_id, menu_id, price_paid, order_status */}
        </div>
    )
}

export default PurchaseHistory;