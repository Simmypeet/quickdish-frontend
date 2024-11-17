import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import useUser from '../hooks/useUser';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

//handle img input 
const ProfileHeader = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user, setUser } = useUser();
    const [ banner , setBanner ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    //set user global profile image 
    const handleFileInputChange = async (e, isProfile) => {
        const file = e.target.files[0]; 
        console.log("File: ", file);
        if(file){
            const tempUrl = URL.createObjectURL(file);
            if(isProfile){
                setProfile(tempUrl);
                await updateProfileImg(file);
            }else{
                setBanner(tempUrl); 
                await updateBannerImg(file);
            }
        }
    }

    const updateProfileImg = async (file) => {
        try{
            const formData = new FormData();
            formData.append("image", file); 
            await axiosPrivate.post('/customers/upload_profile', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            getProfileImg();
        }catch(error){
            console.error("Error updating profile image: ", error);
        }
    }

    const updateBannerImg = async (file) => {
        try{
            const formData = new FormData();
            formData.append("image", file);
            await axiosPrivate.post('/customers/upload_banner', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            getBannerImg();
        }catch(error){
            console.error("Error updating profile image: ", error);
        }
    }

    const getProfileImg = async () => {
        try{
            const response = await axiosPrivate.get(`/customers/${user.customer_id}/get_profile_img`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            if(profile){
                URL.revokeObjectURL(profile);
                updateProfileImg(profile);
            }
            setProfile(url);
        } catch (error) {
            console.error("Error fetching profile image: ", error);
        }        
    }

    const getBannerImg = async () => {
        try{
            const response = await axiosPrivate.get(`/customers/${user.customer_id}/get_banner_img`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            if(banner){
                URL.revokeObjectURL(profile);
            }
            setBanner(url);
        } catch (error) {
            console.error("Error fetching profile image: ", error);
        }   
    }

    useEffect(() => {
        getProfileImg();
        getBannerImg();
    }, [user.customer_id]);

    return (
        <div className='fixed top-5 left-1 md:left-16 sm:left-1 w-screen h-64 px-24 z-20'>
            <div className="relative w-full h-72 rounded-3xl overflow-hidden">
                <img className="absolute top-0 w-full h-full object-cover" src={banner} alt="" />  
                <div className="absolute flex flex-col md:flex-row sm:flex-col justify-between top-0 w-full h-full rounded-3xl bg-gradient-to-b from-transparent to-black opacity-80 z-0">
                    <div className="flex items-center space-x-8 ml-5">
                        <div className="items-start relative">
                            <img 
                                className="md:w-40 md:h-40 w-32 h-32 rounded-full bg-slate-700 border-solid border-4 border-white z-20" 
                                src={profile} alt="" />
                            <button
                                type="button"
                                onClick={() => document.getElementById("hidden-file-input-profile").click()} >
                                <FontAwesomeIcon className="text-2xl absolute top-0 left-0 bg-white rounded-full border-2 border-blue-950 p-3" icon={faCameraRetro} />
                            </button>
                            <input 
                                id="hidden-file-input-profile" 
                                type="file" 
                                onChange={(e) => handleFileInputChange(e, true)} 
                                style={{display: 'none'}}/>

                        </div>
                        <h1 className='text-3xl font-bold text-white'>{user.username}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-end sm:items-start sm:mb-2 mr-4">
                        <div className="mb-5 ml-20">
                            <button 
                                className="p-3 px-4 bg-red-600 hover:bg-red-700 hover:text-black rounded-xl flex" 
                                type="button"
                                onClick={() => document.getElementById("hidden-file-input").click()} >
                                <FontAwesomeIcon className="text-white  mt-1 mr-2" icon={faPenToSquare} />
                                <h1 className='text-white text-bold '>Edit profile</h1>
                            </button>
                            <input 
                                id="hidden-file-input" 
                                type="file" 
                                onChange={(e) => handleFileInputChange(e, false)} 
                                style={{display: 'none'}}/>

                        </div>
                        <div className="flex space-x-3">
                            <div className="flex flex-col text-white items-center">
                            <h1>0</h1>
                            <h1>Reviews</h1>
                            </div>
                            <div className="flex flex-col text-white border-x-2 px-3 items-center">
                            <h1>0</h1>
                            <h1>Photos</h1>
                            </div>
                            <div className="flex flex-col text-white justify-items-center items-center">
                            <h1>0</h1>
                            <h1>Followers</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    ); 
}

export default ProfileHeader;