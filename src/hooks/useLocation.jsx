// @ts-check

import { useContext } from 'react';
import LocationContext from '../context/LocationProvider';

/**
 * @import {LocationContextType} from '../context/LocationProvider'
 */

/**
 * @returns {LocationContextType}
 */
const useLocation = () => {
    const location = useContext(LocationContext);

    if (!location) {
        throw new Error('useLocation must be used within a LocationProvider');
    }

    return location;
};

export default useLocation;
