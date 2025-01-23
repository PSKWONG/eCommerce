// -------------------------- Import Modules --------------------------
import React from 'react';
import {Link} from 'react-router-dom';


// -------------------------- Import Components --------------------------




// -------------------------- MenuList Component --------------------------

const MenuList = ({ navigationItems }) => {
    return (
        <nav>
           { navigationItems.map((item, index) => {
                return (
                    <Link key={index} to={item.url} >{item.name}</Link>
                )
            })
        }
        </nav>
    );
}

export default MenuList;