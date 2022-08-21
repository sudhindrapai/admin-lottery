import {FC, useState, useEffect} from 'react';

import FormBuilder from '../FormBuilder/FormBuilder';
import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../Utility/InterFacesAndEnum';

interface StaticImgProps {
    details:any,
    bannerRedirectionUrl:string
}

interface FormInterface {
    form: FormElement[],
    isValidForm: boolean
} 

const staticSectionForm: FormInterface = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"promotionBannerUrl",
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
            id:"promotionStartDate",
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
            id:"promotionEndDate",
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

const StaticImgUploaderForm:FC<StaticImgProps> = ({details, bannerRedirectionUrl}) => {
    const [staticForm, setStaticForm] = useState<any>([]);
    const [isDataUpdated, setDataUpdateStatus] = useState(false)

    useEffect(() => {
        if (details !== undefined && details.promotionId !== undefined && details.promotionId !== null 
            && isDataUpdated=== false){
           let values = getValue();
            setStaticForm({
                ...staticForm,
                // form:values
            });
            setDataUpdateStatus(true);
        }
    },[details]);

    const getValue = () => {
        if (staticForm?.form?.length > 0) {
        let updatedFormElement = staticForm.form.map((element) => {
            let updatedElement = {
                ...element
            }
                updatedElement["value"] = details[element.id];
                // updatedElement["value"] = "HI"
            
            return updatedElement;
        });
        console.log(details,"detailsdetailsdetailsdetailsdetails")
        return updatedFormElement;
    } else {
        return staticSectionForm
    }
    }

    const handleInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(staticForm.form,"staticForm.form,handleInputChange")
        let updatedStateArray = updateFormInputState(event, staticForm.form);
        setStaticForm({
            ...staticForm,
            form: updatedStateArray
        });
    }

    const handleScheduleDaysTimeInput = (date: Date, name: string) => {
        let updatedArray = updateFormDate(date, name, staticForm.form);
        setStaticForm({
            ...staticForm,
            form:updatedArray
        });
    };

    let lotteryNameFormView = <div></div>
    if (staticSectionForm.form.length > 0) {
        console.log(staticSectionForm.form,"staticSectionForm.form")
        lotteryNameFormView = <FormBuilder formElements={staticSectionForm.form} 
    onInputChange = {handleInputChange} 
    onSelectValueChange={() => {}} 
    onChangeDate={handleScheduleDaysTimeInput} onChangeTime={() => {}} />;
    }

    return lotteryNameFormView
}

export default StaticImgUploaderForm