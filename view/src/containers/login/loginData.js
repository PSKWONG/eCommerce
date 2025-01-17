//------------------------------- Import Modules ------------------------------
//Assets
import emailIcon from '../../assets/images/emailIcon.png';
import facebookIcon from '../../assets/images/facebookIcon.png';
import styles from '../../components/login/login.module.css';



// ---------------------------- Login Data Container ------------------------------

const useLoginData = (states , actions) => {
    const { email, password, message } = states;
    const { isValidEmail, isValidPassword } = states;


    const loginFormData =
    {
        registration: {
            option: [
                {
                    image: emailIcon,
                    url: '/register',
                    description: 'Email',
                    alt: 'Register with Email',
                }
            ]
        },
        login: {
            local: [
                {
                    name: 'email',
                    title: 'Email:',
                    type: 'email',
                    value: email,
                    error: isValidEmail === false ? styles.error : styles.valid,
                },
                {
                    name: 'password',
                    title: 'Password:',
                    type: 'password',
                    value: password,
                    error: isValidPassword === false ? styles.error : styles.valid,
                }

            ], 
            error:{
                message: message,
                msgStyle: message? styles.messgeWrapper : styles.hide
            }, 
            providers: [
                {
                    image: facebookIcon,
                    url: '/external/authen/login/facebook',
                    description: 'Facebook',
                    alt: 'Login with Facebook',
                }
            ]
        }
    }

    return loginFormData;
};

export default useLoginData;