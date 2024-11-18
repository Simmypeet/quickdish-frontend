// @ts-check

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @import { ClassValue } from 'clsx';
 */

/**
 *
 * @param  {...ClassValue} classes
 *
 * @returns {string}
 */
const className = (...classes) => {
    return twMerge(clsx(classes));
};

export default className;
