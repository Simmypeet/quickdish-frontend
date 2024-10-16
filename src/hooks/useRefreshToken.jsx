import axios from '../api/axios';
import useAuth from './useAuth';

//send refresh token to server to get new access token
//return new access token

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth(); 
    //create api for refreshing token
    const refresh = async () => {
        try{ 
            const response = await axios.get('/customers/refresh', 
                {
                    withCredentials: true
                }
            ); 

            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${auth.accessToken}`
            // },

            console.log("response: ", response.data);

            setAuth(prev => {
                console.log("prev: ", prev);
                console.log("response: ", response.data.jwt_token);
                return {...prev, accessToken: response.data.jwt_token} //update accessToken
            })

            return response.data; 
        }catch(err) {
            console.log("Error refreshing token: ", err);
        }
    }
    return refresh; 

}

export default useRefreshToken;

// const useRefreshToken = () => {
//     const { setAuth } = useAuth(); 
//     //create api for refreshing token
//     const refresh = async () => {
//         try{ 
//             const response = await axios.post('/customers/refresh',  
//                 {
//                     headers: {'Content-Type': 'application/json'}, 
//                     withCredentials: true
//                 }
//             ); 

//             console.log("response: ", response.data.jwt_token);

//             setAuth(prev => {
//                 console.log("prev: ", prev);
//                 console.log("response: ", response.data.jwt_token);
//                 return {...prev, accessToken: response.data.jwt_token} //update accessToken
//             })

//             return response.data.jwt_token; 
//         }catch(err) {
//             console.log("Error refreshing token: ", err);
//         }
//     }
//     return refresh; 

// }

// export default useRefreshToken;