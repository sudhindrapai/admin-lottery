import {FC,useState} from 'react';

import FormBuilder from '../../../../FormBuilder/FormBuilder';
import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState} from '../../../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../../../Utility/InterFacesAndEnum';
import {WeekNames, FormSectionContainer,LotteryTypeTitle,LotteryTypeValue,CreateLotteryContainer, SectionTitle, FormElementTitle, CreateLotteryFirstSection, CreateLotterySecondSection} from '../RepeatedLottery/StyledCreateLottery';

interface CreateLottery {
    form: FormElement[],
    isValidForm: boolean
} 

const lotteryMoneyForm: CreateLottery = {
    form:[
        {
            elementType:FormElementType.input,
            value:"",
            id:"lotteryPriceMoney",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Lottery Price money",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
        }
    ],
    isValidForm: true
};

const scheduleDaysForm: CreateLottery = {
    form:[
        {
            elementType:FormElementType.datePicker,
            value:"",
            id:"startTime",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Start Time",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[""],
            selectedTime: null,
            slectedDate: null
        },
        {
            elementType:FormElementType.datePicker,
            value:"",
            id:"endTime",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"End Time",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[""],
            selectedTime: null,
            slectedDate: null
        }
    ],
    isValidForm: true
}

const lotteryTicketPriceForm:CreateLottery =  {
    form:[
    {
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
        label:"Bronze Ticket Price",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
    },
    {
        elementType:FormElementType.input,
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
        label:"Silver Ticket Price",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
    },
    {
        elementType:FormElementType.input,
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
        label:"Gold Ticket Price",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
    },
    {
        elementType:FormElementType.input,
        value:"",
        id:"PlatinumTicketPrice",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.number,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Platinum Ticket Price",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
    },
],
isValidForm: false
}

const CreateLotteryForm = () => {
    const [lotteryMoneyFormValues, setLotteryMoneyForm] = useState<CreateLottery>(lotteryMoneyForm);
    const [lotteryTicketPriceValues, setLotteryTicketPriceValueForm] = useState<CreateLottery>(lotteryTicketPriceForm);
    const [scheduleFormValues, setScheduleFormValues] = useState<CreateLottery>(scheduleDaysForm);

    // lotteryMoneyForm starts

    const handleLotteryMoneyInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, lotteryMoneyFormValues.form);
        setLotteryMoneyForm({
            ...lotteryMoneyFormValues,
            form: updatedStateArray
        });
    }
    let lotteryMoneyFormView = 
    <FormBuilder formElements={lotteryMoneyFormValues.form} onInputChange = {handleLotteryMoneyInputChange} onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />
    // end lottery money form

    // lottery ticket price form

    const handleLotteryTicketPriceInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, lotteryTicketPriceValues.form);
        setLotteryTicketPriceValueForm({
            ...lotteryMoneyFormValues,
            form: updatedStateArray
        });
    }

    let lotteryTicketPriceFormView = 
    <FormBuilder formElements={lotteryTicketPriceValues.form} onInputChange = {handleLotteryTicketPriceInputChange} onSelectValueChange={() => {}} onChangeDate={() => {}} onChangeTime={() => {}}  />

    //  end lottery ticket price

    //  schedule days form

    const handleSheduleDaysformSelectInput = (value: string, name: string) => {
        let updatedArray = updateFormSelectState(value, name, scheduleFormValues.form);
        setScheduleFormValues({
            ...scheduleFormValues,
            form:updatedArray
        });
    }

    const handleScheduleDaysFormTimeInput = (date: Date, name: string) => {
        let updatedArray = updateFormTimeState(date, name, scheduleFormValues.form);
        setScheduleFormValues({
            ...scheduleFormValues,
            form:updatedArray
        });
        console.log("handleScheduleDaysFormTimeInput",date,name)
    };
    
    let scheduleDaysFormView = 
    <FormBuilder formElements={scheduleFormValues.form} 
    onInputChange = {handleLotteryTicketPriceInputChange} 
    onSelectValueChange={handleSheduleDaysformSelectInput} 
    onChangeDate={handleScheduleDaysFormTimeInput} onChangeTime={handleScheduleDaysFormTimeInput}  />

    // end schedule days form

    return(
        <CreateLotteryContainer>
            <CreateLotteryFirstSection>
            <form name={"lotteryMoney"}  autoComplete="off">
                <FormSectionContainer>
                    {lotteryMoneyFormView}
                </FormSectionContainer> 
            </form>
            <form name={"Customer Registration"} html-for={"customer resgistraion"} autoComplete="off">
                <FormSectionContainer>
                <SectionTitle>
                Scheduled days
                </SectionTitle>
                {scheduleDaysFormView}
                </FormSectionContainer>
        </form>
            </CreateLotteryFirstSection>
            <CreateLotterySecondSection>

            <form name={"lotteryTicketPrice"} html-for={"customer resgistraion"} autoComplete="off">
                <FormSectionContainer>
                    <LotteryTypeTitle>
                    Lottery Type
                    </LotteryTypeTitle>
                    <LotteryTypeValue>
                    One time lottery
                    </LotteryTypeValue>
                </FormSectionContainer>
            <FormSectionContainer>
                <SectionTitle>
                Lottery tickets Price
                </SectionTitle>
                {lotteryTicketPriceFormView}
                </FormSectionContainer>
            </form>
                </CreateLotterySecondSection>
        </CreateLotteryContainer>
    )
};

export default CreateLotteryForm