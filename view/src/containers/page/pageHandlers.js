// ----------------------- Import Modules -----------------------
import { useNavigate } from "react-router-dom";

//----------------------------- Page Handlers -----------------------------

const usePageHandlers = () => {
    const navigate = useNavigate();

    const handleLogin = () => { navigate("/login"); };
    const handleProfile = () => { navigate("/user/profile"); };
    const handleHome = () => { navigate("/"); };

    return{
        handleLogin, handleProfile, handleHome
    }
};

export default usePageHandlers;