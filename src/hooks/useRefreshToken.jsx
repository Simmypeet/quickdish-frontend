import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom'

//send refresh token to server to get new access token
//return new access token

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth(); 
    const navigate = useNavigate(); 
    //create api for refreshing token
    const refresh = async () => {
        try{ 
            const response = await axios.get('/customers/refresh', 
                {
                    withCredentials: true, 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data?.jwt_token) {
                setAuth(prev => ({
                    ...prev,
                    accessToken: response.data.jwt_token // Update accessToken
                }));

                return response.data;
            } else {
                console.log("Refresh token response did not include jwt_token");
                //navigate('/'); // Redirect to login if jwt_token is missing
            }

            return response.data; 
        }catch(err) {
            console.log("Error refreshing token: ", err.status);
            //if refresh token expire
            // if(err.response && err.response.status === 405){
            //     navigate('/'); 
            // }
        }
    }
    return refresh; 

}

export default useRefreshToken;

