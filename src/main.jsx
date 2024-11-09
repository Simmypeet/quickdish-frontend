import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider'
import { UserLocationProvider } from './context/LocationProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserLocationProvider>
        <App />
      </UserLocationProvider>
    </AuthProvider>
  </StrictMode>
)
