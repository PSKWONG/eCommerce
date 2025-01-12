//--------------------- Import Modules ---------------------
//Core Modules
import React from 'react';

// ------------------- Import Components -------------------
import Logo from './Logo.js';
import User from './User.js';
import Cart from './Cart.js';

//Assets
import styles from './page.module.css';

// ------------------- Page Component -------------------

const Page = () => {
  return (
    <>
        <header>
            <span></span>
            <Logo />
            <span></span>
            <User />
            <Cart />
        </header>
    </>
  );
};

export default Page;