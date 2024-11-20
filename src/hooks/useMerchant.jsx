import { useContext } from 'react'; 
import MerchantContext from '../context/MerchantProvider';

const useMerchant = () => {
    const context = useContext(MerchantContext);
    if(!context){
        throw new Error('useMerchant must be used within a MerchantProvider');
    }
    return context; 
}; 

export default useMerchant; 
