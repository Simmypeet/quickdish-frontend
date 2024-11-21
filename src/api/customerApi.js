/**
 * @import {AxiosInstance} from 'axios'
 */

/**
 * @param {AxiosInstance} axiosInst
 *
 * @returns {Promise<number[]>}
 */
export const getFavoriteRestaurants = async (axiosInst) => {
    const favorites = await axiosInst.get('/customers/favorite-restaurants');

    if (favorites.status !== 200) {
        throw new Error(
            `Error fetching restaurant data status: ${favorites.status}; 
            body: ${favorites.data}`
        );
    }

    return favorites.data;
};

/**
 * @param {AxiosInstance} axiosInst
 * @param {number[]} restaurantIds
 *
 * @returns {Promise<string>}
 */
export const removeFavoriteRestaurant = async (axiosInst, restaurantIds) => {
    const response = await axiosInst.delete('/customers/favorite-restaurants', {
        data: restaurantIds,
    });

    if (response.status !== 200) {
        throw new Error(
            `Error removing favorite restaurant status: ${response.status}; 
            body: ${response.data}`
        );
    }

    return response.data;
};

/**
 * @param {AxiosInstance} axiosInst
 * @param {number[]} restaurantIds
 *
 * @returns {Promise<string>}
 */
export const addFavoriteRestaurant = async (axiosInst, restaurantIds) => {
    const response = await axiosInst.post(
        '/customers/favorite-restaurants',
        restaurantIds
    );

    if (response.status !== 200) {
        throw new Error(
            `Error adding favorite restaurant status: ${response.status}; 
            body: ${response.data}`
        );
    }

    return response.data;
};

export const getUser = async (axiosPrivate) => {
    // const response = await axiosPrivate.get(
    //     'http://127.0.0.1:8000/customers/me'
    // );
    const response = await axiosPrivate.get('/customers/me');
    return response.data;
};

export const getUserById = async (axiosPrivate, userId) => {
    const response = await axiosPrivate.get(
        `/customers/${userId}`
    );
    return response.data; 
}



