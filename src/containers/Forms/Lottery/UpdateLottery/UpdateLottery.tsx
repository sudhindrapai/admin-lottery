import {FC,useState, useRef} from 'react';
import Button from '../../../../components/UI/Button/Button';

import PurchaseTable from '../../../Tables/LotteryPurchaseList/PurchaseList'
import FormBuilder from '../../../FormBuilder/FormBuilder';
import {updateFormInputState, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../../Utility/InterFacesAndEnum';
import {FormSectionContainer,LotteryTypeTitle,LotteryTypeValue,CreateLotteryContainer, SectionTitle,UploadImageBtnSection, FormElementTitle, CreateLotteryFirstSection, CreateLotterySecondSection, TwoFormSection, FormView, Action} from '../CreateLottery/RepeatedLottery/StyledCreateLottery';
import {Line} from './StyledUpdateLottery';

interface CreateLottery {
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

const LotteryNameForm: CreateLottery = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"rewardGiftName",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Lottery Name",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null,
            disabled: false
    }],
    isValidForm: true
};

const lotterySettingsForm: CreateLottery = {
    form: [
        {
            elementType:FormElementType.input,
            value:"",
            id:"lotteryId",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Lottery Id",
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
            id:"lotteryReward",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Reward",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[""],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        }
    ],
    isValidForm: true
}

const ticketTypeForm:CreateLottery = {
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
            label:"Bronze",
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
            label:"Gold",
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
        }
    ],
    isValidForm: false
}

const subTicketForm:CreateLottery = {
    form:[
        {
            elementType:FormElementType.input,
            value:"",
            id:"bronzeSubTickets",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"No. of Sub Tickets",
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
            id:"silverSubTickets",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"No. of Sub Tickets",
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
            id:"goldSubTickets",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"No. of Sub Tickets",
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
            id:"platinumSubTickets",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"No. of Sub Tickets",
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

const lotteryMoneyForm: CreateLottery = {
    form:[
        {
            elementType:FormElementType.input,
            value:"",
            id:"rewardAmount",
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
            slectedDate: null,
            disabled: false
        }
    ],
    isValidForm: true
};

const scheduleDaysForm: CreateLottery = {
    form:[
        {
            elementType:FormElementType.datePicker,
            value:"",
            id:"lotteryStartDate",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Start Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[""],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.datePicker,
            value:"",
            id:"lotteryEndDate",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"End Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[""],
            selectedTime: null,
            slectedDate: null,
            disabled: false
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
        slectedDate: null,
        disabled: false
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
        slectedDate: null,
        disabled: false
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
        slectedDate: null,
        disabled: false
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
        slectedDate: null,
        disabled: false
    },
],
isValidForm: false
}

interface LotteryProps {
    onCreateLottery(obj:any):void,
    onCancel():void
}

const CreateLotteryForm:FC<LotteryProps> = (props) => {

    const {onCreateLottery,onCancel} = props;

    const uploadImageRef = useRef<HTMLInputElement>(null);

    const [lotteryName, setLotteryName] = useState<CreateLottery>(LotteryNameForm)
    const [lotterySettingForm, setLotterySettingForm] = useState<CreateLottery>(lotterySettingsForm);
    const [ticketsType, setTicketType] = useState<CreateLottery>(ticketTypeForm);
    const [subTicket, setSubTicket] = useState<CreateLottery>(subTicketForm);
    const [lotteryMoneyFormValues, setLotteryMoneyForm] = useState<CreateLottery>(lotteryMoneyForm);
    const [lotteryTicketPriceValues, setLotteryTicketPriceValueForm] = useState<CreateLottery>(lotteryTicketPriceForm);
    const [scheduleFormValues, setScheduleFormValues] = useState<CreateLottery>(scheduleDaysForm);
    const [selectedLotteryType, setLotteryType] = useState(3)

     // lottery name form start here
     const handleLotteryNameInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, lotteryName.form);
        setLotteryName({
            ...lotteryName,
            form: updatedStateArray
        });
    }
    let lotteryNameFormView = <FormBuilder formElements={lotteryName.form} 
    onInputChange = {handleLotteryNameInput} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;
    // end lottery name 

        // ticket type form starts here
        const handleTicketTypeInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
            let updatedStateArray = updateFormInputState(event, ticketsType.form);
            setTicketType({
                ...ticketsType,
                form: updatedStateArray
            });
        }
    
        const ticketTypeView = <FormBuilder formElements={ticketsType.form} 
        onInputChange = {handleTicketTypeInput} 
        onSelectValueChange={() => {}} 
        onChangeDate={() => {}} onChangeTime={() => {}} />;
    
        // end ticket type form 
    
        // sub tickets form starts
        const handleSubticketInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>) => {
            let updatedStateArray = updateFormInputState(event, subTicket.form);
            setSubTicket({
                ...subTicket,
                form: updatedStateArray
            });
        }
    
        const subTicketTypeView = <FormBuilder formElements={subTicket.form} 
        onInputChange = {handleSubticketInput} 
        onSelectValueChange={() => {}} 
        onChangeDate={() => {}} onChangeTime={() => {}} />;
        // end subtickets form 
    
    
        // lottery setting form stats
        // const updateSettingsFormState = (value:string, name:string) => {
        //     let updatedArray = updateFormSelectState(value, name, lotterySettingForm.form);
        //     setLotterySettingForm({
        //         ...lotterySettingForm,
        //         form:updatedArray
        //     });
        // };

        const updateSettingsFormState = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
            let updatedStateArray = updateFormInputState(event, lotterySettingForm.form);
            setLotterySettingForm({
                ...lotterySettingForm,
                form: updatedStateArray
            });
        }

        let lotterySettingFormView = <FormBuilder formElements={lotterySettingForm.form} 
        onInputChange = {updateSettingsFormState} 
        onSelectValueChange={() => {}} 
        onChangeDate={() => {}} onChangeTime={() => {}} />;
    
        // end lottery settings form

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
        let updatedArray = updateFormDate(date, name, scheduleFormValues.form);
        setScheduleFormValues({
            ...scheduleFormValues,
            form:updatedArray
        });
    };
    
    let scheduleDaysFormView = 
    <FormBuilder formElements={scheduleFormValues.form} 
    onInputChange = {handleLotteryTicketPriceInputChange} 
    onSelectValueChange={handleSheduleDaysformSelectInput} 
    onChangeDate={handleScheduleDaysFormTimeInput} onChangeTime={handleScheduleDaysFormTimeInput}  />

    // end schedule days form

    const createTicketHandler = () => {
        let completeObject = {
        };
        
        let completeFormArray = [
            ...LotteryNameForm.form,
            ...lotterySettingForm.form,
            ...ticketsType.form,
            ...subTicket.form,
            ...scheduleFormValues.form
        ]

        for (let formObj of completeFormArray) {
            if (formObj.id === "lotteryStartDate" || formObj.id === "lotteryEndDate") {
                completeObject[formObj.id] = new Date(formObj.value);
            } else {
                completeObject[formObj.id] = formObj.value;
            }
        }

        completeObject["rewardGiftDesc"] = "";
        completeObject["isRepeat"] = false;
        completeObject["isMemberLottery"] = false;

        console.log(completeObject);
        onCreateLottery(completeObject)
    };

    const redirectToLotteryList = () => {
        onCancel();
    };

    const triggerUploadImage = () => {
        uploadImageRef?.current?.click();
    };

    return(
        <CreateLotteryContainer>
            <CreateLotteryFirstSection>
            <form name={"lottery settings"} autoComplete={"off"} >
                    <FormSectionContainer>
                    <SectionTitle>
                    Lottery Details
                </SectionTitle>
                        {lotterySettingFormView}
                    </FormSectionContainer>
                </form>
                <form name={"Customer Registration"} html-for={"customer resgistraion"} autoComplete="off">
                <FormSectionContainer>
                <SectionTitle>
                Scheduled days
                </SectionTitle>
                {scheduleDaysFormView}
                </FormSectionContainer>
                <FormSectionContainer>
                <SectionTitle>
                Images
                </SectionTitle>
                <UploadImageBtnSection>
                    <input type={"file"} hidden={true} ref={uploadImageRef} />
                    <div onClick={triggerUploadImage} >Upload Image</div>
                </UploadImageBtnSection>
                </FormSectionContainer>
                <FormSectionContainer>
                <SectionTitle>
                    Purchases
                </SectionTitle>
                    <PurchaseTable />
                </FormSectionContainer>
        </form>
        <Action>
            <Button title={"Cancel"} 
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={redirectToLotteryList} />
            <Button title={"Create"} 
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={createTicketHandler} />
        </Action>
            </CreateLotteryFirstSection>
            <CreateLotterySecondSection>

            <form name={"lotteryTicketPrice"} html-for={"customer resgistraion"} autoComplete="off">
                <FormSectionContainer>
                    <LotteryTypeTitle>
                    Status
                    </LotteryTypeTitle>
                    <LotteryTypeValue>
                    One time lottery
                    </LotteryTypeValue>
                    <Line />
                    <LotteryTypeTitle>
                    One time/Repeat
                    </LotteryTypeTitle>
                    <LotteryTypeValue>
                    One time lottery
                    </LotteryTypeValue>
                    <Line />
                    <LotteryTypeTitle>
                    Type
                    </LotteryTypeTitle>
                    <LotteryTypeValue>
                    Regular lottery
                    </LotteryTypeValue>
                    <Line />
                    <LotteryTypeTitle>
                    Visibility
                    </LotteryTypeTitle>
                    <LotteryTypeValue>
                    Gold memberbs
                    </LotteryTypeValue>
                </FormSectionContainer>
                <FormSectionContainer>
                <SectionTitle>
                Lottery tickets Price
                </SectionTitle>
                <TwoFormSection>
                    <FormView>
                        {ticketTypeView}
                    </FormView>
                    <FormView>
                        {subTicketTypeView}
                    </FormView>
                </TwoFormSection>
                </FormSectionContainer>
            </form>
                </CreateLotterySecondSection>
        </CreateLotteryContainer>
    )
};

export default CreateLotteryForm