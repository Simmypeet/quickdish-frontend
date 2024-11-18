// @ts-check

import React from 'react';
import merge from '../utils/className';

/**
 *
 * @param {{
 *  children?: React.ReactNode,
 *  className?: string
 * }} prop
 * @returns {React.ReactNode}
 */
export const Subtitle = ({ children, className }) => {
    return (
        <h2 className={merge(`text-xl font-semibold`, className)}>
            {children}
        </h2>
    );
};

/**
 *
 * @param {{
 *  children?: React.ReactNode,
 *  className?: string
 * }} prop
 * @returns {React.ReactNode}
 */
export const Title = ({ children, className }) => {
    return (
        <h1 className={merge(`text-2xl font-semibold`, className)}>
            {children}
        </h1>
    );
};
