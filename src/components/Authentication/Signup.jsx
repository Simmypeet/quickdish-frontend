
import axios from "../../api/axios";
// import axios from 'axios'; 
import { useState } from "react";

const Signup = ({toggle}) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            console.log("username: ", username);
            console.log("firstname: ", firstname);
            console.log("lastname: ", lastname);
            console.log("password: ", password);
            console.log("email: ", email);

            const response = await axios.post('/customers/register', 
                JSON.stringify(
                    { username: username,
                      password: password, 
                      email: email, 
                      first_name: firstname, 
                      last_name: lastname 
                }), 
                {
                    headers: {'Content-Type': 'application/json'},
                }       
            )
            setSuccess(true);
            console.log(response.data);
            setFirstname('');
            setLastname('');
            setUsername('');
            setPassword('');
            setEmail('');
            
        }catch(err){
            if(!err?.response){
                setErrMsg('No Server Response'); 
            }else if(err.response?.status == 409){
                setErrMsg('User already exists');
            }else if(err.response?.status == 408){
                setErrMsg('Username already exists');
            }else if(err.response?.status == 407){
                setErrMsg('Email already used');
            }else{
                setErrMsg('Register Failed');
            }
            console.log(errMsg);
        }
    };

    return (
        <div className="absolute w-1/2 h-full left-1/2 z-30">
            <div className="font-[sans-serif]">

                <div className="h-full flex flex-col items-center justify-center py-10 pl-0 pr-2 rounded-md">
                    <div className="max-w-md w-full">
                        <div className="rounded-2xl ">
                            <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
                            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                                <div className="relative flex items-center">
                                <input 
                                    name="username" 
                                    value={username}
                                    type="text" required 
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter user name" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                </svg>
                                </div>
                            </div>

                            <div className="grid grid-flow-col col-span-2 space-x-2">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">First name</label>
                                    <div className="relative flex items-center">
                                    <input 
                                        name="firstname" 
                                        value={firstname}
                                        type="text" required 
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                        onChange={(e) => setFirstname(e.target.value)}
                                        placeholder="Firstname" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Last name</label>
                                    <div className="relative flex items-center">
                                    <input 
                                        name="lastname" 
                                        value={lastname}
                                        type="text" required 
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Lastname" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                    </div>
                                </div>
                            </div>
                            

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                <input 
                                    name="email" 
                                    value={email}
                                    type="text" required 
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email" />
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
                                    value={password}
                                    type="password" 
                                    required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Register
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-4 text-center">Already a member? <a href="#" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold" onClick={toggle} >Login here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;