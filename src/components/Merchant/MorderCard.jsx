import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const OrderCard = ({ order_id, menu_id, price, status, order_request, order_at  }) => {  
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    //get menu name
    //menu details

    return (
        <div className="mb-2 w-full">
            <div className={`bg-slate-400 w-full h-20 ${isExpanded ? "rounded-t-lg" : "rounded-lg"} flex items-center justify-between space-x-16 pr-5`}>
                <img src="/profile.jpg" className="w-20 h-16 pl-2 rounded-lg" alt="Profile" />
                <h1>Order id: {order_id}</h1>
                <h1>Menu Name</h1>
                <h1>Dine-in</h1>
                <h1>฿{price}</h1>
                <h1>
                    {
                    status === "ORDERED" ? "Preparing" : status === "READY" ? "Pending payment" : "Completed"
                    }
                    
                </h1>
                {/* Toggle Icon */}
                <button
                    onClick={toggleExpand}
                    className="text-lg font-bold flex items-center"
                >
                    {isExpanded ? 
                        <FontAwesomeIcon icon={faChevronUp} />
                    : 
                        <FontAwesomeIcon icon={faChevronDown} />
                    }
                </button>
            </div>

            {/* Expanded Content */}
        
            <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-40 p-4" : "max-h-0 p-0"
            } bg-slate-400 rounded-b-lg w-full `}
            >
                <p>Additional details about the order can go here:</p>
                <ul className="list-disc list-inside">
                    <li>Customer Name: John Doe</li>
                    <li>Pickup Time: 12.30</li>
                    <li>{order_request}</li>
                </ul>
            </div>
        </div>
    )
}; 

export default OrderCard;