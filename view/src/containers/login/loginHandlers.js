// -------------------------- Import Modules ------------------------------


// ------------------------------ Import Components ------------------------------




//--------------------------- Login Handlers ------------------------------

const useLoginHandlers = (states) => {

    const { email, password, message, setEmail, setPassword, setMessage } = states;

    const handleOnChange = (event) => {
        const {name, value} = event.target;
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

    return {handleOnChange }

}; 

export default useLoginHandlers;