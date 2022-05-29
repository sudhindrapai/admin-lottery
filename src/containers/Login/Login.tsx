import {FC, useState} from 'react';
import {Wrapper, Container, BrandLogo,LoginForm} from './StyledLogin';
import LogoSrc from '../../assets/images/headerLogo.svg';

import FormBuilder from '../FormBuilder/FormBuilder';
import Button from '../../components/UI/Button/Button';

import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../Utility/InterFacesAndEnum';
import {updateFormInputState, validateForm} from '../../Utility/Utility';

import { RootState } from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {createLogin} from '../../features/loginSlice';

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
            label:"emailId",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
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
            slectedDate: null
        },
    ],
    isValidForm: false
}

const Login:FC = () => {

    const dispatch = useDispatch();

    const [valeu, setValue] = useState<LoginForm>(loginFormState);

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

export default Login