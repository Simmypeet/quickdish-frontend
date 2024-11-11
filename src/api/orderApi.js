// @ts-check

import axios from 'axios';

/**
 * @import { OrderCreate, Queue } from "../types/order";
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
 * @param {OrderCreate} orderCreate
 *
 * @returns {Promise<number>} orderID
 */
export const createOrder = async (axiosPrivate, orderCreate) => {
    console.log(orderCreate);
    const order = await axiosPrivate.post('/orders', orderCreate, {
        validateStatus: (status) => status === 200,
    });

    return order.data;
};
