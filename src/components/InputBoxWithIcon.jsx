// @ts-check

import React from 'react';
import merge from '../utils/className';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * @import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
 */

/**
 *
 * @param {{
 *  icon: IconDefinition,
 *  value: string,
 *  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
 *  placeholder: string,
 *  type: 'text' | 'number',
 *  className?: string
 * }} param0
 * @returns
 */
export default ({ icon, value, onChange, placeholder, type, className }) => {
    return (
        <div className={merge('relative flex flex-col gap-y-1', className)}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full rounded-md border border-slate-300 px-2 py-1
                    pl-7 text-sm focus:border-blue-300 
                    focus:outline-none focus:ring-1 focus:ring-blue-300
                "
            />
            <div className="absolute left-0 top-0 flex h-full p-2">
                <FontAwesomeIcon
                    icon={icon}
                    className="my-auto text-sm text-slate-500"
                />
            </div>
        </div>
    );
};
