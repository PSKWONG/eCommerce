// -------------------------- Import Modules --------------------------
import React from 'react';
import {Link} from 'react-router-dom';


// -------------------------- Import Components --------------------------




// -------------------------- MenuList Component --------------------------

const MenuList = (props) => {

    //Set the default value for navigation 
    const defaultValue = []; 

    //Get the value from the props
    const navigationItems = props.navigationItems || defaultValue;

    //Conditional Rendering for Menu List
    let content;
    const numberOfNavigationItems = navigationItems.length

    switch (true){
        case numberOfNavigationItems === 0:
            content = <></>
            break;
        default:
            content = navigationItems.map((item, index) => {
                return (
                    <Link key={index} to={item.url} >{item.name}</Link>
                )
            })
        
    }

    return (
        <nav>
           {content}
        </nav>
    );
}

export default MenuList;