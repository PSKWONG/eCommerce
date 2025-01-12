//-------------------------- Import Modules --------------------------
import React from "react";

//----------------------- Import components -----------------------
//Assets
import styles from './page.module.css';
import loginBtn from '../../assets/images/loginBtn.png';
import userIcon from '../../assets/images/userIcon.png';

// ------------------------------ User Component ------------------------------
const User = ({auth}) => {
  const iconType = auth ||'Login'; // Default condition

  let content;
  if (iconType === 'Login') {
    content = <img src={loginBtn} alt="Login" />;
  } else if (iconType === 'Logout') {
    content = <span>Logout </span>;
  } else if (iconType === 'Profile') {
    content = <img src={userIcon} alt="User Profile" />;
  };

  return (
    <>
      {content}
    </>
  );
};


export default User;
