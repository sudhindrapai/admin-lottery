import {FC, useState, useEffect} from 'react';
import {Wrapper, Container, BrandLogo,LoginForm, ForgotPswd} from './StyledLogin';
import LogoSrc from '../../assets/images/headerLogo.svg';

import FormBuilder from '../FormBuilder/FormBuilder';
import Button from '../../components/UI/Button/Button';

import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../Utility/InterFacesAndEnum';
import {updateFormInputState} from '../../Utility/Utility';

import { RootState } from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {createLogin, toggleLogin} from '../../features/loginSlice';
import {toggleLoader} from '../../features/loader'

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../routs';

interface LoginForm {
    form: FormElement[],
    isValidForm: boolean
} 

enum ButtonSize {
    sm = "small",
    md = "medium",
    lg = "large"
}
enum ButtonVariant {
    primaryFilled = "primary-filled",
    secondary = "secondary",
    primaryLink = "primaryLink"
}

interface SigninAccount {
    emailId: string,
    password: string
}

const loginFormState:LoginForm = {
    form:[
        {
            elementType:FormElementType.input,
            value:"",
            id:"emailId",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.emailValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Email ID",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.input,
            value:"",
            id:"password",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.password,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Password",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        }
    ],
    isValidForm: false
}

const Login:FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isLogedIn = useSelector((state:RootState) => state.login.isLoggedin);

    const [valeu, setValue] = useState<LoginForm>(loginFormState);

    useEffect(() => {
        if (isLogedIn === true) {
            navigate(adminRouts.twoFa);
            // window.location.reload();
        }
        return() => {
            dispatch(toggleLogin({
                isLoggedin: false,
                isAuthenticated: true
            }));
            dispatch(toggleLoader({
                isLoading: false
            }));
        }
    },[isLogedIn]);

    const redirectToForgotPassword = () => {
        navigate(adminRouts.forgotPassword);
    };

    const handleInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, loginFormState.form);
        setValue({
            ...loginFormState,
            form: updatedStateArray
        });
    }

    const handleLogin = () => {
        let loginObj:SigninAccount = {
            "emailId": "",
            "password": ""  
        }
        for (let formObj of valeu.form) {
            loginObj[formObj.id] = formObj.value;
        }
        dispatch(createLogin(loginObj));
    };

    return <Wrapper>
        <Container>
            <BrandLogo src={LogoSrc} alt={"Kings Rings"} />
            <LoginForm>
                <FormBuilder formElements={valeu.form} onInputChange = {handleInputChange} onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />
    <ForgotPswd onClick={redirectToForgotPassword}>
    Forgot password?
    </ForgotPswd>
            </LoginForm>
            <Button title={"Login"} btnSize={ButtonSize.lg} btnVariant={ButtonVariant.primaryFilled} clicked={handleLogin} >
                Login
            </Button>
        </Container>
    </Wrapper>
};

export default Login