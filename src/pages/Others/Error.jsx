// @ts-check

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import React from 'react';

/**
 * @param {{message: string}} prop
 * @returns {import("react").ReactNode}
 */
const ErrorPage = ({ message }) => (
  <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col">
    <div className="sticky top-0 z-[10]">
      <Header />
    </div>

    <div className="my-auto flex h-2/4 w-full flex-col justify-evenly">
      <div className="flex flex-col items-center gap-y-4">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          mask={faSquareFull}
          className="
            bg-gradient-to-r  from-orange-300 to-red-500 text-6xl
            text-white
        "
        />
        <div
          className="
          bg-gradient-to-r from-orange-300 to-red-500 bg-clip-text
        text-4xl font-semibold text-transparent
        "
        >
          Sorry
        </div>
        <div className="text-lg">{message}</div>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="
          mt-4 rounded-xl bg-gradient-to-r from-orange-300 to-red-500 
          p-2 font-semibold text-white drop-shadow-md
          hover:cursor-pointer hover:drop-shadow-xl
        "
        >
          Back to Homepage
        </div>
      </div>
    </div>
  </div>
);

export default ErrorPage;
