import {FC, useState, useEffect} from 'react';
import {RootState} from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import FormBuilder from '../FormBuilder/FormBuilder';
import {getSettingsData, updateSettingsData} from '../../features/settingsSlice'
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
            slectedDate: null,
            disabled: false
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
            slectedDate: null,
            disabled: false
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
            slectedDate: null,
            disabled: false
    }
],
    isValidForm: true
};

const TicketDetail: FormInterface = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"bronzeTicketPrice",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Bronze",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null,
            disabled: false
    }, 
    {elementType:FormElementType.input,
        value:"",
        id:"silverTicketPrice",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.number,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Silver",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null,
        disabled: false
},
{elementType:FormElementType.input,
    value:"",
    id:"goldTicketPrice",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.number,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Gold",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null,
    disabled: false
}, {elementType:FormElementType.input,
    value:"",
    id:"platinumTicketPrice",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.number,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Platinum",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null,
    disabled: false
}],
    isValidForm: true
};

const StaticImgUploaderForm:FC<StaticImgProps> = ({details, bannerRedirectionUrl}) => {
const dispatch = useDispatch()
    const [ticketDetail, setTicketDetail] = useState(TicketDetail);

    const [staticForm, setStaticForm] = useState<any>([]);
    const [isDataUpdated, setDataUpdateStatus] = useState(false)

    const settingsData = useSelector((state:RootState) => state.settings.data);
    useEffect(() => {
        dispatch(getSettingsData());
    }, []);

    const setSettingsData = () => {
        let lotteryData = {};
        let auctionData = {};
        for (let settingsObj of settingsData) {
            if (settingsObj.settingFor === "LOTTERY") {
                lotteryData = settingsObj;
            }
            if (settingsObj.settingFor === "AUCTION") {
                auctionData = settingsObj;
            }
        }

        let updatedSettings = ticketDetail.form.map((ticketObj) => {
            return {
                ...ticketObj,
                value: lotteryData[ticketObj.id]
            }
        });
        setTicketDetail({
            ...ticketDetail,
            form:updatedSettings
        });
    }

    const handleAuctionTicketDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, ticketDetail.form);
        setTicketDetail({
            ...ticketDetail,
            form: updatedStateArray
        });
    }

    const auctionTicketDetalView = <FormBuilder formElements={ticketDetail.form} 
    onInputChange = {handleAuctionTicketDetails} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;



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

    return <>{lotteryNameFormView}
    {auctionTicketDetalView}
    </>
}

export default StaticImgUploaderForm
