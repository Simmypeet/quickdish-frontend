import { createContext, useState } from 'react'; 

export const MerchantContext = createContext(); 

export const MerchantProvider = ({ children }) => {
    const [ merchant, setMerchant ] = useState({ 
        firstname: '',
        lastname: '',
        username:'', 
        email: '',
        profile: '',
        restaurant_id: 0, 
        merchant_id: 0});
    return (
       <MerchantContext.Provider value={{ merchant, setMerchant }}>
        { children }
       </MerchantContext.Provider>
    ); 
}

export default MerchantContext;