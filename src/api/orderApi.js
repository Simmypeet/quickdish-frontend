// @ts-check

import axios from "axios";

/**
 * @import { Queue } from "../types/order";
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
