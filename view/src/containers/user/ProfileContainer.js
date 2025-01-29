// --------------- Import Modules ---------------

import Profile from "../../components/user/profile/profile";
import useProfileData from "./profileData";



const ProfileContainer = ()=>{

    const profileData = useProfileData();

    return (
        <Profile profileData= {profileData} />
    )

}; 

export default ProfileContainer;