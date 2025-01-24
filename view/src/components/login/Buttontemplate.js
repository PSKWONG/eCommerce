//------------------------- Import Modules ------------------------------
import React from 'react';
import { Link } from 'react-router-dom';


// ------------------------- Import Components ------------------------------
import styles from './login.module.css';


//------------------------- Provider Login ------------------------------

const ButtonTemplate = (props) => {


    //-------------------------- Provider Login Data ------------------------------
    const isEmpty = props == {} ? true : false;

    if (!isEmpty) {
        var isExternal = props?.isExternal || false;
        var { url, alt, description, image } = props
    }


    //--------------------------Conditional Rendering ------------------------------
    let content;

    switch (true) {
        case isEmpty:
            content = <div></div>
            break;

        case isExternal:
            content =
                <a href={url} alt={alt} className={styles.optionButton}>
                    <img src={image} />
                    <span>{description}</span>
                </a>
            break;

        case !isExternal:
            content =
                <Link to={url} alt={alt} className={styles.optionButton}>
                    <img src={image} />
                    <span>{description}</span>
                </Link>
            break;

        default:
            content = <></>

    }

    return (
        <>
            {content}
        </>
    );
};

export default ButtonTemplate;