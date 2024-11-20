import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider'
import { UserLocationProvider  } from './context/LocationProvider'
import { PermissionProvider  } from './context/PermissionProvider'
import { UserProvider } from './context/UserProvider.jsx'
import { MerchantProvider } from './context/MerchantProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserLocationProvider>
        <UserProvider>
          <MerchantProvider>
            <App />
          </MerchantProvider>
        </UserProvider>
      </UserLocationProvider>
    </AuthProvider>
  </StrictMode>
)
