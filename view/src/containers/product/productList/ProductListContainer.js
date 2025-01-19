// ------------------------------- Import Modules ------------------------------ //
import React  from 'react';



// ----------------------------- Import Components ----------------------------- //
import ProductList from '../../../components/product/productList/ProductList'; //Import ProductList component
import useProductListData from './productListData'; //Import ProductListData component
import useProductListEffect from './prductListEffectHook';


// ----------------------------- Product List Containers ----------------------------- //

const ProductListContainer = () => {

    const productListData = useProductListData(); //Call the useProductListData component
    
    useProductListEffect(); //Call the useProductListEffect component

    return (
        <ProductList {...productListData}/> //Render the ProductList component
    );
};

export default ProductListContainer;