//------------------ Import Modules --------------------------
import React from 'react';

// ------------------------ Import Components --------------------------
//Assets
import '../../assets/styles/App.css';
import styles from './registration.module.css';
import RegForm from './RegistrationForm';
import ListOfGuidelines from './ListOfGuidlelines'


// ------------------------ Registration Component --------------------------
const Registration = (data) => {

    return (
        <div className="PageWrapper">
            <div className={`${styles.formAndGuidelinenWrapper} floatContentWrapper twoColumnWrapper `}>

                {/* Guidelines */}
                <div className={`${styles.guidelineWrapper} ${styles.contentWrapper} leftColumn`}>
                    <h1>Guideline</h1>
                    <ListOfGuidelines {...data}/>
                </div>

                {/* Registration Form */}
                <div className={`${styles.registrationWrapper} ${styles.contentWrapper} rightColumn`}>
                    <h1>Registration</h1>
                    <p>Please fill in the following information to continue the registration</p>
                    <RegForm {...data} />
                </div>
            </div>
        </div>
    );
};

export default Registration;