/**
 * @import { OrderStatus, Queue } from './order.js'
 */

/**
 * @typedef {Object} OrderStatusChangeNotification
 *
 * @property {"ORDER_STATUS_CHANGE"} type
 * @property {number} order_id
 * @property {OrderStatus} status
 */

/**
 * @typedef {Object} OrderQueueChangeNotification
 *
 * @property {"ORDER_QUEUE_CHANGE"} type
 * @property {number} order_id
 * @property {Queue} queue
 */

/**
 * @typedef {OrderStatusChangeNotification
 * | OrderQueueChangeNotification} Notification
 */

export {};
