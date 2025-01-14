//---------------------------- Import Modules --------------------------
//core modules
import React from 'react';


// ------------------------ Import Components --------------------------
//Assets
import styles from './registration.module.css';


// ------------------------ List of Guidelines --------------------------
const ListOfGuidelines = ({data}) => {
    return (
        <div className={styles.guidelineList}>
            {
                data.map((guideline, index) => {
                    return (
                        <div key={index} className={styles.guidelineRow}>
                            {guideline}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ListOfGuidelines;