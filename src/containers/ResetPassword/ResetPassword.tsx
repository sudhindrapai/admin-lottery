import {FC,useState} from 'react';
import FormBuilder from '../FormBuilder/FormBuilder';
import Button from '../../components/UI/Button/Button';

import {Wrapper,Container, Title, SubTitle, CloseIcon} from './StyledResetPassword'

import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement, NotificationType} from '../../Utility/InterFacesAndEnum';
import {updateFormInputState} from '../../Utility/Utility';

import { RootState } from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../routs';

import {validateResetPassword} from '../../Utility/formValidation';
import {toggleNotificationVisibility} from '../../features/networkNotification'

interface ResetPswdForm {
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

interface ResetPswd {
    emailId: string
}


const resetPasswordState:ResetPswdForm = {
    form:[
        {
            elementType:FormElementType.input,
            value:"",
            id:"newPassword",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.password,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"New Password",
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
            id:"confirmPassword",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.password,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Confirm Password",
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
            id:"otp",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.null,
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

const ResetPassword:FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isLogedIn = useSelector((state:RootState) => state.login.isLoggedin);

    const [value, setValue] = useState<ResetPswdForm>(resetPasswordState);

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

    const handleResetPswd = () => {
        let payload:any = {};
        let formArray = value.form;
        for (let formObj of formArray) {
            payload[formObj.id] = formObj.value;
        }

        let validatedObj = validateResetPassword(payload);
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
                Reset Password
            </Title>
            <SubTitle>
                Your Previous Password will be rest to new password
            </SubTitle>
        <FormBuilder formElements={value.form} onInputChange = {handleInputChange} onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />
            <Button title={"Update password"} btnSize={ButtonSize.lg} btnVariant={ButtonVariant.primaryFilled} clicked={handleResetPswd} />
            </Container>
            </Wrapper>

};

export default ResetPassword