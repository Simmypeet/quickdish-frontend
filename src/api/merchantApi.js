
import axios from 'axios';

export const getMerchant = async (axiosPrivate) => {
    const response = await axiosPrivate.get(
        `/merchants/me`
    );
    return response.data; 
}

export const getMerchant2 = async (auth) => {
    
    const response = await axios.get(
        'http://127.0.0.1:8000/merchants/me',
        {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
                'Content-Type': 'application/json',
            },
        }
        
    );
    return response.data; 
}