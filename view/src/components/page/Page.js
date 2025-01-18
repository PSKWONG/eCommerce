//--------------------- Import Modules ---------------------
//Core Modules
import React from 'react';
import { Outlet } from 'react-router-dom';

// ------------------- Import Components -------------------
import Logo from './Logo.js';
import Cart from './Cart.js';

//Assets
import styles from './page.module.css';

// ------------------- Page Component -------------------

const Page = (props) => {
  let { userIcon, logoIcon, logoutIcon } = props;

  return (
    <>
      <header>
        <span></span>
        <Logo logoinfo = {logoIcon}/>
        <span></span>
        <img src={logoutIcon.iconImage} alt={logoutIcon.alt} onClick={logoutIcon.action} className={logoutIcon.style}  />
        <img src={userIcon.iconImage} alt={userIcon.alt} onClick={userIcon.action} />
        <Cart />
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>

    </>
  );
};

export default Page;