//------------------ Import Modules --------------------------
import React from 'react';

// ------------------------ Import Components --------------------------
//Assets
import '../../assets/styles/App.css'; 
import styles from './registration.module.css';
import RegForm from './RegistrationForm'; 
import ListOfGuidelines from './ListOfGuidlelines'


// ------------------------ Registration Component --------------------------
const Registration = ({registrationForm, guidelines}) => {

 

    return (
        <div className="floatingPageWrapper">
            <div className= {`${styles.formAndGuidelinenWrapper} floatContentWrapper `}>
                <div className= {`${styles.guidelineWrapper} ${styles.contentWrapper}`}>
                    <h1>Guideline</h1>
                    <ListOfGuidelines {...guidelines} />
                </div>
                <div className={`${styles.registrationWrapper} ${styles.contentWrapper}`}>
                    <h1>Registration</h1>
                    <p>Please fill in the following information to continue the registration</p>
                    <RegForm  {...registrationForm} />
                </div>
            </div>
        </div>
    );
};

export default Registration;