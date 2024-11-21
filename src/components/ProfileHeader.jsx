import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import useUser from '../hooks/useUser';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

//handle img input
const ProfileHeader = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user, setUser } = useUser();
    const [banner, setBanner] = useState(null);
    const [profile, setProfile] = useState(null);

    //set user global profile image
    const handleFileInputChange = async (e, isProfile) => {
        const file = e.target.files[0];
        console.log('File: ', file);
        if (file) {
            const tempUrl = URL.createObjectURL(file);
            if (isProfile) {
                setProfile(tempUrl);
                await updateProfileImg(file);
            } else {
                setBanner(tempUrl);
                await updateBannerImg(file);
            }
        }
    };

    const updateProfileImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            await axiosPrivate.post('/customers/upload_profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            getProfileImg();
        } catch (error) {
            console.error('Error updating profile image: ', error);
        }
    };

    const updateBannerImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            await axiosPrivate.post('/customers/upload_banner', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            getBannerImg();
        } catch (error) {
            console.error('Error updating profile image: ', error);
        }
    };

    const getProfileImg = async () => {
        try {
            const response = await axiosPrivate.get(
                `/customers/${user.customer_id}/get_profile_img`,
                {
                    responseType: 'blob',
                }
            );
            const url = URL.createObjectURL(response.data);
            if (profile) {
                URL.revokeObjectURL(profile);
                updateProfileImg(profile);
            }
            setProfile(url);
            setUser({
                ...user,
                profile: url,
            });
        } catch (error) {
            console.error('Error fetching profile image: ', error);
        }
    };

    const getBannerImg = async () => {
        try {
            const response = await axiosPrivate.get(
                `/customers/${user.customer_id}/get_banner_img`,
                {
                    responseType: 'blob',
                }
            );
            const url = URL.createObjectURL(response.data);
            if (banner) {
                URL.revokeObjectURL(profile);
            }
            setBanner(url);
        } catch (error) {
            console.error('Error fetching profile image: ', error);
        }
    };

    useEffect(() => {
        getProfileImg();
        getBannerImg();
    }, [user.customer_id]);

    return (
        <div className="fixed left-1 top-5 z-20 h-64 w-screen px-24 sm:left-1 md:left-16">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                <img
                    className="absolute top-0 h-full w-full object-cover"
                    src={banner}
                    alt=""
                />
                <div className="absolute top-0 z-0 flex h-full w-full flex-col justify-between rounded-3xl bg-gradient-to-b from-transparent to-black opacity-80 sm:flex-col md:flex-row">
                    <div className="ml-5 flex items-center space-x-8">
                        <div className="relative items-start">
                            <img
                                className="z-20 h-32 w-32 rounded-full border-4 border-solid border-white bg-slate-700 md:h-40 md:w-40"
                                src={profile}
                                alt=""
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            'hidden-file-input-profile'
                                        )
                                        .click()
                                }
                            >
                                <FontAwesomeIcon
                                    className="absolute left-0 top-0 rounded-full border-2 border-blue-950 bg-white p-3 text-2xl"
                                    icon={faCameraRetro}
                                />
                            </button>
                            <input
                                id="hidden-file-input-profile"
                                type="file"
                                onChange={(e) => handleFileInputChange(e, true)}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-white">
                            {user.username}
                        </h1>
                    </div>
                    <div className="mr-4 flex flex-col items-end justify-center sm:mb-2 sm:items-start">
                        <div className="mb-5 ml-20">
                            <button
                                className="flex rounded-xl bg-red-600 p-3 px-4 hover:bg-red-700 hover:text-black"
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById('hidden-file-input')
                                        .click()
                                }
                            >
                                <FontAwesomeIcon
                                    className="mr-2  mt-1 text-white"
                                    icon={faPenToSquare}
                                />
                                <h1 className="text-bold text-white ">
                                    Edit profile
                                </h1>
                            </button>
                            <input
                                id="hidden-file-input"
                                type="file"
                                onChange={(e) =>
                                    handleFileInputChange(e, false)
                                }
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="flex space-x-3">
                            <div className="flex flex-col items-center text-white">
                                <h1>0</h1>
                                <h1>Reviews</h1>
                            </div>
                            <div className="flex flex-col items-center border-x-2 px-3 text-white">
                                <h1>2</h1>
                                <h1>Photos</h1>
                            </div>
                            <div className="flex flex-col items-center justify-items-center text-white">
                                <h1>0</h1>
                                <h1>Followers</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
