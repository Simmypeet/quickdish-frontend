import { createContext, useState } from 'react'; 


const PermissionContext = createContext({}); 

export const PermissionProvider = ({ children }) => {
    const [ permission, setPermission ] = useState('unset');
    return (
       <PermissionContext.Provider value={{ permission, setPermission }}>
        { children }
       </PermissionContext.Provider>
    )
}

export default PermissionContext;