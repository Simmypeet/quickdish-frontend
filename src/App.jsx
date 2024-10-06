import './App.css'
import DashBoard from './pages/Main/Dashboard'
import RateAndReview from './pages/Others/RateAndReview'
import Menu from './pages/Restaurant/Restaurant'
import Authentication from './pages/Others/Authentication'

const App = () => {
  return (
    <>
      {/* <DashBoard></DashBoard> */}
      {/* <RateAndReview></RateAndReview> */}
      {/* <Menu restaurantID={8}></Menu> */}
      <Authentication/>
    </>
  )
}

export default App;
