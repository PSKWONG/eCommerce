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
        <div className="PageWrapper">
            <div className= {`${styles.formAndGuidelinenWrapper} floatContentWrapper twoColumnWrapper `}>
                <div className= {`${styles.guidelineWrapper} ${styles.contentWrapper} leftColumn`}>
                    <h1>Guideline</h1>
                    <ListOfGuidelines {...guidelines} />
                </div>
                <div className={`${styles.registrationWrapper} ${styles.contentWrapper} rightColumn`}>
                    <h1>Registration</h1>
                    <p>Please fill in the following information to continue the registration</p>
                    <RegForm  {...registrationForm} />
                </div>
            </div>
        </div>
    );
};

export default Registration;