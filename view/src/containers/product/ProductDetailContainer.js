//----------------- Import Modules --------------------------
import React , {useMemo} from 'react';

//----------------- Import Components --------------------------
// Product Detail Component
import ProductDetail from '../../components/product/productDetail/ProductDetail';

import { useProductStates } from './productStates'
import useProductData from './productData'
import { useProductDetailEffect } from './prductEffectHook'
// Quantity Counter Component
import { useQtyCounterStates } from '../cart/cartStates'
import { useQtyCounterEffect } from '../cart/cartEffectHook'


//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {


    const productStates = useProductStates();
    const productData = useProductData();
    useProductDetailEffect({ productStates });

    const countStates = useQtyCounterStates();
    const countData = useMemo(() => [
        { product_id: 1, quantity: 10,unit_price: 100 },
        { product_id: 2, quantity: 12, unit_price: 20 },
        // Add more items as needed
    ], []);
    
    useQtyCounterEffect(
        {
            product_id: productStates.product_id,
            setCount: countStates.setCount,
            cartItems: countData
        }
    );



    return (
        <ProductDetail {...productData} countData={countStates} />
    );
};

export default ProductDetailContainer;