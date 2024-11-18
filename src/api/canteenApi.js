import axios from 'axios';

/**
 * @import { Restaurant } from '../types/restaurant';
 * @import { Canteen } from '../types/canteen';
 */

export const getCanteenFromRestaurantId = async (resId) => {
    const response = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/canteens/restaurants/${resId}`
    );
    // const response = await axios.get(`http://127.0.0.1:8000/canteens/restaurants/${resId}`
    // );
    if (response.status !== 200) {
        throw new Error(
            `Error fetching restaurant data status: ${response.status};
            body: ${response.data}`
        );
    }
    console.log('canteen response: ', response.data);
    return response.data;
};

export const getCanteenImgFromId = async (canteenId) => {
    const response = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/canteens/${canteenId}/img`,
        { responseType: 'blob' }
    );
    if (response.status === 204) {
        return null;
    }
    return response.data;
};
// const response = await axios.get(
//     `http://

export const getCanteenByRestId = async (restId) => {
    try {
        const response = await axios.get(
            process.env.QUICKDISH_BACKEND_URL +
                `/canteens/restaurants/${restId}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching canteen:', error);
    }
};

/**
 *
 * @param {number} latitude
 * @param {number} longtitude
 *
 * @returns {Promise<Restaurant[]>}
 */
export const getNearestRestaurants = async (latitude, longtitude) => {
    const response = await axios.get(
        process.env.QUICKDISH_BACKEND_URL +
            `/canteens/canteen/restaurants?user_lat=${latitude}&user_long=${longtitude}`,
        {
            validateStatus: (status) => {
                return status === 200;
            },
        }
    );

    return response.data;
};

/**
 * @param {number} latitude
 * @param {number} longtitude
 *
 * @returns {Premise<Canteen[]>}
 */
export const getNearestCanteens = async (latitude, longtitude) => {
    const response = await axios.get(
        process.env.QUICKDISH_BACKEND_URL +
            `/canteens/?user_lat=${latitude}&user_long=${longtitude}`,
        {
            validateStatus: (status) => {
                return status === 200;
            },
        }
    );

    return response.data;
};
