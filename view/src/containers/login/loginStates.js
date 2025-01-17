// -------------------- Import Modules --------------------
import { useState } from "react";


// ------------------------------ Import Components ------------------------------





// ------------------------------ Login States ------------------------------

const useStates = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPassword, setIsValidPassword] = useState();

    return (
        {
            email,
            password,
            message,
            isValidEmail,
            isValidPassword,
            setEmail,
            setPassword,
            setMessage,
            setIsValidEmail,
            setIsValidPassword
        }
    );
}

export default useStates;