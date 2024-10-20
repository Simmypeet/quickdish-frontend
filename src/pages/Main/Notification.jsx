import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useRefreshToken from '../../hooks/useRefreshToken';

const Notification = () => {
    const [users, setUsers] = useState(); 
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); //for cancelling fetch request if component is unmounted
        const getUser = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/customers/me', {
                    withCredentials: true, 
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`, 
                        'accept': 'application/json',
                    }
                });
                console.log("response: ", response.data);
                isMounted && setUsers(response.data);

            }catch(err) {
                console.log("Error fetching: ", err);
            }
            
        }
        getUser();

        //clean up fn
        return () => { //run when component is unmounted
            isMounted = false; 
            controller.abort(); 
        }
    }, [axiosPrivate])

    return (
        <article>
            <h2>Users info</h2>


            {
                users ? 
                (
                    <ul>
                        <li>{users?.username}</li>
                        <li>{users?.email}</li>
                        <li>{users?.id}</li>
                    </ul>
                ) : 
                (
                    <p>No users</p>
                )
            }
           <button onClick={refresh}>
                Click me
           </button>
        </article>
    )
}

export default Notification;