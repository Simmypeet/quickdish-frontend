import { createContext, useState } from 'react'; 

export const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState({ 
        firstname: '', 
        lastname: '',
        username:'', 
        email: '',
        customer_id: 0});
    return (
       <UserContext.Provider value={{ user, setUser }}>
        { children }
       </UserContext.Provider>
    ); 
}

export default UserContext;