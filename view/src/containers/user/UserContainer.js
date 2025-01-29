//---------------------- Import Modules ----------------------


//-------------------- Import Components --------------------
import UserWrapper from "../../components/user/User";
import useUserPageData from "./UserPageData";




const UserPageContainer = ()=>{

    const userPageData = useUserPageData();

    return(
        <>
            <UserWrapper {...userPageData} />
        </>
    )
}

export default UserPageContainer;