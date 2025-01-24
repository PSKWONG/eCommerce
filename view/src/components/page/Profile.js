//--------------------- Import Modules ---------------------
//Core Modules
import React from 'react';


// ------------------- Import Components -------------------
//Assets
import defaultValue from './pauseIcon';


//------------------- AuthenticationButton Component -------------------
const ProfileIcon = (props) => {

    //Retrieve the values
    const profileIcon = props?.profileIcon || defaultValue;

    //Destructuring Authenricationn Button Props
    const { iconImage, alt, action, style } = profileIcon;

    return (
        <>
            <img src={iconImage} alt={alt} onClick={action} className={style} />
        </>
    )

};

export default ProfileIcon;