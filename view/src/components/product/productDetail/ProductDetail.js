// -------------------------- Import Modules --------------------------
import React from 'react';


//-------------------------- Import Components --------------------------
import '../../../assets/styles/App.css';
import styles from './ProductDetail.module.css';
import QuantityCount from '../../cart/QuantityCount';
//envrioment
const environment = process.env.REACT_APP_ENV;
//API URL
const server_URL = environment === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;





//-------------------------- ProductDetail Component --------------------------
const ProductDetail = ({ productDetail, countData }) => {
    const { product_name, description, image_path, unit_price } = productDetail;
    const imageBaseURL = server_URL + '/assets/productImage/';
    return (
        <div className={`PageWrapper`}> {/* A div element */}
            <div className={` floatContentWrapper twoColumnWrapper ${styles.productDetailWrapper}`}>
                <div className={` leftColumn ${styles.contentWrapper} ${styles.productWrapper}`}>
                    <h1>{product_name} </h1>
                    <div className={styles.productDetailWrapper}>
                        <img src={imageBaseURL + image_path} alt={product_name} className={styles.contentWrapper}/>
                        <div className={`${styles.contentWrapper} ${styles.descriptionDisplay}`}>
                            <p>{description}</p>
                        </div>
                    </div>
                    
                </div>
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>
                    <div className={styles.priceTag}>
                        Price: <em>{unit_price}</em>
                    </div>
                    <div>
                        <QuantityCount {...countData} />
                    </div>
                    

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;