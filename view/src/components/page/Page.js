//--------------------- Import Modules ---------------------
//Core Modules
import React from 'react';

// ------------------- Import Components -------------------
import Logo from './Logo.js';
import Cart from './Cart.js';

//Assets
import styles from './page.module.css';

// ------------------- Page Component -------------------

const Page = (props) => {
  let userIcon = props.userIcon;
  return (
    <>
      <header>
        <span></span>
        <Logo />
        <span></span>
        <img src={userIcon.iconImage} alt={userIcon.alt} onClick={userIcon.action} />
        <Cart />
      </header>
    </>
  );
};

export default Page;