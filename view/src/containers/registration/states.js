//---------------------------- Import Modules -------------------
import { useState } from "react";

const useFormStates = ()=>{
    const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isValidUsername, setIsValidUsername] = useState();
        const [isValidEmail, setIsValidEmail] = useState();
        const [isValidPassword, setIsValidPassword] = useState();
        const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();
        const [isFormCompleted, setIsFormCompleted] = useState(false);
        const [guideline, setGuideline] = useState([]);
    
        return {
            username, setUsername,
            email, setEmail,
            password, setPassword,
            confirmPassword, setConfirmPassword,
            isValidUsername, setIsValidUsername,
            isValidEmail, setIsValidEmail,
            isValidPassword, setIsValidPassword,
            isValidConfirmPassword, setIsValidConfirmPassword,
            isFormCompleted, setIsFormCompleted,
            guideline, setGuideline
        }
}; 
export default useFormStates;
