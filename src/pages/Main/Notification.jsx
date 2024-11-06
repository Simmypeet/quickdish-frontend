import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom'
// import useRefreshToken from '../../hooks/useRefreshToken';

const Notification = () => {
    const [users, setUsers] = useState();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation(); 
    const navigate = useNavigate(); 
    // const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); //for cancelling fetch request if component is unmounted
        const getUser = async() => {
            try{
               
                const response = await axiosPrivate.get('http://127.0.0.1:8000/customers/me'); 
                console.log("response: ", response.data);
                isMounted && setUsers(response.data);

            }catch(err) {
                console.log("Error fetching: ", err);
                navigate("/", {state: {from : location}, replace: true}); 
            }
        }
        getUser();

        //clean up fn
        return () => { //run when component is unmounted
            isMounted = false; 
            controller.abort(); 
        }
    }, [auth])

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
                    <p>Loading</p>
                )
            }
           {/* <button onClick={refresh}>
                Click me
           </button> */}
        </article>
    )
}

export default Notification;