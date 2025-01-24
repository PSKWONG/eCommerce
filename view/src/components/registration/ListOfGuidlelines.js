//---------------------------- Import Modules --------------------------
//core modules
import React from 'react';


// ------------------------ Import Components --------------------------
//Assets
import styles from './registration.module.css';


// ------------------------ List of Guidelines --------------------------
const ListOfGuidelines = (props) => {

    //------------------- Guildeline Data -------------------
    const guidelineData = props?.regFormGuidelineData.guideline || [];

    //------------------- Conditional Rendering -------------------
    let content;
    const isEmpty = guidelineData.length === 0 ? true : false;

    switch (true) {
        case isEmpty:
            content = 
            <div className={styles.guidelineList}></div>
            break;
        default:
            content =
                <div className={styles.guidelineList}>
                    {
                        guidelineData.map((guideline, index) => {
                            return (
                                <div key={index} className={styles.guidelineRow}>
                                    {guideline}
                                </div>
                            );
                        })
                    }
                </div>
            break;
    }



    return (
        <>
            {content}
        </>
    );
};

export default ListOfGuidelines;