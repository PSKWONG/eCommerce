//------------------------------ Import Modules ------------------------------//
import React  from 'react';



// ----------------------------- Import Components ----------------------------- //
//Assets
import '../../../assets/styles/App.css';
import styles from './productList.module.css';
import Display from './Display';


// ----------------------------- Product List Component  ----------------------------- //

const ProductList = (props) => { //Create a functional component named ProductList

    const {data, totalItems} = props.productList
    console.log('This is the tt :',totalItems);

    const content = ()=>{
        if(!totalItems){
            return <div className={styles.noProduct}>No product available</div>
        }else{
            const displayList = data.map((product, index) => {
                return <Display key={index} {...product} />
            })
            return displayList; 
        }
    }




    return ( //Return the following
        <div className={`PageWrapper`}> {/* A div element */}
        <div className={`${styles.productListWrapper} flatContentWrapper twoColumnWrapper`}>
            <div className={`${styles.contentWrapper} ${styles.titleWrapper} leftColumn`}>
                <h2>Product List </h2>
            </div>
            <div className={`${styles.ListWrapper} ${styles.contentWrapper} rightColumn`}>
                {content()}
            </div>
        </div>
    </div>
    );
};

export default ProductList; //Export the ProductList component
