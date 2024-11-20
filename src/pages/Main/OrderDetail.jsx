// @ts-check

import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCancel,
    faCheck,
    faCheckDouble,
    faKitchenSet,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { LoadingPage } from '../../components/LoadingPage';
import { getOrder, getOrderQueue, updateOrderStatus } from '../../api/orderApi';
import { getMenu, getMenuImage, getRestaurant } from '../../api/restaurantApi';
import moment from 'moment-timezone';

// @ts-expect-error
import defaultMenuImage from '/defaultMenu.webp';
import useEvent from '../../hooks/useEvent';
import { EventHandlerProvider } from '../../context/EventProvider';

/**
 * @import { Menu, Restaurant } from '../../types/restaurant';
 * @import { Order, Queue } from '../../types/order';
 */

/**
 * @typedef {Object} OrderDetailData
 *
 * @property {Order} order
 * @property {Restaurant} restaurant
 * @property {number} orderID
 * @property {Queue} queue
 * @property {{[key: number]: {menu: Menu, image: string}}} menus
 */

/**
 *
 * @param {number} timestamp
 * @returns {string} - the formatted date string. For example. 1 Jan 2021 12:00:00
 */
const getDateStringFromUnixTimestamp = (timestamp) => {
    const tz = moment.tz.guess();
    return moment.unix(timestamp).tz(tz).format('D MMM YYYY HH:mm:ss');
};

/**
 *
 * @param {OrderDetailData & {
 *  onCancel: () => void,
 *  onConfirm: () => void
 * }} props
 *
 * @returns {React.ReactNode}
 */
const OrderStatusGraph = (props) => {
    const [orderNumber, text] = useMemo(() => {
        if (props.order.status.type === 'ORDERED') {
            return [0, "We've Recieved Your Order"];
        } else if (props.order.status.type === 'PREPARING') {
            return [1, "We're Preparing Your Order"];
        } else if (props.order.status.type === 'READY') {
            return [2, 'Your Order is Ready for Pickup!'];
        } else {
            return [3, 'Thanks for Dining with Us!'];
        }
    }, [props]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-evenly">
            <div
                className="
                    my-4 grid w-full
                    grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] items-center
                "
            >
                <FontAwesomeIcon
                    icon={faCheck}
                    className="
                        green-400 rounded-full bg-green-400 p-5 text-white
                    "
                />
                <hr
                    className={
                        `border ` +
                        (orderNumber >= 1
                            ? 'border-green-400'
                            : 'border-slate-300')
                    }
                />
                <FontAwesomeIcon
                    icon={faKitchenSet}
                    className={
                        `rounded-full p-5 ` +
                        (orderNumber >= 1
                            ? 'bg-green-400 text-white'
                            : 'bg-slate-300')
                    }
                />
                <hr
                    className={
                        `border ` +
                        (orderNumber >= 2
                            ? 'border-green-400'
                            : 'border-slate-300')
                    }
                />
                <FontAwesomeIcon
                    icon={faUtensils}
                    className={
                        `rounded-full p-5 ` +
                        (orderNumber >= 2
                            ? 'bg-green-400 text-white'
                            : 'bg-slate-300')
                    }
                />
                <hr
                    className={
                        `border ` +
                        (orderNumber >= 3
                            ? 'border-green-400'
                            : 'border-slate-300')
                    }
                />
                <FontAwesomeIcon
                    icon={faCheckDouble}
                    className={
                        `rounded-full p-5 ` +
                        (orderNumber >= 3
                            ? 'bg-green-400 text-white'
                            : 'bg-slate-300')
                    }
                />
                <span className="mx-auto text-sm">ordered</span>
                <span />
                <span className="mx-auto text-sm">preparing</span>
                <span />
                <span className="mx-auto text-sm">ready</span>
                <span />
                <span className="mx-auto text-sm">settled</span>
            </div>
            <div
                className="
                    flex w-full flex-row items-center justify-between
                "
            >
                <h1 className="mx-auto my-2 flex-1 text-center text-sm italic">
                    {text}
                </h1>
                {props.order.status.type === 'ORDERED' ? (
                    <>
                        <div className="grow"></div>
                        <div className="mx-auto flex flex-row items-center">
                            <div
                                className="
                                    cursor-pointer rounded-md border 
                                    border-red-600 bg-white px-2 py-1 
                                    text-sm font-semibold text-red-600 
                                    shadow-md hover:bg-red-600 
                                    hover:text-white hover:shadow-xl
                                "
                                onClick={props.onCancel}
                            >
                                Cancel
                            </div>
                        </div>
                    </>
                ) : props.order.status.type === 'READY' ? (
                    <>
                        <div className="grow"></div>
                        <div className="mx-auto flex flex-row items-center">
                            <div
                                className="
                                    cursor-pointer rounded-md border 
                                    border-green-600 bg-white px-2 py-1 
                                    text-sm font-semibold text-green-600 
                                    shadow-md hover:bg-green-600 
                                    hover:text-white hover:shadow-xl
                                "
                                onClick={props.onConfirm}
                            >
                                Confirm Pickup
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

/**
 *
 * @param {OrderDetailData} props
 * @returns {React.ReactNode}
 */
const OrderSummary = (props) => {
    return (
        <div
            className="
                flex grow-[1] flex-col items-center rounded-md border 
                border-slate-200 bg-slate-50 px-4 py-2
            "
        >
            <h1 className="self-start text-xl font-semibold">Order Summary</h1>
            <hr className="-mx-2 my-2 w-full"></hr>
            <div className="grid w-full grid-cols-[1fr_1.5fr] gap-y-2">
                <h1 className="font-light text-slate-600">Price</h1>
                <h1 className="text-right font-semibold">
                    {`${props.order.price_paid}฿`}
                </h1>
                <h1 className="font-light text-slate-600">Ordered at</h1>
                <h1 className="text-right font-semibold">
                    {getDateStringFromUnixTimestamp(props.order.ordered_at)}
                </h1>
                <h1 className=" font-light text-slate-600">Restaurant</h1>
                <h1 className="text-right font-semibold">
                    {props.restaurant.name}
                </h1>

                {props.order.status.type === 'ORDERED' ||
                props.order.status.type === 'PREPARING' ? (
                    <>
                        <h1 className="font-light text-gray-600">Queue</h1>
                        <h1 className="text-right font-semibold">
                            {props.queue.queue_count
                                ? props.queue.queue_count
                                : 'No Queue'}
                        </h1>
                        <h1 className="font-light text-gray-600">
                            Estaimed Time
                        </h1>
                        <h1 className="text-right font-semibold">
                            {props.queue.estimated_time == 0
                                ? 'Any Time Now'
                                : `${props.queue.estimated_time} min(s)`}
                        </h1>
                    </>
                ) : props.order.status.type === 'SETTLED' ? (
                    <>
                        <h1 className="font-light text-gray-600">Pickup At</h1>
                        <h1 className="text-right font-semibold">
                            {getDateStringFromUnixTimestamp(
                                props.order.status.settled_at
                            )}
                        </h1>
                    </>
                ) : props.order.status.type === 'CANCELLED' ? (
                    <>
                        <h1 className="font-light text-gray-600">
                            Cancelled At
                        </h1>
                        <h1 className="text-right font-semibold">
                            {getDateStringFromUnixTimestamp(
                                props.order.status.cancelled_time
                            )}
                        </h1>
                        {props.order.status.reason && (
                            <>
                                <h1 className="font-light text-gray-600">
                                    Reason
                                </h1>
                                <h1 className="text-right font-semibold">
                                    {props.order.status.reason}
                                </h1>
                            </>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};

/**
 *
 * @param {OrderDetailData & {
 *  onCancel: () => void,
 *  onConfirm: () => void
 * }} props
 *
 * @returns {React.ReactNode}
 */
const OrderStatus = (props) => {
    return (
        <div
            className="
                flex min-h-40 min-w-80 grow-[2] flex-col items-center rounded-md 
                border border-slate-200 bg-slate-50 px-4 py-2
            "
        >
            <h1 className="self-start text-xl font-semibold">Order Status</h1>
            <hr className="mx-2 my-2 w-full"></hr>
            {props.order.status.type === 'CANCELLED' ? (
                <div className="my-auto flex flex-col items-center">
                    <FontAwesomeIcon icon={faCancel} className="text-red-600" />

                    <h1 className="text-center font-semibold text-red-600">
                        Order Cancelled
                    </h1>
                </div>
            ) : (
                <OrderStatusGraph {...props} />
            )}
        </div>
    );
};

/**
 *
 * @param {OrderDetailData} props
 * @returns {React.ReactNode}
 */
const MainPage = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const [popup, setPopup] = useState(
        /** @type{undefined | "cancle" | "confirm"} */ (undefined)
    );

    return (
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
            <OrderStatus
                {...props}
                onCancel={() => {
                    setPopup('cancle');
                }}
                onConfirm={() => {
                    setPopup('confirm');
                }}
            />
            <OrderSummary {...props} />
            <OrderItems {...props} />
            {popup != null && (
                <div
                    className="
                        fixed bottom-0 left-0 right-0 top-0 z-10 
                        flex bg-black bg-opacity-10
                    "
                >
                    <div
                        className="
                            mx-auto my-auto flex flex-col items-center
                            gap-y-2 rounded-xl bg-white p-4 drop-shadow-xl
                        "
                    >
                        <h1 className="text-lg font-semibold">
                            {popup == 'cancle'
                                ? 'Cancel Order'
                                : 'Confirm Pickup'}
                        </h1>

                        <div className="text-center">
                            {popup == 'cancle' ? (
                                <>
                                    Are you sure you want to canel this order?
                                    <br />
                                    This action can't be undone
                                </>
                            ) : (
                                'By confirming this, you acknowledge that you have received your order'
                            )}
                        </div>

                        <div className="flex flex-row items-center gap-x-5">
                            <div
                                className="
                                    w-20 cursor-pointer rounded-md 
                                    border border-red-600 px-2 py-1 
                                    text-center text-red-600 
                                    shadow-md hover:bg-red-600 
                                    hover:text-white hover:shadow-lg
                                "
                                onClick={() => setPopup(undefined)}
                            >
                                Back
                            </div>
                            <div
                                className="
                                    w-20 cursor-pointer rounded-md 
                                    border border-green-600 px-2 py-1 
                                    text-center text-green-600 
                                    shadow-md hover:bg-green-600 
                                    hover:text-white hover:shadow-lg
                                "
                                onClick={async () => {
                                    if (popup === 'cancle') {
                                        await updateOrderStatus(
                                            axiosPrivate,
                                            props.orderID,
                                            {
                                                type: 'CANCELLED',
                                                reason: null,
                                            }
                                        );
                                    } else {
                                        await updateOrderStatus(
                                            axiosPrivate,
                                            props.orderID,
                                            {
                                                type: 'SETTLED',
                                            }
                                        );
                                    }

                                    setPopup(undefined);
                                }}
                            >
                                Yes
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 *
 * @param {OrderDetailData} props
 * @returns {React.ReactNode}
 */
export const OrderItems = (props) => {
    return (
        <div
            className="
                flex w-full grow flex-col items-center rounded-md 
                border border-slate-200 bg-slate-50 px-2 py-2
            "
        >
            <div
                className="
                    grid w-full grid-cols-[auto_1fr_auto] items-center
                    gap-x-4 gap-y-2 md:grid-cols-[auto_2fr_1fr_auto]
                "
            >
                <h1 className="col-span-2 font-semibold">Menu</h1>
                <h1
                    className="
                        hidden self-center text-center font-semibold md:block
                    "
                >
                    Extra Request
                </h1>
                <h1 className="self-center text-center font-semibold">
                    Quantity
                </h1>
                <hr className="col-span-3 md:col-span-4"></hr>

                {props.order.items.map((item, index) => (
                    <Fragment key={index}>
                        <img
                            src={props.menus[item.menu_id].image}
                            alt=""
                            className="
                                m-1 h-12 w-12 rounded-md border 
                                border-slate-300 object-cover
                            "
                        />
                        <div className="">
                            <h1 className="my-auto line-clamp-1">
                                {props.menus[item.menu_id].menu.name}
                            </h1>
                            <h1
                                className="
                                    line-clamp-2 self-center text-sm 
                                    font-light text-slate-600
                                "
                            >
                                {props.menus[item.menu_id].menu.description}
                            </h1>
                        </div>
                        {item.extra_requests.length > 0 ? (
                            <h1
                                className="
                                    line-clamp-2 hidden text-center text-sm
                                    font-light text-slate-600 md:block
                                "
                            >
                                {item.extra_requests}
                            </h1>
                        ) : (
                            <h1
                                className="
                                    line-clamp-2 hidden text-center text-sm 
                                    font-light italic text-slate-600 md:block 
                                "
                            >
                                No Extra Request
                            </h1>
                        )}
                        <h1 className="line-clamp-1 self-center text-center">
                            {`x${item.quantity}`}
                        </h1>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

/**
 *
 * @returns {React.ReactNode}
 */
const OrderDetailInner = () => {
    const { orderID: orderIDString } = useParams();

    if (orderIDString === undefined) {
        throw new Error('Order ID is not provided');
    }

    const orderID = parseInt(orderIDString);

    const [orderDetailData, setOrderDetailData] = useState(
        /** @type{OrderDetailData | undefined} */ (undefined)
    );

    const orderText = useMemo(() => {
        if (orderDetailData == null) {
            return undefined;
        }

        if (
            orderDetailData.order.status.type === 'ORDERED' ||
            orderDetailData.order.status.type === 'PREPARING' ||
            orderDetailData.order.status.type === 'READY'
        ) {
            return ['Ongoing', 'text-yellow-600 border-yellow-600'];
        } else if (orderDetailData.order.status.type === 'SETTLED') {
            return ['Settled', 'text-green-600 border-green-600'];
        } else {
            return ['Cancelled', 'text-red-600 border-red-600'];
        }
    }, [orderDetailData]);

    const axiosPrivate = useAxiosPrivate();
    const eventHandler = useEvent();

    useEffect(() => {
        async function fetchData() {
            let menus =
                /** @type{{[key: number]: {menu: Menu, image: string}}} */ ({});

            const order = await getOrder(axiosPrivate, orderID);
            const restaurant = await getRestaurant(order.restaurant_id);
            const queue = await getOrderQueue(axiosPrivate, orderID);

            for (let i = 0; i < order.items.length; i++) {
                if (menus[order.items[i].menu_id] === undefined) {
                    const menuData = await getMenu(order.items[i].menu_id);
                    const image = await getMenuImage(order.items[i].menu_id);

                    menus[order.items[i].menu_id] = {
                        menu: menuData,
                        image: image
                            ? URL.createObjectURL(image)
                            : defaultMenuImage,
                    };
                }
            }

            // the order is ongoing, listen for any event
            let cleanup = () => {};

            if (
                order.status.type !== 'CANCELLED' &&
                order.status.type !== 'SETTLED'
            ) {
                cleanup = eventHandler.addCallback((notification) => {
                    if (notification.order_id !== orderID) {
                        return;
                    }

                    console.log(notification);

                    if (
                        notification.type === 'ORDER_QUEUE_CHANGE' &&
                        (notification.queue.queue_count !==
                            orderDetailData?.queue.queue_count ||
                            notification.queue.estimated_time !==
                                orderDetailData?.queue.estimated_time)
                    ) {
                        setOrderDetailData((prev) => {
                            if (prev == null) {
                                return prev;
                            }

                            return {
                                ...prev,
                                queue: notification.queue,
                            };
                        });
                    } else if (
                        notification.type === 'ORDER_STATUS_CHANGE' &&
                        notification.status.type !==
                            orderDetailData?.order.status.type
                    ) {
                        setOrderDetailData((prev) => {
                            if (prev == null) {
                                return prev;
                            }

                            return {
                                ...prev,
                                order: {
                                    ...prev.order,
                                    status: notification.status,
                                },
                            };
                        });
                    }
                });
            }

            setOrderDetailData({
                order,
                restaurant,
                orderID,
                queue,
                menus,
            });

            return cleanup;
        }

        fetchData();
    }, []);

    return (
        <div className="flex h-full w-full flex-col pl-3 pr-3 pt-5">
            <div className="flex flex-row items-center">
                <h1 className="text-2xl font-semibold">
                    {`Order ID ${orderID}`}
                </h1>

                {orderText && (
                    <div
                        className={
                            `mx-2 rounded-md border px-2 py-1 font-semibold ` +
                            orderText[1]
                        }
                    >
                        {orderText[0]}
                    </div>
                )}
            </div>
            <hr className="mb-2 mt-4" />

            {orderDetailData ? (
                <MainPage {...orderDetailData} />
            ) : (
                <LoadingPage opacity={false} />
            )}
        </div>
    );
};

/**
 *
 * @returns {React.ReactNode}
 */
export const OrderDetail = () => {
    console.log('rendered');
    return (
        <EventHandlerProvider>
            <OrderDetailInner />
        </EventHandlerProvider>
    );
};
