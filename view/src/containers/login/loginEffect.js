// ------------------- Import Modules ------------------------------
//Core Modules
import { useEffect } from 'react';

// ------------------- Effect Hook ------------------------------

const useLoginEffect = (states, actions) => {
    const { email, password , setMessage} = states;

    useEffect(() => {
        setMessage('');
    }, [email, password]);
}

export default useLoginEffect;