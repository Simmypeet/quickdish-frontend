// @ts-check

import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import merge from '../utils/className';

/**
 * @param {{
 *  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
 *  title: React.ReactNode
 *  children?: React.ReactNode
 *  className?: string
 * }} props
 *
 *
 */
export default ({ onClose, children, title, className }) => {
    return (
        <div
            className="
                fixed left-0 top-0 grid h-full w-full bg-black 
                bg-opacity-10
            "
        >
            <div
                className={merge(
                    `relative mx-auto my-auto h-[90%] rounded-md bg-white p-4
                    drop-shadow-md`,
                    className
                )}
            >
                {title}
                <hr className="my-2" />
                <button onClick={onClose}>
                    <FontAwesomeIcon
                        icon={faClose}
                        className="
                            absolute right-5 top-5 cursor-pointer font-light 
                            text-slate-600
                        "
                    />
                </button>
                {children}
            </div>
        </div>
    );
};

/**
 *
 * @param {{
 * title: React.ReactNode,
 * children?: React.ReactNode,
 * className?: string
 * }} props
 *
 * @returns {React.ReactNode}
 */
export const TopicBox = ({ title, children, className }) => {
    return (
        <div className={className}>
            {title}

            <hr className="my-2 w-full"></hr>

            {children}
        </div>
    );
};
