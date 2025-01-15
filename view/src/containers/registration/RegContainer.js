// ------------------------ Import Modules --------------------------
import React from 'react';

// ------------------------ Import Components --------------------------
import RegPage from '../../components/registration/Registration';

// Form States 
import useFormStates from './states';
//Form Actions
import useFormActions from './formHandlers';
//Form Effect Hook 
import useFormEffect from './effectHook';
//Form Data Constructor Hook 
import useFormData from './formData';



// ------------------------ Registration Container --------------------------
const RegContainer = () => {

    //States in registration forms 
    const formStates = useFormStates();

    //Form Handlers 
    const formHandlers = useFormActions(formStates);

    //Effect Hook
    useFormEffect(formStates);

    //Form Data Constructor Hook 
    const formData = useFormData(formStates, formHandlers);
   
    return (
        < RegPage {...formData} />
    );
};

export default RegContainer;