// ----------------------- Import Modules -----------------------
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../../features/api/API";
import { useDispatch } from "react-redux";

//---------------------------- Import Components ----------------------------
import { logout } from "../../features/authentication/authenticationSlice";

//----------------------------- Page Handlers -----------------------------

const usePageHandlers = () => {

    // Custom Actions 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Component Handlers
    const handleLogin = () => { navigate("/login"); };
    const handleProfile = () => { navigate("/user/profile"); };
    const handleHome = () => { navigate("/"); };
    const handleLogout = async () => {
            await dispatch(logout(navigate));
    };

    return{
        handleLogin, handleProfile, handleHome , handleLogout
    }
};

export default usePageHandlers;