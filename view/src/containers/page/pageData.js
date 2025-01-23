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
    const { handleHome, handleLogin, handleProfile, handleLogout, handleCart} = actions;
    return {
        
        logoIcon: {
            //iconImage: logoIcon,
            //alt: "Logo",
            action: handleHome
        },
        authenticationButton:{
            iconImage: authenStatus ? logoutIcon : loginBtn,
            alt: authenStatus ? "Logout" : "Login",
            action: authenStatus ? handleLogout : handleLogin,
        },
        profileIcon: {
            iconImage: userIcon,
            alt: "Profile",
            style: authenStatus ? styles.show : styles.hide,
            action: handleProfile
        },
        navigation: {
            navigationItems: [
                { name: "Products", url: "/product/list/2" },
                { name: "Accessories", url: "/" },
            ]
        },
        cartIcon:{
            actions: handleCart
        }
    }
};


export default usePageData;