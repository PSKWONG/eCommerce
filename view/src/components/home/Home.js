// ---------------------- Import Components --------------------------
import React from 'react';


// ---------------------- Import Components --------------------------
import Banner from './Banner.js';
//Assets
import styles from './home.module.css';



// ---------------------- Home --------------------------
const Home = () => {
  return (
    <div className={styles.home}>
        <Banner />
    </div>
  );
};
export default Home;