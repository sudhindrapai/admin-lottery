import {FC, useState, useEffect} from 'react';
import {Wrapper, Container, BrandLogo,LoginForm} from '../Login/StyledLogin';
import LogoSrc from '../../assets/images/headerLogo.svg';

import FormBuilder from '../FormBuilder/FormBuilder';
import Button from '../../components/UI/Button/Button';

import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../Utility/InterFacesAndEnum';
import {updateFormInputState, validateForm} from '../../Utility/Utility';

import { RootState } from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {createLogin, toggleLogin} from '../../features/loginSlice';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../routs'

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
            value:"12",
            id:"twoFa",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"OTP",
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

const TwoFA:FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isLogedIn = useSelector((state:RootState) => state.login.isLoggedin);

    const [valeu, setValue] = useState<LoginForm>(loginFormState);

    useEffect(() => {
        if (isLogedIn === true) {
            navigate(adminRouts.dashboard);
            window.location.reload();
        }
        return() => {
            dispatch(toggleLogin({
                isLoggedin: false,
                isAuthenticated: true
            }));
        }
    },[isLogedIn])

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
            </LoginForm>
            <Button title={"Login"} btnSize={ButtonSize.lg} btnVariant={ButtonVariant.primaryFilled} clicked={handleLogin} >
                Login
            </Button>
        </Container>
    </Wrapper>
};

export default TwoFA