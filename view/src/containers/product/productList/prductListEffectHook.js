//-------------------- Import Modules --------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList, setCategroyFiltering } from "../../../features/productInfo/productInfoSlice";
import { useNavigate, useParams } from "react-router-dom";



// ------------------ Product List Effect Hook ------------------

const useProductListEffect = (actions) => {
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
        }else{
            dispatch(setCategroyFiltering(category_id));
        }
        dispatch(fetchProductList());
    }
        , [category_id, dispatch]);
}

export default useProductListEffect;