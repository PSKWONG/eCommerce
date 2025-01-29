// ------------------- Import Modules -------------------
import React from 'react';

// ------------------- Profile Component ----------------
// Assets
import '../../assets/styles/App.css'
import styles from './user.module.css';
import { Outlet } from 'react-router-dom';
import MenuList from './menuList';


const UserWrapper = (props)=>{

    return (
        <div className="PageWrapper">
            <div className={` ${styles.userWrapper } floatContentWrapper twoColumnWrapper`}>

                {/* Menu */}
                <div className={`${styles.menuWrapper} ${styles.contentWrapper} leftColumn`}>
                  <MenuList menuData = {props.menuData}/>
                </div>

                {/* Main Content*/}
                <div className={`${styles.mainWrapper} ${styles.contentWrapper} rightColumn`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );

}

export default UserWrapper;