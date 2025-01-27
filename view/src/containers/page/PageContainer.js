//-------------------------- Import Modules --------------------------
import { useSelector } from "react-redux";

// ----------------------- Import components -----------------------
import Page from "../../components/page/Page";
import { selectIsAuthenticated } from "../../features/authentication/authenticationSlice";
import useLogoData from './logoIconData';
import useAuthenticationIcon from "./authenticationIcon";

import usePageEffect from "./pageEffect";
import useNavigationData from "./navigation";
import useProfileIcon from "./profile";
import useCartIcon from "./cartIcon";



// ----------------------- Page Container -----------------------
const PageContainer = () => {

  //Login Status
  const authenStatus = useSelector(selectIsAuthenticated);
  //Logo Component Data 
  const logoData = useLogoData();
  //Navigation Data
  const navigation = useNavigationData();
  //Authentication Button Data
  const authenticationButton = useAuthenticationIcon(authenStatus);
  //Profile Icon Data
  const profileIcon = useProfileIcon(authenStatus);
  //Cart Icon Data
  const cartIcon = useCartIcon();



  //Check the Authentication Status for the Page
  usePageEffect();

  return (
    <>
      
          <Page
            logoinfo={logoData}
            authenticationButton={authenticationButton}
            navigation={navigation}
            profileIcon={profileIcon}
            cartIcon={cartIcon}
          />
        
    </>
  );
};

export default PageContainer;