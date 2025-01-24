//------------------------- Import Modules ------------------------------
import React from 'react';


// ------------------------- Import Components ------------------------------
import styles from './login.module.css';


//------------------------- Provider Login ------------------------------

const ProviderLogin = (props) => {


    //-------------------------- Provider Login Data ------------------------------
    const defaultProviderData = [];
    const providerData = props.providers || defaultProviderData;

    //--------------------------Conditional Rendering ------------------------------
    let content;
    if (providerData.length === 0) {
        content = <div></div>
    } else {
        content =

            <div className={styles.providerList}>
                {
                    providerData.map((provider, index) => {
                        const { url, alt, description, image } = provider;
                        return (
                            <a key={index} href={url} alt={alt} className={styles.providerButton}>
                                <img src={image} />
                                <span>{description}</span>
                            </a>
                        )
                    })
                }
            </div>


    }

    return (
        <div className={styles.providerOptionsWrapper} >
            <h3>Other login options</h3>
            {content}
        </div>
    );
};

export default ProviderLogin;