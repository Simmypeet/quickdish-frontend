import axios from 'axios';

/**
 * @import {Restaurant, Menu, Customization} from "../types/restaurant";
 */

/**
 *
 * @param {number} restaurantID - the restaurant id to fetch for
 * @returns {Promise<Restaurant>}
 */

export const getRestaurant = async (restaurantID) => {
    const restaurant = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/restaurants/${restaurantID}`
    );
    // const restaurant = await axios.get(
    //     `http://127.0.0.1:8000/restaurants/${restaurantID}`
    // );

    if (restaurant.status !== 200) {
        throw new Error(
            `Error fetching restaurant data status: ${restaurant.status}; 
            body: ${restaurant.data}`
        );
    }
    console.log("restaurant response: ", restaurant.data); 
    console.log("restaurant name: ", restaurant.data.name);
    return restaurant.data;
};

/**
 * @param {number} menuID
 * @returns {Promise<Blob | null>}
 */
export const getMenuImage = async (menuID) => {
    const image = await axios.get(
        process.env.QUICKDISH_BACKEND_URL +
            `/restaurants/menus/${menuID}/image`,
        { responseType: 'blob' }
    );

    if (image.status === 200) {
        return image.data;
    } else if (image.status === 204) {
        return null;
    }

    throw new Error(
        `Error fetching menu image status: ${image.status}; 
        body: ${image.data}`
    );
};

/**
 * @param {number} menuID
 * @returns {Promise<Menu>}
 */
export const getMenu = async (menuID) => {
    const menu = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/restaurants/menus/${menuID}`
    );

    if (menu.status !== 200) {
        throw new Error(
            `Error fetching menu data status: ${menu.status}; 
            body: ${menu.data}`
        );
    }

    return menu.data;
};

/**
 * @param {number} restaurantID
 * @returns {Promise<Menu[]>}
 */
export const getRestaurantMenus = async (restaurantID) => {
    const menus = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/restaurants/${restaurantID}/menus`
    );

    if (menus.status !== 200) {
        throw new Error(
            `Error fetching restaurant menus status: ${menus.status}; 
            body: ${menus.data}`
        );
    }

    return menus.data;
};

/**
 * @param {number} restaurantID
 * @returns {Promise<Blob | null>}
 */
export const getRestaurantImage = async (restaurantID) => {
    const image = await axios.get(
        process.env.QUICKDISH_BACKEND_URL +
            `/restaurants/${restaurantID}/image`,
        { responseType: 'blob' }
    );

    if (image.status === 200) {
        return image.data;
    } else if (image.status === 204) {
        return null;
    }

    throw new Error(
        `Error fetching restaurant image status: ${image.status}; 
        body: ${image.data}`
    );
};

/**
 * @param {number} menuID
 * @returns {Promise<Customization[]>}
 */
export const getMenuCustomizations = async (menuID) => {
    const customizations = await axios.get(
        process.env.QUICKDISH_BACKEND_URL +
            `/restaurants/menus/${menuID}/customizations`
    );

    if (customizations.status !== 200) {
        throw new Error(
            `Error fetching menu customizations status: ${customizations.status}; 
            body: ${customizations.data}`
        );
    }

    return customizations.data;
};

/**
 * @param {string} name The name of the restaurant to search for
 * @param {limit} limit The maximum number of restaurants to return
 * @returns {Promise<number[]>} The IDs of the restaurants that match the search query
 */
export const searchRestaurants = async (name, limit) => {
    const restaurants = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/restaurants/search`,
        {
            params: {
                query: name,
                limit: limit,
            },
        }
    );

    if (restaurants.status !== 200) {
        throw new Error(
            `Error searching restaurant; status: ${restaurants.status}; 
            body: ${restaurants.data}`
        );
    }

    return restaurants.data;
};
