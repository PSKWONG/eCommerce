// --------------------------- Import modules ---------------------------
import useFormStates from "./states";



//------------------------- Form actions ----------------------- //

const useFormActions = () => {

    // Form states
    const { setUsername, setEmail, setPassword , setConfirmPassword} = useFormStates();

    const handleOnChange = (e) => {
        // Update the state unpon change in the input field
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    return {
        handleOnChange
    };

};

export default useFormActions;