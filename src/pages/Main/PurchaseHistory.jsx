import React, { useEffect } from 'react';
import PurchaseCard from '../../components/PurchaseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { dateFormatted,timeFormatted } from '../../utils/datetimeFormatter';
import { getCanteenFromRestaurantId } from '../../api/canteenApi';
import { getRestaurant } from '../../api/restaurantApi';

const PurchaseHistory = () => {
    //try call api and manage 
    const [state, setState] = React.useState("ORDERED");
    const [orders, setOrders] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = React.useState(true);
    const handleState = (status) => {
        setState(status);
    }

    const fetchAllOrder = async (status) => {
        handleState(status);
        try{
            const orders_raw = []; 
            const response = await axiosPrivate.get(`http://127.0.0.1:8000/orders/?status=${status}`); 
            for(let order of response.data){
                let temp = {}; 
                const datetime = new Date(order.ordered_at * 1000);
                const restaurant_response = await getRestaurant(order.restaurant_id); 
                const canteen_response = await getCanteenFromRestaurantId(order.restaurant_id); //call cabteen details from restaurant_id
                temp["date"] = dateFormatted(datetime); 
                temp["time"] = timeFormatted(datetime);
                temp["restaurant_id"] = order.restaurant_id; 
                temp["restaurant_name"] = restaurant_response.name;
                temp["canteen_name"] = canteen_response.name; 
                temp["menu_id"] = order.items[0]["menu_id"]; 
                temp["price_paid"] = order.price_paid; 
                temp["order_status"] = status; 
                orders_raw.push(temp);
            }
            
            setOrders(orders_raw);
        }catch(error){
            console.error("Error fetching orders:", error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        // Run fetchAllOrder("ORDERED") when component mounts
        fetchAllOrder("ORDERED");
    }, []);

    
    return (
        <div className="p-7">
            <div className="flex">
                <FontAwesomeIcon className="text-2xl mt-1 mr-2" icon={faClockRotateLeft} />
                <h1 className="big-title" >Purchase History</h1>
            </div>
            
            <div className="flex flex-col mt-12">
                <div className="flex justify-between space-x-10 mb-3">
                    <button type="button" onClick={() => fetchAllOrder("ORDERED")}>
                        {/* CANCELLED, SETTLED, PREPARING */}
                        <h2 className={`sub-heading-font ${state === "ORDERED" ? "text-blue-600" : "text-black"}`}>Ongoing</h2>
                    </button>
                    <button type="button" onClick={() => fetchAllOrder("SETTLED")}> {/*edit  */}
                        <h2 className={`sub-heading-font ${state === "SETTLED" ? "text-green-600" : "text-black"}`}>Completed</h2>

                    </button>
                    <button type="button" onClick={() => fetchAllOrder("CANCELLED")}> {/*edit  */}
                        <h2 className={`sub-heading-font ${state === "CANCELLED" ? "text-red-600" : "text-black"}`}>Canceled/Failed</h2>

                    </button>
                </div>
                <hr className="border-t-2 border-gray-300 mb-3"/>
                { loading ? (
                    <div className="flex justify-center items-center h-48">
                        <img src="./loading_main.svg" className='w-28'></img>
                    </div>
                ) : (
                    orders.length > 0 ? (
                        orders.map((order, index) => ( 
                            <PurchaseCard
                            key={index}
                            restaurant_id={order.restaurant_id}
                            date={order.date}
                            time={order.time}
                            name={order.restaurant_name}
                            price={order.price_paid}
                            canteen={order.canteen_name}
                            orderStatus={order.order_status}/>
                            
                        ))
                    ) : (<img src="./no-history.png" className="w-60 h-72" alt="" />)
                )}
            </div>
        </div>
    )
}

//add restaurant img : nah
//no history image
//initially load the ongoing order : kindof
export default PurchaseHistory;