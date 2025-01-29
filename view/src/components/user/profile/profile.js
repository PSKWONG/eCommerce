//---------------------- Import modules ----------------------
import React from "react";


const Profile = (props)=>{

    const {username, email} = props.profileData.profileData; 
    console.log('Profile data:', props.profileData);
    console.log('Username:', username);
    console.log('Email:', email);

    return(
        <div>
            <h1>Profile</h1>
            <div>Username: {username}</div>
            <div>Email: {email}</div>
        </div>
    );
}; 

export default Profile;