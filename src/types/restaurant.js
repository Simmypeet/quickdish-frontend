// @ts-check

/**
 * @typedef {Object} Location
 *
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} Restaurant
 *
 * @property {string} name
 * @property {string} address
 * @property {Location} location
 * @property {number} id
 * @property {number} merchant_id
 * @property {boolean} open
 */

/**
 * @typedef {Object} Menu
 *
 * @property {string} name
 * @property {string} description
 * @property {string} price
 * @property {number | null} estimated_prep_time
 * @property {number} id
 * @property {number} restaurant_id
 */

/**
 * @typedef {Object} Option
 *
 * @property {string} name
 * @property {string | null} description
 * @property {string | null} extra_price
 * @property {number} customization_id
 * @property {number} id
 */

/**
 * @typedef {Object} Customization
 *
 * @property {string} title
 * @property {string | null} description
 * @property {boolean} unique
 * @property {boolean} required
 * @property {number} id
 * @property {number} menu_id
 * @property {Option[]} options
 */

/**
 * @typedef {Object} CustomizationCreate
 * 
 * @property {string} title
 * @property {string | null} description
 * @property {boolean} unique
 * @property {boolean} required
 * @property {number} menu_id
 * @property {OptionCreate[]} options
 */

/**
 * @typedef {Object} OptionCreate
 * 
 * @property {string} name
 * @property {string | null} description
 * @property {string | null} extra_price
 */

export {};
