import { createContext, useState } from 'react'; 

const LocationContext = createContext({});


export const UserLocationProvider = ({ children }) => {
    const [ userLocation , setUserLocation ] = useState({ location: '', latitude: 0, longtitude: 0});
    return (
        <LocationContext.Provider value={{ userLocation , setUserLocation }}>
            { children }
        </LocationContext.Provider>
    )
}

export default LocationContext;