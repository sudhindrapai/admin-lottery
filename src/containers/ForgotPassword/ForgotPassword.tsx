import {FC,useState} from 'react';
import FormBuilder from '../FormBuilder/FormBuilder';
import Button from '../../components/UI/Button/Button';

import {Wrapper,Container, Title, SubTitle, CloseIcon} from './StyledForgotPassword'

import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement, NotificationType} from '../../Utility/InterFacesAndEnum';
import {updateFormInputState} from '../../Utility/Utility';

import { RootState } from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {createLogin, toggleLogin} from '../../features/loginSlice';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../routs';

import {validateForgotPassword} from '../../Utility/formValidation';
import {toggleNotificationVisibility} from '../../features/networkNotification'

interface ForgotPswdForm {
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

interface ForgotPswd {
    emailId: string
}


const forgotPasswordState:ForgotPswdForm = {
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
            label:"EmailId",
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

const ForgotPassword:FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isLogedIn = useSelector((state:RootState) => state.login.isLoggedin);

    const [value, setValue] = useState<ForgotPswdForm>(forgotPasswordState);

    const handleInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, value.form);
        setValue({
            ...value,
            form: updatedStateArray
        });
    }

    const redirectToLogin = () => {
        navigate(adminRouts.login);
    };

    const handleForgotPswd = () => {
        let payload:any = {};
        let formArray = value.form;
        for (let formObj of formArray) {
            payload[formObj.id] = formObj.value;
        }

        let validatedObj = validateForgotPassword(payload);
        if (validatedObj.status) {
            // send API request here
        } else {
            dispatch(toggleNotificationVisibility({
                isVisible:true,
                status: NotificationType.error,
                message: validatedObj.message
            }));
        }
    };

    return <Wrapper> 
        <Container>
            <CloseIcon onClick={redirectToLogin} />
            <Title>
                Forgot Password
            </Title>
            <SubTitle>
                Please enter your registred email id and we will send OTP to validate your Authenticity
            </SubTitle>
        <FormBuilder formElements={value.form} onInputChange = {handleInputChange} onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />
            <Button title={"Send OTP"} btnSize={ButtonSize.lg} btnVariant={ButtonVariant.primaryFilled} clicked={handleForgotPswd} />
            </Container>
            </Wrapper>

};

export default ForgotPassword