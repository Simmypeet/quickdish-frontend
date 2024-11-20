// @ts-check

import {
  getMenu,
  getMenuCustomizations,
  getMenuImage,
} from "../../api/restaurantApi";
import React, { useEffect, useState } from "react";

// @ts-expect-error
import defaultMenuImage from "defaultMenu.webp";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import OrderCard from "../../components/OrderCard";
import Decimal from "decimal.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @import { Restaurant, Menu, Customization, Option } from "../../types/restaurant";
 * @import { OrderCreate, OrderOption } from "../../types/order";
 */

/**
 * @param {OrderCreate} order
 * @returns {React.ReactElement}
 */
const Checkout = ({ restaurant_id, order_items }) => {
  /**
   * @typedef {Object} CheckoutData
   *
   * @property { {[key: number]: Menu} } menus
   * @property { {[key: number]: Blob | null } } menuImages
   * @property { {[key: number]: Restaurant} } restaurants
   * @property { {[key: number]: Blob | null } } restaurantImages
   * @property { {[key: number]: Customization} } customizations
   * @property { {[key: number]: Option} } options
   */

  const [checkoutData, setCheckoutData] = useState(
    /**@type {CheckoutData | undefined} */ (undefined)
  );

  useEffect(() => {
    const fetchData = async () => {
      let checkoutData = /**@type {CheckoutData} */ ({
        menus: {},
        menuImages: {},
        restaurants: {},
        restaurantImages: {},
        customizations: {},
        options: {},
      });
      console.log(order_items);

      for (const item of order_items) {
        if (item.menu_id in checkoutData.menus) {
          continue;
        }

        const menu = await getMenu(item.menu_id);

        if (menu == null) {
          throw new Error("Error fetching menu");
        }

        checkoutData.menus[item.menu_id] = menu;

        const image = await getMenuImage(item.menu_id);
        checkoutData.menuImages[item.menu_id] = image;

        const customizations = await getMenuCustomizations(item.menu_id);

        for (const customization of customizations) {
          checkoutData.customizations[customization.id] = customization;

          for (const option of customization.options) {
            checkoutData.options[option.id] = option;
          }
        }
      }

      setCheckoutData(checkoutData);
    };

    fetchData();
  }, []);

  /**
   *
   * @param {Decimal} basePrice
   * @param {{[key: number]: Option}} options
   * @param {OrderOption[]} orderOptions
   * @param {number} quantity
   * @returns
   */
  const calculatePrice = (basePrice, options, orderOptions, quantity) => {
    let price = new Decimal(basePrice);

    for (const orderOption of orderOptions) {
      const option = options[orderOption.option_id];

      if (option.extra_price != null) {
        price = new Decimal(option.extra_price).plus(price);
      }
    }

    return price.times(new Decimal(quantity));
  };

  if (checkoutData == null) {
    return <div>Loading...</div>;
  }

  /**
   * @param {number} menuID
   * @returns {string}
   */
  const pickMenuImage = (menuID) => {
    const image = checkoutData.menuImages[menuID];
    if (image) {
      return URL.createObjectURL(image);
    }

    return defaultMenuImage;
  };

  return (
    <div className="flex flex-col h-screen justify-between md:flex-row">
      <div className="mx-3 flex flex-col flex-grow md:grow-[2]">
        <h1 className="my-4 text-2xl font-semibold">Review Your Order</h1>
        <hr></hr>
        <div className="flex flex-col overflow-y-auto mt-2 gap-y-2">
          {order_items.map((item) => (
            <OrderCard
              menuName={checkoutData.menus[item.menu_id].name}
              menuImage={pickMenuImage(item.menu_id)}
              extraRequests={item.extra_requests}
              price={calculatePrice(
                new Decimal(checkoutData.menus[item.menu_id].price),
                checkoutData.options,
                item.options,
                item.quantity
              ).toString()}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:grow-[1] md:border-l bg-slate-50">
        <hr className="md:hidden"></hr>
        <div className="hidden md:block mx-3">
          <h1 className="text-2xl font-semibold my-4">Order Summary</h1>
          <hr></hr>
        </div>
        <div className="p-3 flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="font-semibold">Total</div>
            <div className="">300฿</div>
          </div>
          <hr className="my-1"></hr>
          <div className="flex flex-row justify-between">
            <div className="font-semibold">Queues</div>
            <div>32</div>
          </div>
          <hr className="my-1"></hr>
          <div className="flex flex-row justify-between">
            <div className="font-semibold">Estimated Time</div>
            <div>400 Minutes</div>
          </div>
          <div
            className="
              p-2 mt-2 bg-gradient-to-r from-orange-300 to-red-500 
              text-white font-semibold text-center rounded-md shadow-md
              cursor-pointer flex flex-row justify-center items-center
            "
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            <div>Order</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
