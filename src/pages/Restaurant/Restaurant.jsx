// @ts-check

import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Decimal from 'decimal.js';

// @ts-expect-error
import defaultRestaurantImage from '../../assets/defaultRestaurant.jpeg';
// @ts-expect-error
import defaultMenuImage from '../../assets/defaultMenu.webp';

/**
 * @import {
 *  Restaurant,
 *  Menu,
 *  Customization,
 *  Option
 * } from "../../types/restaurant";
 *
 * @import { OrderCreate, OrderItem, OrderOption, Queue } from "../../types/order"
 *
 * @import { ReactNode } from "react"
 */

import {
    faPlus,
    faMinus,
    faBasketShopping,
    faClock,
    faLocationDot,
    faClose,
    faShoppingCart,
    faSort,
    faMoneyBill,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {
    getRestaurant,
    getRestaurantImage,
    getRestaurantMenus,
    getMenuImage,
    getMenuCustomizations,
} from '../../api/restaurantApi';
import { LoadingPage } from '../../components/LoadingPage';
import ErrorPage from '../Others/Error';
import OrderCard from '../../components/OrderCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { createOrder, getRestaurantQueue } from '../../api/orderApi';
import Header from '../../components/Header';
import MenuCard from '../../components/MenuCard';
import OrderCustomization from '../../components/OrderCustomization';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

/**
 *
 * @param {{
 *  onCheckout: () => void,
 * }} props
 * @returns
 */
const CheckoutSummary = ({ onCheckout }) => {
    const { orderCreate, restaurant, setOrders } = useRestaurant();

    return (
        <div
            className="
                md:border-black-900 flex flex-col bg-slate-100 pb-6 md:grow 
                md:border-l-[1.5px] md:pb-0 md:pt-4
            "
        >
            <div className="hidden md:block">
                <h1 className="m-2 line-clamp-1 text-2xl font-semibold">
                    Checkout
                </h1>
                <hr className="mx-2 mb-2"></hr>
            </div>
            <hr className="mb-4 md:hidden"></hr>

            <div
                className="
                    flex grow flex-col justify-between rounded-xl px-4 md:mx-2 
                    md:mb-2 md:bg-white md:pb-6 md:pt-2 md:shadow-inner 
                "
            >
                <div className="mb-6">
                    <div className="">
                        <div className="flex flex-row items-center justify-between">
                            <div className="my-1 flex flex-row items-center gap-x-2">
                                <FontAwesomeIcon icon={faSort} />
                                <h1 className="line-clamp-1">Queues</h1>
                            </div>
                            <h1 className="line-clamp-1">
                                {restaurant.queue.queue_count == 0
                                    ? 'None'
                                    : `${restaurant.queue.queue_count} queue(s)`}
                            </h1>
                        </div>
                        <hr></hr>
                    </div>

                    <div>
                        <div
                            className="
                                flex flex-row items-center justify-between
                            "
                        >
                            <div
                                className="
                                    my-1 flex flex-row items-center gap-x-2
                                "
                            >
                                <FontAwesomeIcon icon={faClock} />
                                <h1 className="line-clamp-1">Estimated Time</h1>
                            </div>
                            <h1 className="line-clamp-1">
                                {restaurant.queue.estimated_time == 0
                                    ? 'None'
                                    : `${restaurant.queue.estimated_time} min(s)`}
                            </h1>
                        </div>
                        <hr></hr>
                    </div>

                    <div className="">
                        <div className="flex flex-row items-center justify-between">
                            <div className="my-1 flex flex-row items-center gap-x-2">
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <h1 className="">Quantity</h1>
                            </div>
                            <h1>{calculateQuantity(orderCreate.items)}</h1>
                        </div>
                        <hr></hr>
                    </div>
                </div>

                <div
                    className="
                        flex w-4/5 flex-row items-center justify-between 
                        self-center rounded-xl bg-gradient-to-r 
                        from-orange-300 to-red-400 px-6 py-2 drop-shadow-lg 
                        hover:cursor-pointer hover:shadow-2xl
                    "
                    onClick={onCheckout}
                >
                    <div className="flex flex-row items-center gap-x-2">
                        <FontAwesomeIcon icon={faMoneyBill} />
                        <div>Order</div>
                    </div>
                    <div>{`฿${orderCreate.items.reduce((acc, x) => {
                        return acc.plus(
                            calculatePrice(
                                restaurant.menus[x.menu_id],
                                x.options,
                                x.quantity
                            )
                        );
                    }, new Decimal(0))}`}</div>
                </div>
            </div>
        </div>
    );
};

/**
 *
 * @param {OrderItem[]} orders
 *
 * @returns {number}
 */
const calculateQuantity = (orders) => {
    return orders.reduce((acc, order) => acc + order.quantity, 0);
};

/**
 *
 * @param {{
 *  onClose: () => void,
 *  onEdit: (orderItem: OrderItem) => void,
 * }} param0
 * @returns
 */
const OrderSummary = ({ onClose, onEdit }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { orderCreate, restaurant, setOrders } = useRestaurant();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    return (
        <div
            className="
                fixed bottom-0 left-0 right-0 top-0 z-[20] flex bg-black 
                bg-opacity-10
            "
        >
            <div
                className="
                    relative mx-auto my-auto flex h-[90%] w-[80%] min-w-[80%] 
                    flex-col overflow-hidden rounded-2xl bg-white 
                    drop-shadow-2xl md:min-w-[70%] md:flex-row
                "
            >
                <FontAwesomeIcon
                    icon={faClose}
                    className="
                        absolute right-6 top-6 z-10 self-end 
                        hover:cursor-pointer
                    "
                    onClick={onClose}
                />
                <div className="ml-6 mr-6 mt-6 flex grow flex-col">
                    <h1 className="text-2xl font-semibold">Basket</h1>
                    <hr className="my-2" />

                    {orderPlaced ? (
                        <div
                            className="
                                my-auto flex flex-col items-center gap-y-2
                                self-center
                            "
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="text-4xl"
                            />
                            <div className="text-lg font-extralight italic">
                                Your order has been placed
                            </div>
                            <div
                                className="
                                    rounded-md bg-gradient-to-r 
                                    from-orange-300 to-red-500 px-2 py-1
                                    shadow-md hover:cursor-pointer 
                                    hover:shadow-xl
                                "
                                onClick={() => {
                                    navigate('/dashboard', { replace: true });
                                }}
                            >
                                Back to Homepage
                            </div>
                        </div>
                    ) : orderCreate.items.length == 0 ? (
                        <div
                            className="
                                my-auto flex flex-col items-center gap-y-2 
                                self-center
                            "
                        >
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="text-4xl"
                            />
                            <div className="text-lg font-extralight italic">
                                No Order
                            </div>
                        </div>
                    ) : (
                        <div className="h-0 flex-grow space-y-2 overflow-y-auto">
                            {orderCreate.items.map((order, i) => (
                                <OrderCard
                                    menuName={
                                        restaurant.menus[order.menu_id].menu
                                            .name
                                    }
                                    menuImage={
                                        restaurant.menus[order.menu_id].image
                                    }
                                    extraRequests={order.extra_requests}
                                    price={calculatePrice(
                                        restaurant.menus[order.menu_id],
                                        order.options,
                                        order.quantity
                                    ).toString()}
                                    quantity={order.quantity}
                                    onEdit={() => {
                                        onEdit(order);
                                    }}
                                    onDelete={() => {
                                        setOrders(
                                            orderCreate.items.filter(
                                                (_, j) => i != j
                                            )
                                        );
                                    }}
                                    key={i}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {orderCreate.items.length != 0 && !orderPlaced ? (
                    <CheckoutSummary
                        onCheckout={() => {
                            createOrder(axiosPrivate, orderCreate).then(() => {
                                setOrderPlaced(true);
                                setOrders([]);
                            });
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
};

/**
 * @param {{ onClose: () => void }} prop
 * @returns {ReactNode}
 */
const BasketPopup = ({ onClose }) => {
    const { orderCreate, restaurant, setOrders } = useRestaurant();
    const [customizing, setCustomizing] = useState(
        /** @type {OrderItem | null} */ (null)
    );

    return customizing != null ? (
        <OrderPopup
            onClose={() => {
                setCustomizing(null);
            }}
            menu_id={customizing.menu_id}
            defaultQuantity={customizing.quantity}
            defaultOptions={customizing.options}
            defaultRequest={customizing.extra_requests}
            onConfirmation={(quantity, options, request) => {
                let replacingIndex = orderCreate.items.findIndex(
                    (x) => x === customizing
                );
                setOrders(
                    orderCreate.items.map((x, i) =>
                        i == replacingIndex
                            ? {
                                  menu_id: customizing.menu_id,
                                  quantity: quantity,
                                  options: options,
                                  extra_requests: request,
                              }
                            : x
                    )
                );

                setCustomizing(null);
            }}
            confirmationText={'Confirm'}
        />
    ) : (
        <OrderSummary
            onClose={onClose}
            onEdit={(orderItem) => {
                setCustomizing(orderItem);
            }}
        />
    );
};

/**
 *
 * @param {{
 *  menu_id: number,
 *  defaultQuantity: number,
 *  defaultOptions: OrderOption[],
 *  defaultRequest: string,
 *  onClose: () => void,
 *  onConfirmation: (
 *    quantity: number,
 *    options: OrderOption[],
 *    request: string
 *  ) => void,
 *  confirmationText: string
 * }} prop
 * @returns {ReactNode}
 */
const OrderPopup = ({
    menu_id,
    defaultQuantity,
    defaultOptions,
    defaultRequest,
    onClose,
    onConfirmation,
    confirmationText,
}) => {
    const { restaurant } = useRestaurant();
    const [ordering, setOrdering] = useState({
        quantity: defaultQuantity,
        options: defaultOptions,
        request: defaultRequest,
    });

    const requiredSelected = () =>
        Object.values(restaurant.menus[menu_id].customizations)
            .filter((c) => c.required)
            .every((c) =>
                c.options.some((o) =>
                    ordering.options.map((x) => x.option_id).includes(o.id)
                )
            );

    return (
        <div
            className="
                fixed bottom-0 left-0 right-0 top-0 z-[20] flex bg-black 
                bg-opacity-10
            "
        >
            <div
                className="
                    mx-auto my-auto flex h-[90%] w-[80%] min-w-[80%] flex-col 
                    overflow-hidden rounded-2xl bg-white drop-shadow-2xl 
                    md:min-w-[70%]
                "
            >
                <div className="relative ml-6 mr-6 mt-6 flex grow flex-col">
                    <FontAwesomeIcon
                        icon={faClose}
                        className="absolute z-10 self-end hover:cursor-pointer"
                        onClick={() => onClose()}
                    />
                    <h1 className="text-2xl font-semibold">
                        {restaurant.menus[menu_id].menu.name}
                    </h1>
                    <hr className="my-2" />
                    <div className="flex h-0 grow flex-col overflow-y-auto">
                        {restaurant.menus[menu_id].menu.description != null ? (
                            <div>
                                <div className="mb-4 text-sm font-light">
                                    {restaurant.menus[menu_id].menu.description}
                                </div>
                            </div>
                        ) : null}
                        {restaurant.menus[menu_id].menu.estimated_prep_time ==
                        null ? null : (
                            <div className="mb-4 flex flex-row items-center">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="mr-2"
                                />
                                <div className="text-sm font-light">
                                    Estaimted Duratoin:{' '}
                                    {`${restaurant.menus[menu_id].menu.estimated_prep_time} mins`}
                                </div>
                            </div>
                        )}
                        {Object.values(
                            restaurant.menus[menu_id].customizations
                        ).map((customization) => (
                            <OrderCustomization
                                customization={customization}
                                orderOptions={ordering.options}
                                setOrderOptions={(options) => {
                                    setOrdering({
                                        ...ordering,
                                        options: options,
                                    });
                                }}
                                key={customization.id}
                            />
                        ))}
                        <div className="px-2">
                            <h1 className="text-xl font-semibold">
                                Customer Request
                            </h1>
                            <hr className="my-2" />
                            <textarea
                                className="
                                    min-h-20 w-full resize-none rounded-md 
                                    bg-slate-50 p-2 text-sm font-light 
                                    shadow-inner focus:outline-none
                                "
                                placeholder="Extra Request to the Restaurant"
                                value={ordering.request}
                                onChange={(e) =>
                                    setOrdering({
                                        ...ordering,
                                        request: e.target.value,
                                    })
                                }
                                id={`customer-request-${menu_id}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between bg-slate-50 pb-6">
                    <hr></hr>
                    <div
                        className="
                            sticky top-10 flex w-[100%] flex-col items-center 
                            pt-4
                        "
                    >
                        <div className="flex flex-row items-center space-x-4">
                            <FontAwesomeIcon
                                icon={faMinus}
                                className="
                                    rounded-full bg-green-400 p-2 shadow-sm 
                                    hover:cursor-pointer hover:bg-green-500
                                "
                                onClick={() => {
                                    if (ordering.quantity == 1) {
                                        return;
                                    }

                                    setOrdering({
                                        ...ordering,
                                        quantity: ordering.quantity - 1,
                                    });
                                }}
                            />
                            <div>{`x${ordering.quantity}`}</div>
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="
                                    rounded-full bg-green-400 p-2 shadow-sm 
                                    hover:cursor-pointer hover:bg-green-500
                                "
                                onClick={() => {
                                    setOrdering({
                                        ...ordering,
                                        quantity: ordering.quantity + 1,
                                    });
                                }}
                            />
                        </div>
                        <div
                            className={
                                `mt-6 flex w-[75%] justify-between rounded-xl bg-gradient-to-r 
                                 px-4 py-2 text-center shadow-lg ` +
                                (requiredSelected() &&
                                restaurant.restaurant.open
                                    ? `from-orange-300 to-red-400 hover:cursor-pointer hover:shadow-xl`
                                    : 'from-slate-100 to-gray-300 text-red-700 ')
                            }
                            onClick={
                                requiredSelected() && restaurant.restaurant.open
                                    ? () => {
                                          onConfirmation(
                                              ordering.quantity,
                                              ordering.options,
                                              ordering.request
                                          );
                                      }
                                    : undefined
                            }
                        >
                            <div>
                                {restaurant.restaurant.open
                                    ? confirmationText
                                    : 'Restaurant Closed'}
                            </div>
                            <div>{`฿${calculatePrice(
                                restaurant.menus[menu_id],
                                ordering.options,
                                ordering.quantity
                            )}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * @param {MenuData} menuData
 * @param {OrderOption[]} options
 * @param {number} quantity
 * @returns {Decimal}
 */
const calculatePrice = (menuData, options, quantity) => {
    let price = new Decimal(menuData.menu.price);

    for (const option_id of options) {
        const option = menuData.options[option_id.option_id];

        if (option.extra_price != null) {
            price = new Decimal(option.extra_price).plus(price);
        }
    }

    return price.times(new Decimal(quantity));
};

/**
 * @typedef {Object} OrderPopup
 *
 * @property {"order"} type
 * @property {number} menu_id
 */

/**
 * @typedef {Object} BasketPopup
 *
 * @property {"basket"} type
 */

/**
 * @typedef {OrderPopup | BasketPopup} Popup
 */

/**
 *  @typedef {Object} PageData
 *
 * @property {Popup | null} popup
 */

/**
 *
 * @param {{page: PageData, setPage: (state: PageData) => void}} prop
 * @returns {ReactNode}
 */
const Popup = ({ page, setPage }) => {
    const { orderCreate, restaurant, setOrders } = useRestaurant();

    if (page.popup == null) {
        return null;
    }

    if (page.popup.type === 'order') {
        const menu_id = page.popup.menu_id;
        return (
            <OrderPopup
                menu_id={page.popup.menu_id}
                onConfirmation={(quantity, options, request) => {
                    setOrders([
                        ...orderCreate.items,
                        {
                            menu_id: menu_id,
                            quantity: quantity,
                            options: options,
                            extra_requests: request,
                        },
                    ]);
                    setPage({
                        popup: null,
                    });
                }}
                onClose={() => {
                    setPage({
                        ...page,
                        popup: null,
                    });
                }}
                defaultQuantity={1}
                defaultOptions={[]}
                defaultRequest=""
                confirmationText={'Add to Basket'}
            />
        );
    } else if (page.popup.type === 'basket') {
        return (
            <BasketPopup
                onClose={() => {
                    setPage({
                        popup: null,
                    });
                }}
            />
        );
    } else {
        return null;
    }
};

/**
 * @returns {ReactNode}
 */
const MainPage = () => {
    const [page, setPage] = useState({
        popup: /** @type {Popup | null} */ (null),
    });

    const { restaurant, orderCreate } = useRestaurant();

    const totlaQuantity = orderCreate.items.reduce(
        (acc, order) => acc + order.quantity,
        0
    );

    const totalPrice = orderCreate.items.reduce(
        (acc, order) =>
            acc.plus(
                calculatePrice(
                    restaurant.menus[order.menu_id],
                    order.options,
                    order.quantity
                )
            ),
        new Decimal(0)
    );

    return (
        <div className="flex min-h-svh flex-col">
            <div className="sticky top-0 z-[10]">
                <Header />
            </div>
            <div className="relative">
                <img
                    src={restaurant.image}
                    className="
                      h-52 w-full object-cover object-center drop-shadow-2xl
                    "
                />
                <div className="absolute left-0 right-0 top-16">
                    <div
                        className="
                            mx-4 rounded-xl bg-slate-50 p-4 drop-shadow-xl 
                            md:mx-auto md:w-fit md:min-w-[50%]
                        "
                    >
                        <div className="flex justify-between pb-4">
                            <div className="h-fit text-2xl font-semibold">
                                {restaurant.restaurant.name}
                            </div>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="self-center"
                            />
                        </div>
                        <hr></hr>
                        <div>
                            <div className="flex justify-between">
                                {restaurant.restaurant.open ? (
                                    <div
                                        className="
                                            p-1 text-sm text-green-600
                                        "
                                    >
                                        Open
                                    </div>
                                ) : (
                                    <div className="p-1 text-sm text-red-800">
                                        Closed
                                    </div>
                                )}
                            </div>
                            <hr></hr>
                            <div className="flex justify-between p-1 text-sm">
                                <div>Queues</div>
                                <div>
                                    {restaurant.queue.queue_count == 0
                                        ? 'None'
                                        : `${restaurant.queue.queue_count} queue(s)`}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex justify-between p-1 text-sm">
                                <div>Estimated Time</div>
                                <div>
                                    {restaurant.queue.estimated_time == 0
                                        ? 'None'
                                        : `${restaurant.queue.estimated_time} min(s)`}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex justify-between p-1 text-sm">
                                <div>Rating and Review</div>
                                <div>4.7/5.0</div>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="
                    mx-4 mt-20 flex grow flex-col gap-x-2 gap-y-2 md:flex-row
                    md:flex-wrap md:justify-center
                "
            >
                {Object.entries(restaurant.menus).map(
                    ([/** @type {number} */ id, menu]) => (
                        <MenuCard
                            menu={menu.menu}
                            image={menu.image}
                            onClick={() => {
                                setPage({
                                    ...page,
                                    popup: {
                                        type: 'order',
                                        menu_id: Number(id),
                                    },
                                });
                            }}
                            key={id}
                        />
                    )
                )}
            </div>
            <div
                className={
                    `z-2 min-w-50 sticky bottom-5 mx-auto my-5 flex w-[50%] 
                    justify-between rounded-xl bg-gradient-to-r px-6 py-2 
                    text-center drop-shadow-xl hover:cursor-pointer 
                    hover:shadow-2xl ` +
                    (restaurant.restaurant.open
                        ? 'from-orange-300 to-red-500'
                        : 'from-slate-100 to-gray-300 text-red-700')
                }
                onClick={
                    totlaQuantity == 0 || !restaurant.restaurant.open
                        ? undefined
                        : () => {
                              setPage({
                                  ...page,
                                  popup: {
                                      type: 'basket',
                                  },
                              });
                          }
                }
            >
                {restaurant.restaurant.open ? (
                    <>
                        <div className="flex items-center gap-x-2">
                            <FontAwesomeIcon
                                icon={faBasketShopping}
                                className="text"
                            />
                            <div>{`x${totlaQuantity}`}</div>
                        </div>
                        <div>
                            {totlaQuantity == 0
                                ? 'No Orders'
                                : `฿${totalPrice}`}
                        </div>
                    </>
                ) : (
                    <div className="w-full text-center">Restaurant Closed</div>
                )}
            </div>
            <Popup page={page} setPage={setPage} />
        </div>
    );
};

/**
 * @typedef {Object} MenuData
 *
 * @property {Menu} menu
 * @property {string} image
 * @property {{[key: number]: Customization}} customizations
 * @property {{[key: number]: Option}} options
 */

/**
 * @typedef {Object} RestaurantData
 *
 * @property {Restaurant} restaurant
 * @property {string} image
 * @property {{[key: number]: MenuData}} menus
 * @property {Queue} queue
 */

/**
 * @typedef {Object} RestaurantContextValue
 *
 * @property {OrderCreate} orderCreate
 * @property {(items: OrderItem[]) => void} setOrders
 * @property {RestaurantData} restaurant
 */

const RestaurantContext = React.createContext(
    /** @type {undefined | RestaurantContextValue} */ (undefined)
);

/**
 * @param {{
 *  children: ReactNode
 *  restaurant: RestaurantData
 * }} props
 *
 * @returns {ReactNode}
 */
const RestaurantProvider = ({ children, restaurant }) => {
    const [cookie, setCookie, _] =
        /** @type {ReturnType<typeof useCookies<"order", {[K in "order"]?: OrderCreate}>>} */
        (useCookies(['order']));

    useMemo(() => {
        if (
            cookie.order == null ||
            cookie.order.restaurant_id != restaurant.restaurant.id
        ) {
            setCookie(
                'order',
                /**@type {OrderCreate} */ ({
                    restaurant_id: restaurant.restaurant.id,
                    items: [],
                })
            );
        }
    }, []);

    if (cookie.order == null) {
        throw new Error('Cookie is null');
    }

    return (
        <RestaurantContext.Provider
            value={{
                orderCreate: cookie.order,
                setOrders: /** @type{(items: OrderItem[]) => void} */ (
                    (items) => {
                        setCookie('order', {
                            restaurant_id: restaurant.restaurant.id,
                            items: items,
                        });
                    }
                ),
                restaurant: restaurant,
            }}
        >
            {children}
        </RestaurantContext.Provider>
    );
};

/**
 * @returns {RestaurantContextValue}
 */
const useRestaurant = () => {
    const value = React.useContext(RestaurantContext);
    if (value == null) {
        throw new Error('Restaurant context is not provided');
    }

    return value;
};

/**
 * @returns {ReactNode}
 */
const Restaurant = () => {
    const { restaurantID: restaurantIDString } = useParams();

    if (restaurantIDString == null) {
        throw new Error('Restaurant ID is not provided');
    }

    const [restaurant, setRestaurant] = useState(
        /** @type {RestaurantData | undefined | null}*/
        (undefined)
    );

    const restaurantID = parseInt(restaurantIDString);

    useEffect(() => {
        const getData = async () => {
            try {
                const restaurant = await getRestaurant(restaurantID);
                const restaurantImage = await getRestaurantImage(restaurantID);
                const menus = await getRestaurantMenus(restaurantID);

                /** @type {{[id: number]: MenuData}} */
                let menuDatas = {};

                for (const menu of menus) {
                    const menuImage = await getMenuImage(menu.id);

                    /** @type {MenuData}  */
                    let menuData = {
                        menu: menu,
                        image:
                            menuImage == null
                                ? defaultMenuImage
                                : URL.createObjectURL(menuImage),
                        customizations: {},
                        options: {},
                    };

                    const customization = await getMenuCustomizations(menu.id);

                    for (const c of customization) {
                        menuData.customizations[c.id] = c;
                        for (const o of c.options) {
                            menuData.options[o.id] = o;
                        }
                    }

                    menuDatas[menu.id] = menuData;
                }

                const queue = await getRestaurantQueue(restaurantID);

                setRestaurant({
                    restaurant: restaurant,
                    image:
                        restaurantImage == null
                            ? defaultRestaurantImage
                            : URL.createObjectURL(restaurantImage),
                    menus: menuDatas,
                    queue: queue,
                });
            } catch (error) {
                setRestaurant(null);
            }
        };

        getData();
    }, []);

    if (restaurant === undefined) {
        return <LoadingPage opacity={true} />;
    } else if (restaurant === null) {
        return <ErrorPage message="We couldn't find the restaurant for you" />;
    } else {
        return (
            <RestaurantProvider restaurant={restaurant}>
                <MainPage />;
            </RestaurantProvider>
        );
    }
};

export default Restaurant;
