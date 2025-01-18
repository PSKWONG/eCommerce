// ------------------- Import Modules ------------------------------
//Core Modules
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearErrorMessages } from '../../features/authentication/authenticationSlice';

// ------------------- Effect Hook ------------------------------

const useLoginEffect = (states) => {
    const { email, password } = states;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrorMessages()); 
    }, [email, password]);
}

export default useLoginEffect;