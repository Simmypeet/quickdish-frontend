import { useLocation, Navigate, Outlet } from 'react-router-dom'; 
import useAuth from '../hooks/useAuth'; 

const RequireAuth = ({ allowedRoles } ) => {
    const auth = useAuth(); 
    const location = useLocation(); 

    console.log("role: ", auth.auth.role);
    // console.log("find role: ", auth?.auth.role?.find(role => allowedRoles.includes(role))); 
    //add roles to response 
    return (
        auth?.auth.role === allowedRoles

        // auth?.auth.role?.find(role => allowedRoles.includes(role))
            ? <Outlet/>
            : auth.auth?.username
            //add unauthorized page
                ? <Navigate to="/unauthorized" state={{ from: location }} replace/> //replace the current location in the history stack and able to return to the previous location
                    :<Navigate to="/" state={{ from: location }} replace/>
    ); 
}

export default RequireAuth;