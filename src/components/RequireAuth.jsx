import { useLocation, Navigate, Outlet } from 'react-router-dom'; 
import useAuth from '../hooks/useAuth'; 

const RequireAuth = () => {
    const auth = useAuth(); 
    const location = useLocation(); 

    console.log("auth in requireAuth: ", auth);
    console.log("is username : ", auth.auth?.username); 
    console.log("pass: ", auth && auth.username);
    return (
        auth && auth.auth.username
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace/> //replace the current location in the history stack and able to return to the previous location
    ); 
}

export default RequireAuth;