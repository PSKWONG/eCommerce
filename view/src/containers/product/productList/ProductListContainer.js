// ------------------------------- Import Modules ------------------------------ //
import React  from 'react';



// ----------------------------- Import Components ----------------------------- //
import ProductList from '../../../components/product/ProductList'; //Import ProductList component
import useProductListData from './productListData'; //Import ProductListData component


// ----------------------------- Product List Containers ----------------------------- //

const ProductListContainer = () => {

    const productListData = useProductListData(); //Call the useProductListData component


    return (
        <ProductList {...productListData}/> //Render the ProductList component
    );
};

export default ProductListContainer;