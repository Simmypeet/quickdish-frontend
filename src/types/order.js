/**
 * @typedef {Object} OrderOption
 *
 * @property {number} option_id
 */

/**
 * @typedef {Object} OrderItem
 *
 * @property {number} menu_id
 * @property {number} quantity
 * @property {string} extra_requests
 * @property {OrderOption[]} options
 */

/**
 * @typedef {Object} OrderCreate
 *
 * @property {number} restaurant_id
 * @property {OrderItem[]} items
 */

/**
 * @typedef {Object} Queue
 *
 * @property {number} queue_count
 * @property {number} estimated_time
 */

/**
 * @typedef {Object} CancelledOrderUpdate
 *
 * @property {"CANCELLED"} type
 * @property {string | null} reason
 */

/**
 * @typedef {Object} PreparingOrderUpdate
 *
 * @property {"PREPARING"} type
 */

/**
 * @typedef {Object} ReadyOrderUpdate
 *
 * @property {"READY"} type
 */

/**
 * @typedef {Object} SettledOrderUpdate
 *
 * @property {"SETTLED"} type
 */

/**
 * @typedef {CancelledOrderUpdate
 * | PreparingOrderUpdate
 * | ReadyOrderUpdate
 * | SettledOrderUpdate} OrderStatusUpdate
 */

/**
 * @typedef {Object} OrderedOrder
 *
 * @property {"ORDERED"} type
 */

/**
 * @typedef {Object} CancelledOrder
 *
 * @property {"CANCELLED"} type
 * @property {string | null} reason
 * @property {"CUSTOMER" | "MERCHANT"} cancelled_by
 * @property {number} cancelled_time unix timestamp
 */

/**
 * @typedef {Object} PreparingOrder
 *
 * @property {"PREPARING"} type
 * @property {number} prepared_at unix timestamp
 */

/**
 * @typedef {Object} ReadyOrder
 *
 * @property {"READY"} type
 * @property {number} ready_at unix timestamp
 */

/**
 * @typedef {Object} SettledOrder
 *
 * @property {"SETTLED"} type
 * @property {number} settled_at unix timestamp
 */

/**
 * @typedef {OrderedOrder
 * | CancelledOrder
 * | PreparingOrder
 * | ReadyOrder
 * | SettledOrder} OrderStatus
 */

/**
 * @typedef {Object} Order
 *
 * @property {number} restaurant_id
 * @property {number} id
 * @property {number} customer_id
 * @property {OrderItem[]} items
 * @property {OrderStatus} status
 * @property {string} price_paid
 * @property {number} ordered_at unix timestamp
 */

/**
 * @typedef {Object} StatusChangeNotification
 *
 * @property {"STATUS_CHANGE"} type
 * @property {number} order_id
 * @property {OrderStatus} status
 */

/**
 * @typedef {Object} QueueChangeNotification
 *
 * @property {"QUEUE_CHANGE"} type
 * @property {number} order_id
 * @property {Queue} queue
 */

/**
 * @typedef {StatusChangeNotification
 *  | QueueChangeNotification} OrderNotification
 */

export {};
