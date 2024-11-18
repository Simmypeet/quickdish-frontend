// @ts-check

import React from 'react';
import merge from '../utils/className';

/**
 * @param {{
 *  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
 *  className?: string,
 *  children?: React.ReactNode
 * }} param0
 */
export default ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={merge(
                `rounded-md bg-gradient-to-r from-orange-300 to-red-500 
                px-2 py-1 text-sm font-semibold text-white drop-shadow-md`,
                className
            )}
        >
            {children}
        </button>
    );
};
