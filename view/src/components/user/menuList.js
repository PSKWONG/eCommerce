//--------------- Import Modules -------------
import React from "react";
import { Link } from "react-router-dom";


const MenuList = (props) => {

    const { menuData } = props;

    return (
        <>
            {
                menuData.map((item, index) => {
                    return <Link key={index} to={item.link}>{item.title}</Link>
                })
            }
        </>
    )
};

export default MenuList;