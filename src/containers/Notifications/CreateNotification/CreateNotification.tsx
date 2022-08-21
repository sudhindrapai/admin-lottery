import {FC, useState} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';

import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../Utility/InterFacesAndEnum';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../app/Store';
import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs'

import {Wrapper, Container, FormSection, SectionTitle, FormBody, RichTextEditorContainer} from './StyledCreateNotification'

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
        {elementType:FormElementType.select,
            value:"Custom",
            id:"emailUserType",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Custome Type",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["Custom","Gold Members","General Users"],
            selectedTime: null,
            slectedDate: null
        },
        {elementType:FormElementType.datePicker,
            value:"",
            id:"emailScheduleDate",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
        },
    {elementType:FormElementType.input,
        value:"",
        id:"emailSubject",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Subject",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
}
],
    isValidForm: true
};

const CreateEmailNotification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createNotification, setNotification] = useState<FormState>(AuctionDetail);

    const imageNames = useSelector((state:RootState) => state.images.imageNames);

    const handleAuctionDetailInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, createNotification.form);
        setNotification({
            ...createNotification,
            form: updatedStateArray
        });
    }

    const handleScheduleDaysTimeInput = (date: Date, name: string) => {
        let updatedArray = updateFormDate(date, name, createNotification.form);
        setNotification({
            ...createNotification,
            form:updatedArray
        });
    };

    const handleProductDetails = (value: string, name: string) => {
        let updatedArray = updateFormSelectState(value, name, createNotification.form);
        setNotification({
            ...createNotification,
            form:updatedArray
        });
    }

    const auctionDetailView = <FormBuilder formElements={createNotification.form} 
    onInputChange = {handleAuctionDetailInput} 
    onSelectValueChange={handleProductDetails} 
    onChangeDate={handleScheduleDaysTimeInput} onChangeTime={() => {}} />;

    const createEmailNotification = () => {
        let payload:any = {};

        for (let elementObj of createNotification.form) {

            payload[elementObj.id] = elementObj["value"]
        }

        payload["emailAttachments"] = imageNames;

        console.log(payload)
    }

    return <Wrapper>
        <ViewHeader title={"Create Notification"} isBackButtonRequired={true} 
        backButtonRedirectionUrl={adminRouts.emailNotificationList} />
        <Container>
            <FormSection>
                <SectionTitle>
                    Create Notification
                </SectionTitle>
                <FormBody>
                    {auctionDetailView}
                </FormBody>
                <RichTextEditorContainer>
                <RichTextEditor />
                </RichTextEditorContainer>
                <RichTextEditorContainer>
                <ImageUploader />
                </RichTextEditorContainer>
            </FormSection>
            <Button
                title={"Create Auction"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={createEmailNotification} />
        </Container>
    </Wrapper>
};

export default CreateEmailNotification