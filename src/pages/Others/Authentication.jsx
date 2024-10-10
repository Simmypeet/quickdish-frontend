import Signup from '../../components/Authentication/Login';
import Login from '../../components/Authentication/Signup';
import { useState } from 'react';

const Authentication = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const toggle = () => {
        setIsSignIn(!isSignIn);
    }

    return (
        <div className='flex justify-center object-cover'>
            <img className="w-screen fixed top-0 blur-sm z-0" src="./loginBg.jpg"></img>
            {/* <div className="w-2/4 h-4/6 flex absolute top-32 rounded-2xl  z-10"> */}
            <div className="w-[900px] h-[600px] flex absolute top-36 rounded-2xl  z-10">
                <div className="w-full h-full shadow-lg">
                    <div className="absolute w-full h-full opacity-80 bg-white rounded-md z-20">
                        
                    </div>
                    {/* <div className="absolute w-1/2 h-full left-1/2">
                    </div> */}

                    {
                        isSignIn ? <Signup toggle={toggle}/> : <Login toggle={toggle}/>
                    }

                    {/* <Signup /> */}
                    {/* <Login/> */}
                    <img className="absolute w-1/2 h-full p-3 z-30" src="./Authen.png" alt="" />
                </div>  
            </div>
        </div>
    )   
}

export default Authentication; 