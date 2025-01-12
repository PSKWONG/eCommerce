// ------------------------------ Import Modules ------------------------------
import React from "react";

//----------------------- Import components -----------------------
//Assets
import logo from '../../assets/images/companyLogo.png'
import styles from './page.module.css';


// ------------------------------ Logo Component ------------------------------
const Logo = () => {
  return (
    <div className={styles.logo}>
        <img src={logo} alt="Company Logo" />
        <span>Planteo</span>
    </div>
  );
};

export default Logo;