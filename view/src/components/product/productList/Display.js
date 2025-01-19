// ----------------- Import Modules ----------------- //
import React from 'react';
import styles from './productList.module.css'; //Import the product list module




// ----------------- Import Components ----------------- //
//envrioment
const environment = process.env.REACT_APP_ENV;
//API URL
const server_URL = environment === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;


//-------------------- Display Component --------------------//

const Display = (props) => {
    console.log('This is the props :', props);
    const { product_id, product_name, description, image_path, unit_price } = props;
    console.log('This is the imagepath  :', image_path);
    const imageBaseURL = server_URL + '/assets/productImage/';
    return (
        <div className={styles.productItemWrapper}>
            <img src={imageBaseURL + image_path} alt="Product 1" />
            <div className={styles.infoDisplay}>
                <h3>{product_name}</h3>
            </div>
            <div>Price: {unit_price}</div>
            <div className={styles.button}>
                Detial
            </div>
        </div>
    );
};

export default Display;