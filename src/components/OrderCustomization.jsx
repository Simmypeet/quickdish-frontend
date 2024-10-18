// @ts-check

import Decimal from 'decimal.js';
import React from 'react';

/**
 * @import { Customization  } from "../types/restaurant";
 * @import { OrderOption  } from "../types/order";
 */

/**
 *
 * @param {{
 *  customization: Customization,
 *  orderOptions: OrderOption[],
 *  setOrderOptions: (options: OrderOption[]) => void,
 * }} props
 * @returns
 */
const OrderCustomization = ({
    customization,
    orderOptions,
    setOrderOptions,
}) => {
    /**
     * @param {boolean} checked
     * @param {number} id
     */
    const onChecked = (checked, id) => {
        if (checked) {
            if (customization.unique) {
                setOrderOptions([
                    ...orderOptions.filter(
                        (id) =>
                            !customization.options.some(
                                (o) => o.id === id.option_id
                            )
                    ),
                    {
                        option_id: id,
                    },
                ]);
            } else {
                setOrderOptions([
                    ...orderOptions,
                    {
                        option_id: id,
                    },
                ]);
            }
        } else {
            setOrderOptions(
                orderOptions.filter((option) => option.option_id !== id)
            );
        }
    };

    return (
        <div className="px-2">
            <div
                className="
                    flex flex-row items-center justify-between space-x-2
                "
            >
                <h1 className="text-xl font-semibold">
                    {customization.unique
                        ? `${customization.title} (Choose One)`
                        : customization.title}
                </h1>
                {customization.required ? (
                    <div className="font-light italic text-red-700">
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
                    my-2 flex flex-col rounded-md bg-slate-50 p-2 shadow-inner
                "
            >
                {customization.options.map((option) => (
                    <div key={option.id}>
                        <div
                            className="
                                flex flex-row items-center justify-between
                            "
                        >
                            <div className="flex flex-row space-x-2">
                                <input
                                    type="checkbox"
                                    className="self-center"
                                    checked={orderOptions
                                        .map((x) => x.option_id)
                                        .includes(option.id)}
                                    onChange={(e) => {
                                        onChecked(e.target.checked, option.id);
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
                                <div className="text-sm font-light">
                                    {`+${new Decimal(option.extra_price)}`}
                                </div>
                            ) : null}
                        </div>
                        <hr></hr>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCustomization;
