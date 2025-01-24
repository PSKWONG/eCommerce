//--------------------- Import Modules ---------------------
//Core Modules
import React from 'react';


// ------------------- Import Components -------------------
//Assets
import pauseIcon from '../../assets/images/pause.png'; 





//------------------- AuthenticationButton Component -------------------
const AuthenticationButton = (props) => {

    console.log(props);

    //Default Values for AuthenticationButton Component
    const defaultValue = {
        iconImage: pauseIcon ,
        alt: "System is under maintainance",
        action: () => console.log("System is undermaintainance"),
        style: ""
    }

    //Retrieve the values
    const authIcon = props?.authenticationButton || defaultValue;

    //Destructuring Authenricationn Button Props
    const { iconImage, alt, action, style } = authIcon;

    return (
        <>
            <img src={iconImage} alt={alt} onClick={action} className={style} />
        </>
    )

};

export default AuthenticationButton;