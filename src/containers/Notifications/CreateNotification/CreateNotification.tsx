import {FC, useState} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';

import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../Utility/InterFacesAndEnum';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../app/Store';
import {useNavigate} from 'react-router-dom';

import {Wrapper, Container, FormSection, SectionTitle, FormBody} from './StyledCreateNotification'

interface FormState {
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

const AuctionDetail: FormState = {
    form:[ 
    {elementType:FormElementType.input,
        value:"",
        id:"userName",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"User Name",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"emailAddress",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.email,
    customValidationType: customValidationType.emailValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Email Address",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"mobileNumber",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.number,
    customValidationType: customValidationType.mobileValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Mobile Number",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"accountType",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.text,
    customValidationType: customValidationType.null,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Account Type",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
}
],
    isValidForm: true
};

const CreateNotification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createNotification, setNotification] = useState<FormState>(AuctionDetail);

    const handleAuctionDetailInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, createNotification.form);
        setNotification({
            ...createNotification,
            form: updatedStateArray
        });
    }

    const auctionDetailView = <FormBuilder formElements={createNotification.form} 
    onInputChange = {handleAuctionDetailInput} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;

    return <Wrapper>
        <ViewHeader title={"Create Notification"} />
        <Container>
            <FormSection>
                <SectionTitle>
                    Create Notification
                </SectionTitle>
                <FormBody>
                    {auctionDetailView}
                </FormBody>
            </FormSection>
            <RichTextEditor />
        </Container>
    </Wrapper>
};

export default CreateNotification