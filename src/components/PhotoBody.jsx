import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PhotoBody = () => {
    const { user } = useUser();
    const [ banner , setBanner ] = useState(null);
    const [ profile, setProfile ] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const getProfileImg = async (customer_id) => {
        try{
            const response = await axiosPrivate.get(`/customers/${customer_id}/get_profile_img`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            setProfile(url);
        } catch (error) {
            console.error("Error fetching profile image: ", error);
        }        
    }

    const getBannerImg = async (customer_id) => {
        try{
            const response = await axiosPrivate.get(`/customers/${customer_id}/get_banner_img`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            setBanner(url);
        } catch (error) {
            console.error("Error fetching profile image: ", error);
        }   
    }

    useEffect(() => {   
        getProfileImg(user.customer_id);
        getBannerImg(user.customer_id);
    }, []);


    return(
        <div className="ml-5">
            <h1 className="big-title my-5">Photos(2)</h1>
            <div className="grid-container">
                <img className="h-60 bg-slate-600 rounded-xl shadow-2xl" src={profile} alt="" />
                <img className="h-60 bg-slate-600 rounded-xl shadow-2xl" src={banner} alt="" />
                
            </div>
        </div>
    ); 
}

export default PhotoBody;