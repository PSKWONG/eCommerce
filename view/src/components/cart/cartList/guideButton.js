//--------------------------Import Modules--------------------------
import React from 'react';
import styles from './cartList.module.css';


const GuidingButton = (props) => {

    //-----------------------Extract Buttons Data-----------------------
    const { backButton, nextButton } = props.progressGuideline;

    return (
        <div className={styles.guidingList}>
            <div className={`${backButton.style} ${styles.guidingButtons} ${styles.guidingButtonsLeft} `} onClick={backButton.handler}>
                <img src={backButton.icon}  />
            </div>
            <div className={`${nextButton.style}  ${styles.guidingButtons} ${styles.guidingButtonsRight}`} onClick={nextButton.handler}>
                <img src={nextButton.icon}  />
            </div>

        </div>
    )
};

export default GuidingButton;