// @ts-check

import React from "react";

import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

/**
 * @import { ReactNode } from "react"
 */

/**
 * @param {{
 *  menuName: string
 *  menuImage: string
 *  extraRequests: string
 *  price: string,
 *  quantity: number,
 *  onEdit?: () => void,
 *  onDelete?: () => void
 * }} props
 * @returns {ReactNode}
 */
const OrderCard = ({
  menuName,
  menuImage,
  extraRequests,
  price,
  quantity,
  onEdit,
  onDelete,
}) => (
  <div
    className="
    bg-slate-50 shadow-inner rounded-md flex flex-row overflow-hidden p-2
      h-28
    "
  >
    <img
      src={menuImage}
      className="
        aspect-square h-24 object-cover object-center rounded-xl drop-shadow-md 
        self-center hidden sm:block
      "
    />
    <div className="flex flex-row justify-between flex-grow">
      <div className="flex flex-col px-4 flex-grow">
        <div className="text-lg font-semibold line-clamp-1">{menuName}</div>
        <hr className="my-1"></hr>
        <div className="text-sm font-extralight line-clamp-2 sm:line-clamp-3">
          {extraRequests == "" ? "No Extra Request" : extraRequests}
        </div>
      </div>
      <div className="flex flex-col items-end pr-2 justify-between">
        <div className="text-lg font-semibold">{`฿${price}`}</div>
        <div className="flex items-center">
          <div className="text-sm inline">x</div>
          <div className="text-lg font-semibold pl-1">{` ${quantity}`}</div>
        </div>
        <div className="flex flex-row gap-x-2">
          {onEdit == null ? undefined : (
            <FontAwesomeIcon
              icon={faEdit}
              className="hover:cursor-pointer hover:text-orange-400"
              onClick={() => onEdit()}
            />
          )}
          {onDelete == null ? undefined : (
            <FontAwesomeIcon
              icon={faTrash}
              className="hover:cursor-pointer hover:text-red-400"
              onClick={() => onDelete()}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

export default OrderCard;
