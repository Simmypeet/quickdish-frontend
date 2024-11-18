import SideBar from "../../components/Merchant/Sidebar";
import Header from "../../components/Merchant/Header";
import Home from "../../components/Merchant/Home";

//sidebar, header, link to other pages
const MerchantDashboard = () => {
    return (
        <div className="flex">
            <div className="
                    fixed top-0 left-0 h-svh max-h-svh block md:block sm:block
                    z-10
                ">
                <SideBar/>
            </div>
            <div className="flex-grow flex-1 flex flex-col relative">
                <div className="fixed top-0 lg:left-60 left-0 right-0 z-10">
                    <Header/>
                </div>
                <div className="absolute top-32 left-72 right-10">
                    <Home/>
                </div>
            </div>
        </div>
    )
}; 

export default MerchantDashboard;

