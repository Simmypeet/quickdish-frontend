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
                    <FontAwesomeIcon className="text-2xl absolute top-0 left-0 bg-white rounded-full border-2 border-blue-950 p-3" icon={faCameraRetro} />
                    <img src="" className="w-32 h-32 rounded-full bg-slate-400 border-3 border-blue-950" alt=""/>
                </div>
                {/* person detail */}
                <ProfileForm/>
            </div>
        </div>
    ); 
}

export default ProfileBody;