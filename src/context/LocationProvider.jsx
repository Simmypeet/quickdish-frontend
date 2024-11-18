// @ts-check

import React, { createContext, useEffect, useState } from 'react';

/**
 * @import {Location} from '../types/location'
 */

/**
 * @typedef {Object} LocationContextType
 *
 * @property {Location | undefined} location
 * @property {React.Dispatch<React.SetStateAction<Location | undefined>>} setLocation
 */

const LocationContext = createContext(
    /** @type{LocationContextType | undefined} */ (undefined)
);

/**
 *
 * @param {{
 *  children: React.ReactNode
 * }} param0
 * @returns {React.ReactNode}
 */

export const UserLocationProvider = ({ children }) => {
    const [location, setLocation] = useState(
        /** @type{undefined | Location}*/ (undefined)
    );

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
                        );
                        const data = await response.json();
                        if (data && data.display_name) {
                            setLocation({
                                address: data.display_name,
                                latitude: lat,
                                longtitude: long,
                            });
                        } else {
                            console.error('Address not found');
                        }
                    } catch (error) {
                        console.error('Error fetching address: ', error);
                    }
                },
                (error) => console.error('Error getting location:', error)
            );
        } else {
            console.log('Geolocation is not supported by this browser');
        }
    });

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationContext;
