import React, { useEffect, useState } from "react";
import useUser from '../hooks/useUser';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ProfileForm = () => { 
    const axiosPrivate = useAxiosPrivate();
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

    const [ newPassword, setNewPassword ] = useState('');
    const [ validNewPassword, setValidNewPassword ] = useState(false);
    const [ newPasswordFocus, setNewPasswordFocus ] = useState(false);

    const [ success, setSuccess ] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        const result = PASSWORD_REGEX.test(newPassword);
        setValidNewPassword(result);
    }, [newPassword])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])


    const handleSubmit = async (event) => {
        event.preventDefault(); 
        let detail = {
            username: username,
            email: email,
            new_password: newPassword,
            password: password
        };
        console.log(detail);
        try{
            const response = await axiosPrivate.post(
                '/customers/update', //change
                detail  
            )

            console.log(response.status);

            if(response.status === 200){
                console.log("success");
                setSuccess(true);
            }
        }catch(error){
            console.error('Error:', error.response.status);
            setSuccess(false);
        }finally{
            handleOpen();
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        'border-radius': 25,
        boxShadow: 24,
        p: 4
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
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

                <div className="grid gap-6 mb-6 md:grid-cols-2 md:w-96">
                    <div>
                        <label htmlFor="displayName" className="block mb-2 profile-heading-font">Password</label>
                            <p className={ passwordFocus && password && !validPassword ? "warning" : "offscreen"}>
                                8-24 characters,lower and uppercase, digit,special character
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

                    <div>
                        <label htmlFor="displayName" className="block mb-2 profile-heading-font">New Password</label>
                        <p className={ newPasswordFocus && newPassword && !validNewPassword ? "warning" : "offscreen"}>
                            8-24 characters,lowercase,uppercase, digit,special character
                        </p>
                        <input 
                            type="newPassword" 
                            id="newPassword" 
                            className="profile-text-box"
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setNewPasswordFocus(true)}
                            onBlur={() => setNewPasswordFocus(false)}
                            defaultValue="John" required />
                    </div>
                    
                    <div className=""></div>
                    <button type="submit" className="general-button" >Update Changes</button>

                </div>
                
            </form>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {
                        success ? "Success Updating" : "Failed Updating"
                  }
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {
                        success ? "Your profile has been updated" : "Mismatched password"
                  }
                </Typography>
              </Box>
            </Modal>
        
        </div>
    ); 
}

export default ProfileForm;


//case pw not match 