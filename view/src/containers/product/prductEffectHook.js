//-------------------- Import Modules --------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList, setCategroyFiltering, fetchProductDetail, selectProductDetail } from "../../features/productInfo/productInfoSlice";
import { useNavigate, useParams } from "react-router-dom";



// ------------------ Product List Effect Hook ------------------

export const useProductListEffect = (actions) => {
    //Set Custom Actions 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Get the category_id from the URL
    const { category_id } = useParams();


    //Component Actions
    useEffect(() => {
        //Check if the category_id is valid
        const isValidCategoryID = category_id && !isNaN(category_id);

        if (!isValidCategoryID) {
            navigate('/'); //Redirect to the home page
            return;
        } else {
            dispatch(setCategroyFiltering(category_id));
        }
        dispatch(fetchProductList());
    }
        , [category_id, dispatch]);
}


export const useProductDetailEffect = (data) => {

    const { cartItemStates } = data;
    const {setProduct_item} = cartItemStates;
    


    //Set Custom Actions 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Get the category_id from the URL
    const { product_id } = useParams();
    const productItem = useSelector(selectProductDetail); 



    //Component Actions
    useEffect(() => {
        //Check if the category_id is valid
        const isValidProductID = product_id && !isNaN(product_id);

        if (!isValidProductID) {
            navigate('/'); //Redirect to the home page
            return;
        }

        dispatch(fetchProductDetail(product_id));
    }, [product_id]);

    useEffect(() => {
        setProduct_item(productItem); 
    }, [productItem]);

}
