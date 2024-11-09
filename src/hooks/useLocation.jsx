import { useContext } from 'react'; 
import LocationContext from '../context/LocationProvider';

const useLocation = () => {
    return useContext(LocationContext);
}; 

export default useLocation;