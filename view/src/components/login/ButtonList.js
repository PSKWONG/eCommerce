//------------------------- Import Modules ------------------------------
import React from 'react';


// ------------------------- Import Components ------------------------------
import styles from './login.module.css';
import ButtonTemplate from './Buttontemplate';


//------------------------- Provider Login ------------------------------

const ButtonList = (props) => {


    //-------------------------- Provider Login Data ------------------------------
    const defaultButtonListData = [];
    const buttonListData = props.buttonList || defaultButtonListData;

    //--------------------------Conditional Rendering ------------------------------
    const isEmpty = buttonListData.length === 0 ? true : false;
    let content;


    if (isEmpty) {
        content = <div></div>
    } else {
        content =

            <div className={styles.buttonListWrapper}>
                {
                    buttonListData.map((button, index) => {
                        return <ButtonTemplate key={index} {...button} />
                    })
                }
            </div>


    }

    return (
        <>
            {content}
        </>
    );
};

export default ButtonList;