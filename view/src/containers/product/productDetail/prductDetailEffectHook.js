//-------------------- Import Modules --------------------
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductDetail } from "../../../features/productInfo/productInfoSlice";
import { useNavigate, useParams } from "react-router-dom";



// ------------------ Product List Effect Hook ------------------

const useProductDetailEffect = (actions) => {
    //Set Custom Actions 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Get the category_id from the URL
    const { product_id } = useParams();


    //Component Actions
    useEffect(() => {
        //Check if the category_id is valid
        const isValidProductID = product_id && !isNaN(product_id);

        if (!isValidProductID) {
            navigate('/'); //Redirect to the home page
            return;
        }
        dispatch(fetchProductDetail(product_id));
    }, [product_id, dispatch]);
    
}

export default useProductDetailEffect;