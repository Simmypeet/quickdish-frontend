import React, { useEffect, useState } from "react";
import useUser from '../hooks/useUser';

const ProfileForm = () => { 
    const { user, setUser } = useUser();
    const [ name, setName ] = useState(user.firstname);
    const [ username, setUsername ] = useState(user.username);
    const [ validUsername, setValidUsername ] = useState(false);
    const [ usernameFocus, setUsernameFocus ] = useState(false);

    const [ email, setEmail ] = useState(user.email);
    const [ validEmail, setValidEmail ] = useState(false);
    const [ emailFocus, setEmailFocus ] = useState(false);

    const [ password, setPassword ] = useState('');
    const [ validPassword, setValidPassword ] = useState(false);
    const [ passwordFocus, setPasswordFocus ] = useState(false);

    const [ success, setSuccess ] = useState(false);

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_].{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
    }, [password])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])


    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const response = await useAxiosPrivate.post('/customers/customer/update', //change
            JSON.stringify(
                { username: username,
                  password: password,
                  email: email
            }), 
            {
                headers: {'Content-Type': 'application/json'},
            }       
        )
        setSuccess(true);
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="displayName" className="block mb-2 profile-heading-font ">Name</label>
                    
                    <input 
                        type="text" 
                        id="displayName" 
                        className="profile-text-box" 
                        defaultValue={user.firstname} 
                        onChange={(event) => {setName(event.target.value)}}
                        required />
                </div> 
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 profile-heading-font">Username</label>
                    <p className={ usernameFocus && username && !validUsername ? "warning" : "offscreen"}>
                        Username must be 4-24 characters long
                    </p>
                    <input 
                        type="text" 
                        id="username" 
                        className="profile-text-box" 
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                        defaultValue={user.username} required />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 profile-heading-font">Email address</label>
                    <p className={ emailFocus && email && !validEmail ? "warning" : "offscreen"}>
                                        Email must be in the form of xxxx@gmail.com
                                    </p>
                    <input 
                        type="email" 
                        id="email" 
                        className="profile-text-box" 
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        defaultValue={user.email} required />
                </div> 

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="displayName" className="block mb-2 profile-heading-font">Password</label>
                        <p className={ passwordFocus && password && !validPassword ? "warning" : "offscreen"}>
                            8-24 characters,lowercase,uppercase, digit,special character
                        </p>
                        <input 
                            type="password" 
                            id="password" 
                            className="profile-text-box"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            defaultValue="John" required />
                    </div>
                    
                    <div className=""></div>
                    <button type="submit" className="general-button">Update Changes</button>

                </div>
                
            </form>
        
        </div>
    ); 
}

export default ProfileForm;