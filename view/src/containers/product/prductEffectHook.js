//-------------------- Import Modules --------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList, setCategroyFiltering , fetchProductDetail} from "../../features/productInfo/productInfoSlice";
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
        }else{
            dispatch(setCategroyFiltering(category_id));
        }
        dispatch(fetchProductList());
    }
        , [category_id, dispatch]);
}


export const useProductDetailEffect = ({productStates}) => {

    const {setProduct_id} = productStates;


    //Set Custom Actions 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Get the category_id from the URL
    const { product_id } = useParams();
    //


    //Component Actions
    useEffect(() => {
        //Check if the category_id is valid
        const isValidProductID = product_id && !isNaN(product_id);

        if (!isValidProductID) {
            navigate('/'); //Redirect to the home page
            return;
        }
        setProduct_id(product_id);
        dispatch(fetchProductDetail(product_id));
    }, [product_id]);
    
}

