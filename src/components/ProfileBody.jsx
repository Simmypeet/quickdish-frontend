import ProfileForm from "./ProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

const ProfileBody = () => {
    return (
        <div className="ml-5 ">
            <h1 className="big-title my-5">Profile Overview</h1>
            <div className="flex">
                {/* header */}
                <div className="relative w-2/12 h-6/12 ml-16">
                    <img src="/profile.jpg" className="w-28 h-28 rounded-full bg-slate-400 border-3 border-blue-950" alt=""/>
                </div>
                {/* person detail */}
                <ProfileForm/>
            </div>
        </div>
    ); 
}

export default ProfileBody;