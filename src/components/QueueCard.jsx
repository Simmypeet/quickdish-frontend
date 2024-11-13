// @ts-check

import {
    faHourglass,
    faStore,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { orderEvent } from '../api/orderApi';

/**
 * @import { Order, Queue } from '../types/order';
 */

/**
 * @typedef {Object} QueueCardInfo
 *
 * @property {Order} order
 * @property {Queue} queue
 * @property {string} restaurantName
 */

/**
 * @param {QueueCardInfo} props
 * @returns {React.ReactNode}
 */

const QueueCard = (props) => {
    const [info, setInfo] = React.useState(props);

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        // no more event listener if the order is cancelled or settled
        if (
            props.order.status.type === 'CANCELLED' ||
            props.order.status.type === 'SETTLED'
        ) {
            return;
        }

        orderEvent(axiosPrivate, props.order.id, (event) => {
            if (event.type === 'QUEUE_CHANGE') {
                console.log(`Queue Change: ${event.queue.queue_count}`);
                setInfo((prev) => {
                    return {
                        ...prev,
                        queue: event.queue,
                    };
                });
            } else if (event.type === 'STATUS_CHANGE') {
                console.log(`Status Change: ${event.status.type}`);
                setInfo((prev) => {
                    return {
                        ...prev,
                        order: {
                            ...prev.order,
                            status: event.status,
                        },
                    };
                });
            }
        });
    }, []);

    return (
        <div
            className="
                relative mb-5 mr-2 h-64 w-44 min-w-44 rounded-2xl 
                bg-gradient-to-b from-orange-500 to-orange-700 p-2
                shadow-md hover:cursor-pointer hover:shadow-xl
            "
            onClick={() => {
                navigate(`/dashboard/orders/${info.order.id}`, {
                    replace: true,
                });
            }}
        >
            <img
                className="h-full w-full rounded-2xl"
                src="/card2.png"
                alt=""
            />
            <div className="absolute -left-1 top-0 flex h-full w-full flex-col">
                <div className="grid h-[40%]">
                    <div className="my-auto">
                        <h3 className="comment-heading-font line-clamp-1">
                            {info.queue.queue_count == 0
                                ? 'No Queue'
                                : `Queue: ${info.queue.queue_count}`}
                        </h3>
                        <p
                            className="
                                comment-sub-heading-bold-font line-clamp-1 
                                text-center
                            "
                        >
                            <FontAwesomeIcon
                                icon={faUtensils}
                                className="mr-2"
                            />
                            {`${
                                info.order.status.type.charAt(0).toUpperCase() +
                                info.order.status.type.slice(1).toLowerCase()
                            }`}
                        </p>
                    </div>
                </div>
                <div className="grid h-[60%]">
                    <div className="my-auto">
                        <div
                            className="
                                comment-sub-heading-font text-center
                            "
                        >
                            <FontAwesomeIcon icon={faStore} className="mr-2" />
                            <span className="line-clamp-1 inline">
                                {info.restaurantName}
                            </span>
                        </div>
                        <div
                            className="
                                comment-sub-heading-font text-center
                            "
                        >
                            <FontAwesomeIcon
                                icon={faHourglass}
                                className="mr-2"
                            />
                            <span className="line-clamp-1 inline">
                                {info.queue.estimated_time == 0
                                    ? 'Any Time Now!'
                                    : info.queue.estimated_time == 1
                                    ? '1 minute'
                                    : `${info.queue.estimated_time} minutes`}
                            </span>
                        </div>
                    </div>
                    <div className="absolute top-0 h-full w-full p-2"></div>
                </div>
            </div>
        </div>
    );
};

export default QueueCard;
