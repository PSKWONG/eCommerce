// ------------------ Import Modules ------------------
import { useSelector } from "react-redux";



// ------------------ Import components ------------------
import { selectIsAuthenticated } from "../../features/authentication/authenticationSlice";
import styles from '../../components/page/page.module.css';

import loginBtn from '../../assets/images/loginBtn.png';
import userIcon from '../../assets/images/userIcon.png';
import logoutIcon from '../../assets/images/logoutIcon.png';






// ------------------ Page Data ------------------
const usePageData = (actions) => {
    // Compoent States  
    const authenStatus = useSelector(selectIsAuthenticated);

    console.log(authenStatus);
    //Component Actions
    const {handleHome, handleLogin, handleProfile, handleLogout} = actions;
    return {
        userIcon: {
            iconImage: authenStatus ? userIcon : loginBtn,
            alt: authenStatus ? "User Profile" : "Login",
            action: authenStatus ? handleProfile : handleLogin
        },
        logoIcon: {
            //iconImage: logoIcon,
            //alt: "Logo",
            action: handleHome
        },
        logoutIcon: {
            iconImage: logoutIcon,
            alt: "Logout",
            style: authenStatus ? styles.show : styles.hide,
            action: handleLogout
        }
    }
};


export default usePageData;