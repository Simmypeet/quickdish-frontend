
import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate, useLocation } from "react-router-dom"; 
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Login = ({toggle}) => {
    const { auth, setAuth } = useAuth(); 
    // const { setAuth } = useContext(AuthContext); 

    const navigate = useNavigate();
    const location = useLocation(); 
    const from = location.state?.from?.pathname || "/"; //get path where user is coming from

    console.log(location.state);

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log("submit form"); 
        try{
            const response = await axios.post('/customers/login', 
                JSON.stringify({ username: username, password: password }), 
                //header
                {
                    headers: {'Content-Type': 'application/json'}, 
                    withCredentials: true
                }
            )
            console.log(response.data);

            //edit backend to return accessToken and role
            const accessToken = response?.data?.jwt_token; 
            const role = response?.data?.role;
            setAuth({ username: username, password: password, role: role, accessToken: accessToken });

            console.log("username after login: ", auth.username)

            navigate(from, {replace: true}); 
            // navigate("/dashboard/purchase_history"); 

        //edit backend to return various error message
        }catch(err){
            if(!err?.response){
                setErrMsg('No Server Response'); 
            } else if(err.response?.status == 400){
                setErrMsg('Missing username or password');
            } else if(err.response?.status == 401){
                setErrMsg('Unauthorized'); 
            } else {
                setErrMsg('Login Failed');
            }
            console.log(errMsg);
        }
    }
    return (
        <div className="absolute w-1/2 h-full left-1/2 z-30">
            <div className="font-[sans-serif]">

                <div className="h-full flex flex-col items-center justify-center py-10 pl-0 pr-2 rounded-md">
                    <div className="max-w-md w-full">
                    <div className="rounded-2xl ">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                                <div className="relative flex items-center">
                                <input 
                                    name="username" 
                                    type="text" 
                                    required 
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter user name" 
                                    />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                <input 
                                    name="password" 
                                    type="password" 
                                    required 
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                <input 
                                    id="remember-me" 
                                    name="remember-me" 
                                    type="checkbox" 
                                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                    Remember me
                                </label>
                                </div>
                                <div className="text-sm">
                                <a href="jajvascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                                    Forgot your password?
                                </a>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign in
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="#" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold" onClick={toggle}>Register here</a></p>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Login;