// @ts-check

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Decimal from "decimal.js";

// @ts-expect-error
import defaultRestaurantImage from "../../assets/defaultRestaurant.jpeg";
// @ts-expect-error
import defaultMenuImage from "../../assets/defaultMenu.webp";

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
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  getRestaurant,
  getRestaurantImage,
  getRestaurantMenus,
  getMenuImage,
  getMenuCustomizations,
} from "../../api/restaurantApi";
import { LoadingPage } from "../../components/LoadingPage";
import ErrorPage from "../Others/Error";
import OrderCard from "../../components/OrderCard";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getRestaurantQueue } from "../../api/orderApi";

/**
 * @param {{
 *  queue: Queue,
 *  orders: OrderItem[],
 *  restaurantData: RestaurantData,
 *  onClose: (orders: OrderItem[]) => void
 * }} prop
 * @returns {ReactNode}
 */
const BasketPopup = ({ queue, orders, restaurantData, onClose }) => {
  const [thisOrders, setThisOrders] = useState([...orders]);
  const [customizing, setCustomizing] = useState(
    /** @type {OrderItem | null} */ (null)
  );

  return customizing != null ? (
    <OrderPopup
      restaurantData={restaurantData}
      onClose={() => {
        setCustomizing(null);
      }}
      menu_id={customizing.menu_id}
      defaultQuantity={customizing.quantity}
      defaultOptions={customizing.options}
      defaultRequest={customizing.extra_requests}
      onConfirmation={(quantity, options, request) => {
        let replacingIndex = thisOrders.findIndex((x) => x === customizing);
        thisOrders[replacingIndex] = {
          menu_id: customizing.menu_id,
          quantity: quantity,
          options: options,
          extra_requests: request,
        };
        setThisOrders([...thisOrders]);

        setCustomizing(null);
      }}
      confirmationText={"Confirm"}
    />
  ) : (
    <div
      className="
        fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-10 flex
      "
    >
      <div
        className="
          bg-white rounded-2xl drop-shadow-2xl flex flex-col
          mx-auto min-w-[80%] md:min-w-[70%] w-[80%] h-[90%] my-auto
          md:flex-row overflow-hidden
        "
      >
        <div
          className="
            flex flex-col ml-6 mr-6 mt-6 grow
          "
        >
          <FontAwesomeIcon
            icon={faClose}
            className="absolute self-end hover:cursor-pointer z-10"
            onClick={() => {
              onClose(thisOrders);
            }}
          />
          <h1 className="text-2xl font-semibold">Basket</h1>
          <hr className="my-2" />

          {thisOrders.length == 0 ? (
            <div
              className="
                self-center flex flex-col gap-y-2 items-center my-auto
              "
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-4xl" />
              <div className="text-lg font-extralight italic">No Order</div>
            </div>
          ) : (
            <div className="flex-grow gap-y-2 overflow-y-auto h-0">
              {thisOrders.map((order) => (
                <OrderCard
                  menuName={restaurantData.menus[order.menu_id].menu.name}
                  menuImage={restaurantData.menus[order.menu_id].image}
                  extraRequests={order.extra_requests}
                  price={calculatePrice(
                    restaurantData.menus[order.menu_id],
                    order.options,
                    order.quantity
                  ).toString()}
                  quantity={order.quantity}
                  onEdit={() => {
                    setCustomizing(order);
                  }}
                  onDelete={() => {
                    setThisOrders(thisOrders.filter((x) => x !== order));
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {thisOrders.length != 0 ? (
          <div
            className="
            flex flex-col bg-slate-100 pb-4 md:pb-0 md:pt-4 md:grow 
            md:border-l-[1.5px] md:border-black-900"
          >
            <div className="hidden md:block">
              <h1 className="text-2xl font-semibold m-2 line-clamp-1">
                Checkout
              </h1>
              <hr className="mx-2 mb-2"></hr>
            </div>
            <hr className="mb-2 md:hidden"></hr>

            <div
              className="
                flex flex-col md:bg-white px-4 md:mb-2 md:py-2 md:mx-2 
                md:shadow-inner rounded-xl grow justify-between 
              "
            >
              <div className="mb-4">
                <div className="">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-x-2 my-1">
                      <FontAwesomeIcon icon={faSort} />
                      <h1 className="line-clamp-1">Queues</h1>
                    </div>
                    <h1 className="line-clamp-1">
                      {queue.queue_count == 0
                        ? "None"
                        : `${queue.queue_count} queue(s)`}
                    </h1>
                  </div>
                  <hr></hr>
                </div>

                <div className="">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-x-2 my-1">
                      <FontAwesomeIcon icon={faClock} />
                      <h1 className="line-clamp-1">Estimated Time</h1>
                    </div>
                    <h1 className="line-clamp-1">
                      {queue.estimated_time == 0
                        ? "None"
                        : `${queue.estimated_time} min(s)`}
                    </h1>
                  </div>
                  <hr></hr>
                </div>

                <div className="">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-x-2 my-1">
                      <FontAwesomeIcon icon={faBasketShopping} />
                      <h1 className="">Quantity</h1>
                    </div>
                    <h1>32</h1>
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div
                className={
                  `bg-gradient-to-r py-2 px-6 rounded-xl self-center drop-shadow-lg 
                hover:cursor-pointer hover:shadow-2xl flex flex-row w-4/5
                justify-between items-center  ` +
                  (thisOrders.length == 0
                    ? "from-gray-300 to-gray-400 text-red-700"
                    : "from-orange-300 to-red-400")
                }
              >
                <div className="flex flex-row items-center gap-x-2">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <div>{thisOrders.length == 0 ? "No Orders" : `Order`}</div>
                </div>
                <div>{`฿${thisOrders.reduce((acc, x) => {
                  return acc.plus(
                    calculatePrice(
                      restaurantData.menus[x.menu_id],
                      x.options,
                      x.quantity
                    )
                  );
                }, new Decimal(0))}`}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

/**
 *
 * @param {{
 *  restaurantData: RestaurantData,
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
  restaurantData,
  menu_id,
  defaultQuantity,
  defaultOptions,
  defaultRequest,
  onClose,
  onConfirmation,
  confirmationText,
}) => {
  const [ordering, setOrdering] = useState({
    quantity: defaultQuantity,
    options: defaultOptions,
    request: defaultRequest,
  });

  const requiredSelected = () =>
    Object.values(restaurantData.menus[menu_id].customizations)
      .filter((c) => c.required)
      .every((c) =>
        c.options.some((o) =>
          ordering.options.map((x) => x.option_id).includes(o.id)
        )
      );

  return (
    <div
      className="
        fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-10 flex
      "
    >
      <div
        className="
          bg-white rounded-2xl drop-shadow-2xl flex flex-col mx-auto 
          min-w-[80%] md:min-w-[70%] w-[80%] h-[90%] my-auto overflow-hidden
        "
      >
        <div className="flex flex-col grow ml-6 mr-6 mt-6">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute self-end hover:cursor-pointer z-10"
            onClick={() => onClose()}
          />
          <h1 className="text-2xl font-semibold">
            {restaurantData.menus[menu_id].menu.name}
          </h1>
          <hr className="my-2" />
          <div className="flex flex-col overflow-y-auto grow h-0">
            {restaurantData.menus[menu_id].menu.description != null ? (
              <div>
                <div className="font-light text-sm mb-4">
                  {restaurantData.menus[menu_id].menu.description}
                </div>
              </div>
            ) : null}
            {restaurantData.menus[menu_id].menu.estimated_prep_time ==
            null ? null : (
              <div className="flex flex-row items-center mb-4">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <div className="text-sm font-light">
                  Estaimted Duratoin:{" "}
                  {`${restaurantData.menus[menu_id].menu.estimated_prep_time} mins`}
                </div>
              </div>
            )}
            {Object.values(restaurantData.menus[menu_id].customizations).map(
              (customization) => (
                <div className="px-2">
                  <div
                    className="
                      flex flex-row justify-between items-center space-x-2
                    "
                  >
                    <h1 className="text-xl font-semibold">
                      {customization.unique
                        ? `${customization.title} (Choose One)`
                        : customization.title}
                    </h1>
                    {customization.required ? (
                      <div className="text-red-700 font-light italic">
                        required
                      </div>
                    ) : null}
                  </div>
                  <hr className="my-2" />
                  {customization.description != null ? (
                    <div className="text-sm font-light">
                      {customization.description}
                    </div>
                  ) : null}
                  <div
                    className="
                      flex flex-col bg-slate-50 p-2 rounded-md shadow-inner
                      my-2
                    "
                  >
                    {customization.options.map((option) => (
                      <>
                        <div
                          className="
                            flex flex-row justify-between items-center
                          "
                        >
                          <div className="flex flex-row space-x-2">
                            <input
                              type="checkbox"
                              className="self-center"
                              checked={ordering.options
                                .map((x) => x.option_id)
                                .includes(option.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  if (customization.unique) {
                                    setOrdering({
                                      ...ordering,
                                      options: [
                                        ...ordering.options.filter(
                                          (id) =>
                                            !customization.options.some(
                                              (o) => o.id === id.option_id
                                            )
                                        ),
                                        { option_id: option.id },
                                      ],
                                    });
                                  } else {
                                    setOrdering({
                                      ...ordering,
                                      options: [
                                        ...ordering.options,
                                        { option_id: option.id },
                                      ],
                                    });
                                  }
                                } else {
                                  setOrdering({
                                    ...ordering,
                                    options: ordering.options.filter(
                                      (id) => id.option_id !== option.id
                                    ),
                                  });
                                }
                              }}
                            />
                            <div className="my-1">
                              <h1 className="text-sm font-light">
                                {option.name}
                              </h1>
                            </div>
                          </div>
                          {option.extra_price != null &&
                          parseFloat(option.extra_price) > 0 ? (
                            <div className="font-light text-sm">
                              {`+${new Decimal(option.extra_price)}`}
                            </div>
                          ) : null}
                        </div>
                        <hr></hr>
                      </>
                    ))}
                  </div>
                </div>
              )
            )}
            <div className="px-2">
              <h1 className="text-xl font-semibold">Customer Request</h1>
              <hr className="my-2" />
              <textarea
                className="
                  w-full bg-slate-50 shadow-inner p-2 font-light text-sm 
                  resize-none  min-h-20 focus:outline-none rounded-md
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
                sticky top-10 flex flex-col items-center w-[100%] pt-4
              "
          >
            <div className="flex flex-row space-x-4 items-center">
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
                `rounded-xl bg-gradient-to-r py-2 px-4 mt-6 shadow-lg 
                      w-[75%] text-center flex justify-between ` +
                (requiredSelected()
                  ? `from-orange-300 to-red-400 hover:cursor-pointer 
                          hover:shadow-xl`
                  : "from-slate-100 to-gray-300 text-red-700 ")
              }
              onClick={
                requiredSelected()
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
              <div>{confirmationText}</div>
              <div>{`฿${calculatePrice(
                restaurantData.menus[menu_id],
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
 * @param {{restaurantData: RestaurantData}} prop
 * @returns {ReactNode}
 */
const MainPage = ({ restaurantData }) => {
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
  const [page, setPage] = useState({
    popup: /** @type {Popup | null} */ (null),
  });

  const [cookie, setCookie, _] =
    /** @type {ReturnType<typeof useCookies<"order", {[K in "order"]?: OrderCreate}>>} */
    (useCookies(["order"]));

  useMemo(() => {
    if (
      cookie.order == null ||
      cookie.order.restaurant_id != restaurantData.restaurant.id
    ) {
      setCookie(
        "order",
        /**@type {OrderCreate} */ ({
          restaurant_id: restaurantData.restaurant.id,
          order_items: [],
        })
      );
    }
  }, []);

  if (cookie.order == null) {
    throw new Error("Cookie is null");
  }

  const totlaQuantity = cookie.order.order_items.reduce(
    (acc, order) => acc + order.quantity,
    0
  );

  const totalPrice = cookie.order.order_items.reduce(
    (acc, order) =>
      acc.plus(
        calculatePrice(
          restaurantData.menus[order.menu_id],
          order.options,
          order.quantity
        )
      ),
    new Decimal(0)
  );

  /**
   *
   * @param {{page: PageData, setPage: (state: PageData) => void}} prop
   * @returns {ReactNode}
   */
  const Popup = ({ page, setPage }) => {
    // cookie.order must not be null
    const [cookie, setCookie, _] =
      /** @type {ReturnType<typeof useCookies<"order", {[K in "order"]?: OrderCreate}>>} */
      (useCookies(["order"]));

    if (cookie.order == null) {
      throw new Error("Cookie is null");
    }

    if (page.popup == null) {
      return null;
    }

    if (page.popup.type === "order") {
      const menu_id = page.popup.menu_id;
      return (
        <OrderPopup
          menu_id={page.popup.menu_id}
          restaurantData={restaurantData}
          onConfirmation={(quantity, options, request) => {
            setCookie(
              "order",
              /**@type {OrderCreate} */ ({
                restaurant_id: restaurantData.restaurant.id,
                order_items: [
                  // @ts-expect-error
                  ...cookie.order.order_items,
                  {
                    menu_id: menu_id,
                    quantity: quantity,
                    options: options,
                    extra_requests: request,
                  },
                ],
              })
            );
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
          confirmationText={"Add to Basket"}
        />
      );
    } else if (page.popup.type === "basket") {
      return (
        <BasketPopup
          queue={restaurantData.queue}
          orders={cookie.order.order_items}
          restaurantData={restaurantData}
          onClose={(orders) => {
            setCookie(
              "order",
              /**@type {OrderCreate} */ ({
                restaurant_id: restaurantData.restaurant.id,
                order_items: orders,
              })
            );
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

  return (
    <div className="mx-auto">
      <img
        src={restaurantData.image}
        className="
          top-0 absolute w-[100%] h-auto max-h-[25vh] object-center object-cover 
          min-h-40 drop-shadow-2xl
        "
      />
      <div
        className="
        bg-slate-50 rounded-xl md:w-fit p-4 mx-4 md:mx-auto md:min-w-[50%] 
          mt-20 drop-shadow-xl
        "
      >
        <div className="flex justify-between pb-4">
          <div className="text-2xl font-semibold h-fit">
            {restaurantData.restaurant.name}
          </div>
          <FontAwesomeIcon icon={faLocationDot} className="self-center" />
        </div>
        <hr></hr>
        <div>
          <div className="flex justify-between">
            <div className="text-red-800 text-sm p-1">Busy</div>
          </div>
          <hr></hr>
          <div className="flex justify-between text-sm p-1">
            <div>Queues</div>
            <div>
              {restaurantData.queue.queue_count == 0
                ? "None"
                : `${restaurantData.queue.queue_count} queue(s)`}
            </div>
          </div>
          <hr></hr>
          <div className="flex justify-between text-sm p-1">
            <div>Estimated Time</div>
            <div>
              {restaurantData.queue.estimated_time == 0
                ? "None"
                : `${restaurantData.queue.estimated_time} min(s)`}
            </div>
          </div>
          <hr></hr>
          <div className="flex justify-between text-sm p-1">
            <div>Rating and Review</div>
            <div>4.7/5.0</div>
          </div>
          <hr></hr>
        </div>
      </div>
      <div
        className="
          flex flex-col my-8 mx-4 justify-center gap-x-2 gap-y-2 md:flex-row
          md:flex-wrap
        "
      >
        {Object.entries(restaurantData.menus).map(
          ([/** @type {number} */ id, menu]) => (
            <div
              className="
              bg-slate-50 rounded-2xl shadow-lg hover:shadow-xl flex 
                flex-row h-32 max-h-32 md:flex-col md:h-auto md:max-h-none 
                md:w-64 md:max-w-64 overflow-hidden
              "
              key={id}
            >
              <img
                src={menu.image}
                className="
                aspect-square h-full w-auto p-2 object-cover object-center
                rounded-xl drop-shadow-sm md:p-0 md:rounded-none
              "
              />
              <div className="flex justify-between p-2 grow">
                <div className="flex flex-col">
                  <div className="text-lg font-semibold line-clamp-1">
                    {menu.menu.name}
                  </div>
                  <div className="text-sm mt-4 line-clamp-1">
                    {menu.menu.description}
                  </div>
                  <div className="text-sm mt-4 line-clamp-1">
                    {`฿${menu.menu.price}`}
                  </div>
                  <div className="gap-x-2 mt-4 hidden md:flex">
                    <FontAwesomeIcon
                      className="text-sm self-center"
                      icon={faClock}
                    />
                    <div className="text-sm line-clamp-1">
                      {menu.menu.estimated_prep_time == null
                        ? "Not Specified"
                        : `${menu.menu.estimated_prep_time} mins`}
                    </div>
                  </div>
                </div>
                <FontAwesomeIcon
                  className="
                  rounded-full bg-green-400 p-2 shadow-sm self-end text-sm
                  hover:cursor-pointer  hover:shadow-lg hover:bg-green-500
                  mb-1
                "
                  icon={faPlus}
                  onClick={async () => {
                    setPage({
                      ...page,
                      popup: {
                        type: "order",
                        menu_id: Number(id),
                      },
                    });
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
      <div
        className="
          sticky bottom-5 mx-auto text-center bg-gradient-to-r from-orange-300 
          to-red-400 rounded-xl px-6 py-2 z-2 drop-shadow-xl flex min-w-50
          justify-between w-[50%] hover:cursor-pointer hover:shadow-2xl
        "
        onClick={
          totlaQuantity == 0
            ? undefined
            : () => {
                setPage({
                  ...page,
                  popup: {
                    type: "basket",
                  },
                });
              }
        }
      >
        <div className="flex gap-x-2 items-center">
          <FontAwesomeIcon icon={faBasketShopping} className="text" />
          <div>{`x${totlaQuantity}`}</div>
        </div>
        <div>{totlaQuantity == 0 ? "No Orders" : `฿${totalPrice}`}</div>
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
 * @returns {ReactNode}
 */
const Restaurant = () => {
  const { restaurantID: restaurantIDString } = useParams();

  if (restaurantIDString == null) {
    throw new Error("Restaurant ID is not provided");
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
    return <MainPage restaurantData={restaurant} />;
  }
};

export default Restaurant;