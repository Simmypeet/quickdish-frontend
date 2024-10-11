import React from 'react';
import PurchaseCard from '../../components/PurchaseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const PurchaseHistory = () => {
    //try call api and manage 
    const [color, setColor] = React.useState("green");
    const handleState = (color) => {
        setColor(color);
    }
    
    return (
        <div className="p-7">
            <div className="">
                <FontAwesomeIcon className="sidebar-icon" icon={faClockRotateLeft} />
                <h1 className="big-title" >Purchase History</h1>
            </div>

            <div className="flex flex-col mt-12">
                <div className="flex justify-between space-x-10 mb-3">
                    <button type="button">
                        <h2 className='sub-heading-font active:text-blue-600'>Ongoing</h2>
                    </button>
                    <button type="button">
                        <h2 className='sub-heading-font active:text-green-600'>Completed</h2>
                    </button>
                    <button type="button" onClick={ handleState }>
                        <h2 className='sub-heading-font active:text-red-600'>Canceled/Failed</h2>
                    </button>
                </div>
                <hr className="border-t-2 border-gray-300 mb-3"/>
                <PurchaseCard date="1 Sep 24" time="11:09" name="Mc donalds" price="93" canteen="Prathep canteen" userLocation="Building A" orderStatus="Order completed"/>
                <PurchaseCard date="1 Sep 24" time="11:09" name="Mc donalds" price="93" canteen="Prathep canteen" userLocation="Building A" orderStatus="Order completed"/>
                <PurchaseCard date="1 Sep 24" time="11:09" name="Mc donalds" price="93" canteen="Prathep canteen" userLocation="Building A" orderStatus="Order completed"/>
            </div>
        </div>
    )
}

export default PurchaseHistory;