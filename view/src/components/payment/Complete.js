// ------------------ Import Modules ------------------
import React from 'react';

// ------------------ Import Styles ------------------
import styles from './payment.module.css';

const CompletePage = (props) => {

    const { text } = props;

    return (
        <div className="PageWrapper">
            <div className={`${styles.paymentAndACtionWrapper} floatContentWrapper `}>
                <div className={`${styles.completePageWrapper} ${styles.formWrapper} leftColumn`}>
                    <h3>{text}</h3>
                </div>

            </div>
        </div>
    );

};

export default CompletePage;