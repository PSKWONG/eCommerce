//------------------------- Import Modules ------------------------------
import React from 'react';


// ------------------------- Import Components ------------------------------
import styles from './login.module.css';


//------------------------- Provider Login ------------------------------

const ProviderLogin = (props) => {
    const providerData = props.providers;
    return (
        <div className={styles.providerOptionsWrapper} >
            <h3>Other login options</h3>
            <div  className={styles.providerList}>
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

        </div>
    );
};

export default ProviderLogin;