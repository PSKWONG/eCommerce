//--------------------- Import Modules ---------------------
//Core Modules
import React from 'react';
import { Outlet } from 'react-router-dom';


// ------------------- Import Components -------------------
import Logo from './Logo.js';
import Cart from './Cart.js';
import MenuList from './MenuList.js';
import AuthenticationButton from './authenticationButton.js';
import ProfileIcon from './profile.js';

//Assets
import styles from './page.module.css';

// ------------------- Page Component -------------------

const Page = (props) => {

  //Destructuring Props
  let { userIcon, logoIcon, navigation, cartIcon } = props;




  return (
    <>
      <header>
        <span></span>
        <Logo logoinfo = {logoIcon}/>
        <MenuList  {...navigation} />
        <ProfileIcon {...props} />
        <AuthenticationButton  {...props} />
        <Cart  {...cartIcon} />
      </header>
      <div className={styles.content}>
        <Outlet/>
      </div>

    </>
  );
};

export default Page;