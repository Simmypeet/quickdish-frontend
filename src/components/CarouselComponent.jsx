// @ts-check

import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CanteenCard from './CanteenCard';
import useLocation from '../hooks/useLocation';
import { getCanteenImgFromId, getNearestCanteens } from '../api/canteenApi';

// @ts-expect-errors
import defaultCanteen from '../../public/defaultCanteen.jpg';

/**
 * @import {Canteen} from '../types/canteen'
 * @import {Location} from '../types/location'
 */

const CarouselComponent = () => {
    const [canteens, setCanteens] = useState(/** @type{Canteen[]} */ ([]));
    const [canteenImg, setCanteenImg] = useState({});
    const { location } = useLocation();

    /**
     *
     * @param {Location} location
     */
    const getCanteens = async (location) => {
        try {
            const canteens = await getNearestCanteens(
                location.latitude,
                location.longtitude
            );
            setCanteens(canteens);

            const images = {};
            for (let canteen of canteens) {
                // const img = await fetchCanteenImg(canteen.id);
                const img = await getCanteenImgFromId(canteen.id);

                images[canteen.id] = img
                    ? URL.createObjectURL(img)
                    : defaultCanteen;
            }
            console.log('Canteen Images fetched: ', images);
            setCanteenImg(images);
        } catch (error) {
            console.log('Error fetching canteens or images:', error);
        }
    };

    useEffect(() => {
        if (location) {
            getCanteens(location);
        }
    }, []);

    if (canteens == null) {
        return <div className="h-full w-full">Loading...</div>;
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 2400, min: 1800 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1200 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1200, min: 600 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1,
        },
    };

    return (
        <Carousel
            className="z-0"
            responsive={responsive}
            renderDotsOutside={true}
            itemClass="carousel-item-spacing"
            partialVisible={false}
            partialVisbile={false}
        >
            {canteens.map((canteen) => (
                // <CanteenCard key={it.id} canteenName={it.name} img={it.img}/>
                <CanteenCard
                    key={canteen.id}
                    canteenName={canteen.name}
                    img={canteenImg[canteen.id]}
                />
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
