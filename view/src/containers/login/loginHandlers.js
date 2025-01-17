// -------------------------- Import Modules ------------------------------
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ------------------------------ Import Components ------------------------------
import { loginAPI } from '../../features/api/API';
import { checkAuth } from "../../features/authentication/authenticationSlice";


//--------------------------- Global Variable  ------------------------------



//--------------------------- Login Handlers ------------------------------

const useLoginHandlers = (states) => {

    const { email, password, setEmail, setPassword, setMessage } = states;
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handLoginSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); //Clear the message

        //Check if email and password are empty
        if (!email || !password) {
            setMessage('Please fill in all fields');
            return;
        }

        //Construct the post request body for API calling
        const logindata = {
            username: email,
            password: password
        };

        // API call to login
        try {
            const response = await loginAPI(logindata);
            const status = response.status;

            console.log('response:', response);
            console.log('status:', status);

            const message = response.response.data.error.message || '';

            if(status === 200) {
                
                dispatch(checkAuth()); //Check the authentication status
                navigate('/'); 
                console.log('Redirecting to home page');
                return;
            } else if(status === 401){
                setMessage(message);
                return;
            }else{
                console.log('Local Login API error:', message);
                setMessage(message);
                return;
            }

        }catch(error){
            console.log('Local Login API error:', error);
            setMessage('Login failed. Please try again');
        }
    };

    return { handleOnChange, handLoginSubmit }

};

export default useLoginHandlers;