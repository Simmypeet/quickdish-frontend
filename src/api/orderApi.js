// @ts-check

import EventSourceStream from '@server-sent-stream/web';
import axios from 'axios';
import { getMenu } from './restaurantApi';

/**
 * @import {
 *  OrderCreate,
 *  Queue,
 *  Order,
 *  OrderStatusUpdate,
 *  OrderNotification
 * } from "../types/order";
 * @import { AxiosInstance } from "axios"
 */

/**
 *
 * @param {number} restaurantID
 * @returns {Promise<Queue>}
 */
export const getRestaurantQueue = async (restaurantID) => {
    const queue = await axios.get(
        process.env.QUICKDISH_BACKEND_URL +
            `/orders/queues/?restaurant_id=${restaurantID}`
    );

    if (queue.status !== 200) {
        throw new Error(
            `Error fetching restaurant queue status: ${queue.status}; 
        body: ${queue.data}`
        );
    }

    return queue.data;
};

/**
 *
 * @param {AxiosInstance} axiosPrivate
 * @param {number} orderId
 *
 * @returns {Promise<Queue>}
 */
export const getOrderQueue = async (axiosPrivate, orderId) => {
    const queue = await axiosPrivate.get(`/orders/${orderId}/queues`, {
        validateStatus: (status) => status === 200,
    });

    return queue.data;
};

/**
 *
 * @param {AxiosInstance} axiosPrivate
 * @param {OrderCreate} orderCreate
 *
 * @returns {Promise<number>} orderID
 */
export const createOrder = async (axiosPrivate, orderCreate) => {
    const order = await axiosPrivate.post('/orders', orderCreate, {
        validateStatus: (status) => status === 200,
    });

    return order.data;
};

/**
 *
 * @param {AxiosInstance} axiosPrivate
 *
 * @returns {Promise<Order[]>}
 */
export const getOnGoingOrders = async (axiosPrivate) => {
    const order = await axiosPrivate.get('/orders', {
        params: {
            status: 'ORDERED|PREPARING|READY',
        },
        validateStatus: (status) => status === 200,
    });

    return order.data;
};

/**
 *
 * @param {AxiosInstance} axiosPrivate
 * @param {number} orderId
 *
 * @returns {Promise<Order>}
 */
export const getOrder = async (axiosPrivate, orderId) => {
    const order = await axiosPrivate.get(`/orders/${orderId}`, {
        validateStatus: (status) => status === 200,
    });

    return order.data;
};

/**
 *
 * @param {AxiosInstance} axiosPrivate
 * @param {number} orderId
 * @param {OrderStatusUpdate} status
 *
 * @returns {Promise<void>}
 */
export const updateOrderStatus = async (axiosPrivate, orderId, status) => {
    await axiosPrivate.put(`/orders/${orderId}/status`, status, {
        validateStatus: (status) => status === 200,
    });

    return;
};

export const getTopSalesMenus = async (restaurant_id, axiosPrivate) => {
    //price per menu x quantity
    //menu name
    const order = await axiosPrivate.get(`orders/?restaurant_id=${restaurant_id}&status=SETTLED`); 
    let menu_sales = [];
    for(let o of order.data){
        let menu = {}; 
        for(let item of o.items){
            if(menu["name"]){
                menu["quantity"] += 1;
            }else{
                let result = await getMenu(item.menu_id); 
                menu["name"] = result.name;
                menu["quantity"] = item.quantity;
                menu["price"] = parseInt(result.price);
            }
            menu["sale"] = menu["price"] * menu["quantity"];
        }
        menu_sales.push(menu);
    }
    console.log("menu_sale", menu_sales);
    return menu_sales;
}

export const getTotalSaleByDate = async (date, month, year, restaurant_id, axiosPrivate) => {
    const order = await axiosPrivate.get(`orders/?restaurant_id=${restaurant_id}&status=SETTLED`);
    let total_sale = 0;
     

}