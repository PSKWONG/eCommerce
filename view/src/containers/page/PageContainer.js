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

//------------------------Import Striple Promise --------------------------
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useStripleData from "../payment/stripleData";
//Get the Public Key from the environment
const environment = process.env.REACT_APP_ENV || 'development';
const striplePKey = environment === 'development' ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST : process.env.REACT_APP_STRIPE_PUBLIC_KEY;
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(striplePKey);


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

  //Striple Data
  const stripleData = useStripleData();
  const { clientSecret, appearance, loader } = stripleData.options;

  //Check the Authentication Status for the Page
  usePageEffect();

  return (
    <>
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <Page
            logoinfo={logoData}
            authenticationButton={authenticationButton}
            navigation={navigation}
            profileIcon={profileIcon}
            cartIcon={cartIcon}
          />
        </Elements>
      )}
    </>
  );
};

export default PageContainer;