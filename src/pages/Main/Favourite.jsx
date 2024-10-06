// @ts-check

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import RestaurantCard from '../../components/RestaurantCard';

const Favourite = () => {
  return (
    <div className="flex h-full flex-col pl-7 pr-7 pt-7">
      <div className="flex items-center space-x-10">
        {/* <FontAwesomeIcon className="icon-size" icon={faBookmark} /> */}
        <h1 className="big-title">Favourite</h1>
      </div>
      <hr className="my-4"></hr>
      <div className="flex h-0 grow">
        <div className="flex grow  flex-col overflow-y-auto">
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </div>
      </div>
    </div>
  );
};

export default Favourite;
