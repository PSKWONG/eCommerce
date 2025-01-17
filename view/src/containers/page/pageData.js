// ------------------ Import Modules ------------------
import { useDispatch, useSelector } from "react-redux";



// ------------------ Import components ------------------
import { checkAuth, selectIsAuthenticated } from "../../features/authentication/authenticationSlice";

import loginBtn from '../../assets/images/loginBtn.png';
import userIcon from '../../assets/images/userIcon.png';






// ------------------ Page Data ------------------
const usePageData = (actions) => {
    // Compoent States  
    const authenStatus = useSelector(selectIsAuthenticated);
    //Component Actions
    const {handleHome, handleLogin, handleProfile} = actions;
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
        }
    }
};


export default usePageData;