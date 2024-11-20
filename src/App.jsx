import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import DashBoard from './pages/Main/Dashboard';
import RateAndReview from './pages/Others/RateAndReview';
import Menu from './pages/Restaurant/Restaurant';
import Authentication from './pages/Others/Authentication';
import AuthContext from './context/AuthProvider';
import Unauthorized from './pages/Others/Unauthorize';
import RequireAuth from './components/RequireAuth';

import MerchantDashboard from './pages/Merchant/MdashBoard'
import NewMenu from './pages/Merchant/NewMenu';
import Canteen from './pages/Canteen/Canteen';


const App = () => {
  const auth = useContext(AuthContext); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication/>}></Route>
        <Route path="/dashboard/*" element={auth ? <DashBoard/> : <Navigate to="/"/>}></Route>
        <Route path="/user_review" element={auth ? <RateAndReview/> : <Navigate to="/"/>}></Route>
        {/* <Menu restaurantID={8}></Menu> */}
        <Route path="/unauthorized" element={<Unauthorized/>}></Route>

        <Route element={<RequireAuth allowedRoles={'user'} />}></Route>
        {/* <Route path="/restaurants/:restaurantID" element={<Menu/>}></Route> */}
        <Route path="/merchant/*" element={auth ? <MerchantDashboard/> : <Navigate to="/"/>}></Route>
        <Route path="/test" element={ <NewMenu/>}></Route>


        <Route element={<RequireAuth allowedRoles={'user'} />}>
          <Route path="/restaurants/:restaurantID" element={<Menu/>}></Route>
          <Route path="/canteens/:canteenID" element={<Canteen/>}></Route>
        </Route>

      </Routes>
    </Router>
    // <img className="w-96" src="https://drive.google.com/drive-viewer/AKGpihanXGmn5_n0b5VJMoHbTYIS5HGYHJ-OYGhUXsGefYBZ1CwaIrtpB1M11_JDFnI8cXR3Mfcx6jtfU-girxGtiYdPW4czIxskBA=s1600-rw-v1"></img>
  )
}

export default App;
