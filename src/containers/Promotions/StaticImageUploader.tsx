import {FC, useState} from 'react';

import FormBuilder from '../FormBuilder/FormBuilder';
import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../Utility/InterFacesAndEnum';

import {StaticBannerSectionWrapper, DesktopBannerSection,
     BannerSectionTitle, AddImageBtn, BannerSectionSubtitle, StaticFormSection} from './StyledPromotions';

interface FormInterface {
    form: FormElement[],
    isValidForm: boolean
} 

const staticSectionForm: FormInterface = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"bannerImgUrl",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Banner URL",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    },
    {
        elementType:FormElementType.datePicker,
            value:"",
            id:"startDate",
            isRequired:false,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:true,
            isTouched:false,
            errorMessage:"",
            label:"Start Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    },
    {
        elementType:FormElementType.datePicker,
            value:"",
            id:"endDate",
            isRequired:false,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:true,
            isTouched:false,
            errorMessage:"",
            label:"End Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    }
],
    isValidForm: true
};

const StaticImageUploader = () => {

    const [staticForm, setStaticForm] = useState<FormInterface>(staticSectionForm);

    const handleInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>) => {
        let updatedStateArray = updateFormInputState(event, staticForm.form);
        setStaticForm({
            ...staticForm,
            form: updatedStateArray
        });
    }

    let lotteryNameFormView = <FormBuilder formElements={staticSectionForm.form} 
    onInputChange = {handleInputChange} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;

    return <StaticBannerSectionWrapper>
        <DesktopBannerSection>
            <BannerSectionTitle>
            Desktop Banner (1920x450)
            </BannerSectionTitle>
            <AddImageBtn>
                Add image
            </AddImageBtn>
        </DesktopBannerSection>
        <DesktopBannerSection>
            <BannerSectionTitle>
            Desktop Banner (1920x450)
            <BannerSectionSubtitle>
            Note: If mobile banner is not added, by default desktop banner will be displayed
            </BannerSectionSubtitle>
            </BannerSectionTitle>
            <AddImageBtn>
                Add image
            </AddImageBtn>
        </DesktopBannerSection>
        <StaticFormSection>
            {lotteryNameFormView}
        </StaticFormSection>
    </StaticBannerSectionWrapper>
};

export default StaticImageUploader