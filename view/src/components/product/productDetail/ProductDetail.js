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
const ProductDetail = (data) => {

    //Set default value for the productDetail
    const productDetail = data.productDetailData || {};
    const productDetailFetchingData = data.productDetailFetchingData || {}; //Phase 2 - Loading Status on conditional rendering 
    const counterData = data.counterData || {};
    const updateCartItemData = data.updateCartItemData || {};
    const updateCartItemInProductData = data.updateCartItemInProductData || {};

    //--------------------------- Conditional Rendering ---------------------------
    //Check the intiquity of the productDetail
    const isEmpty = Object.keys(productDetail).length === 0;

    //Set Variable for the Conditional Contents
    let productContent;
    let cartContent;

    //Conditional Switching 
    switch (true) {
        case isEmpty:
            productContent = <div>Product Detail is Empty</div>;
            break;

        case !isEmpty:
            const { product_name, description, image_path, unit_price } = productDetail;
            const imageBaseURL = server_URL + '/assets/productImage/';

            productContent =
                <>
                    <h1>{product_name} </h1>
                    <div className={styles.productDetailWrapper}>
                        <img src={imageBaseURL + image_path} alt={product_name} className={styles.contentWrapper} />
                        <div className={`${styles.contentWrapper} ${styles.descriptionDisplay}`}>
                            <p>{description}</p>
                        </div>
                    </div>

                </>;

            const { command } = updateCartItemInProductData;
            const { handleUpdateCartItem } = updateCartItemData.cartItemUpdateHandlers;


            cartContent =
                <>
                    <div className={styles.priceTag}>
                        Price: <em>{unit_price}</em>
                    </div>
                    <div>
                        <QuantityCount counterData={counterData} />
                    </div>
                    <div className={styles.cartActionButton} onClick={handleUpdateCartItem}>
                        {command}
                    </div>
                </>
            break;
        default:
            productContent = <></>
            break;

    }




    return (
        <div className={`PageWrapper`}>
            <div className={` floatContentWrapper twoColumnWrapper ${styles.productDetailWrapper}`}>

                {/* Product Detail */}
                <div className={` leftColumn ${styles.contentWrapper} ${styles.productWrapper}`}>
                    {productContent}
                </div>

                {/* Cart Action */}
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>
                    {cartContent}
                </div>
            </div>
        </div>
    );

};

export default ProductDetail;