import {FC,useState, useRef, useEffect} from 'react';
import Button from '../../../../../components/UI/Button/Button';
import ImageUploader from '../../../../../components/ImageUploader/ImageUploader';
import FormBuilder from './../../../../FormBuilder/FormBuilder';
import {RootState} from '../../../../../app/Store'
import {useSelector} from 'react-redux'
import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate, transformGMTToUTC} from '../../../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../../../Utility/InterFacesAndEnum';
import {WeekNames, FormSectionContainer,LotteryTypeTitle,LotteryTypeValue,
    CreateLotteryContainer, SectionTitle, FormElementTitle, 
    CreateLotteryFirstSection, CreateLotterySecondSection, TwoFormSection, FormView, Action, UploadImageBtnSection} from './StyledCreateLottery';

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

export const LotteryNameForm: CreateLottery = {
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
            elementType:FormElementType.select,
            value:"",
            id:"rewardType",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Type",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["Money Lottery", "Gift Lottery"],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.select,
            value:"",
            id:"lotterySettingVisibility",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Visibility",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["All Members", "Gold Members"],
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
            elementType:FormElementType.select,
            value:"Weekly",
            id:"repeatType",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Repeat Type",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["Weekly"],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.datePicker,
            value:"",
            id:"lotteryStartTime",
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
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.datePicker,
            value:"",
            id:"lotteryEndTime",
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
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.select,
            value:"Sunday",
            id:"lotteryStartDay",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Lottery Start Day",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"],
            selectedTime: null,
            slectedDate: null,
            disabled: false
        },
        {
            elementType:FormElementType.select,
            value:"Sunday",
            id:"lotteryEndDay",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Lottery End Day",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"],
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

class RepeatLotteryWeeObj {
    constructor(public label: string, public id: string, public isSelected: boolean, public isStartDay: boolean, public isEndDay:boolean){}
}

interface LotteryProps {
    onCreateLottery(obj:any):void,
    onCancel():void,
    ticketObj:any
}

const CreateLotteryForm:FC<LotteryProps> = (props) => {

    const {onCreateLottery, onCancel, ticketObj} = props;

    const uploadImageRef = useRef<HTMLInputElement>(null);

    const [lotteryName, setLotteryName] = useState<CreateLottery>(LotteryNameForm);
    const [lotterySettingForm, setLotterySettingForm] = useState<CreateLottery>(lotterySettingsForm);
    const [ticketsType, setTicketType] = useState<CreateLottery>(ticketTypeForm);
    const [subTicket, setSubTicket] = useState<CreateLottery>(subTicketForm);
    const [lotteryMoneyFormValues, setLotteryMoneyForm] = useState<CreateLottery>(lotteryMoneyForm);
    const [lotteryTicketPriceValues, setLotteryTicketPriceValueForm] = useState<CreateLottery>(lotteryTicketPriceForm);
    const [scheduleFormValues, setScheduleFormValues] = useState<CreateLottery>(scheduleDaysForm);
    const [selectedLotteryType, setLotteryType] = useState(3);
    const [weeks, setRepeatWeek] = useState([
        new RepeatLotteryWeeObj("Sunday", "Sunday_1", false, false, false),
        new RepeatLotteryWeeObj("Monda", "monday_2", false, false, false),
        new RepeatLotteryWeeObj("Tuesday","tuesday_3",false, false, false),
        new RepeatLotteryWeeObj("Wednesday","wednesday_4",false, false, false),
        new RepeatLotteryWeeObj("Thursday", "thursday_5", false, false, false),
        new RepeatLotteryWeeObj("Friday","friday_6",false, false, false),
        new RepeatLotteryWeeObj("Saturday", "saturday_7",false, false, false)
    ]);

    const imagesList = useSelector((state:RootState) => state.images.images);

    useEffect(() => {
        if (ticketObj && ticketObj.length > 0) {
        let ticket = ticketObj[0];
        let updatedTicketType = ticketsType.form.map((ticketTypeObj) => {
            return{
                ...ticketTypeObj,
                value: ticket[ticketTypeObj.id]
            }
        });

        let updatedSubTicketType = subTicket.form.map((subTicketObj) => {
            return{
                ...subTicketObj,
                value: ticket[subTicketObj.id]
            }
        });

        setSubTicket({
            ...subTicket,
            form:updatedSubTicketType
        })

        setTicketType({
            ...ticketsType,
            form:updatedTicketType
        });
    }
    },[ticketObj]);

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
    const updateSettingsFormState = (value:string, name:string) => {
        let updatedArray = updateFormSelectState(value, name, lotterySettingForm.form);
        if (value === "Money Lottery") {
            setLotteryType(1);
        } else if (value === "Gift Lottery") {
            setLotteryType(2);
        }
        setLotterySettingForm({
            ...lotterySettingForm,
            form:updatedArray
        });
    };
    let lotterySettingFormView = <FormBuilder formElements={lotterySettingForm.form} 
    onInputChange = {() => {}} 
    onSelectValueChange={updateSettingsFormState} 
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

    const handleScheduleDaysTimeInput = (date: Date, name: string) => {
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
    onChangeDate={handleScheduleDaysTimeInput} onChangeTime={() => {}}  />

    // end schedule days form

    const toggleWeekNameChage = (id:string) => {
        let isStartDaySelected:any = weeks.filter((weekObj) => {
            return weekObj.isStartDay;
        });
        isStartDaySelected = isStartDaySelected.length > 0;

        let isEndDaySelected:any = weeks.filter((weekObj) => {
            return weekObj.isEndDay;
        });
        isStartDaySelected = isEndDaySelected.length > 0;

        let updatedWeeks = weeks.map((weekObj) => {
            return {
                ...weekObj,
                isSelected: weekObj.id === id ? !(weekObj.isSelected) : weekObj.isSelected ,
                isStartDay: isStartDaySelected ? weekObj.isStartDay : weekObj.id === id ? true : false,
                isEndDay: isEndDaySelected ? weekObj.isEndDay : weekObj.id == id ? true : false
            }
        });
        setRepeatWeek(updatedWeeks);
    }

    let weeksView = weeks.map((weekObj) => {
        const {label, id, isSelected} = weekObj;
        return <WeekNames key={id} isSelected={isSelected} onClick={() => {toggleWeekNameChage(id)}} >{label}</WeekNames>
    });

    const createTicketHandler = () => {

        let completeObject = {
        };

        let completeFormArray = [
            ...LotteryNameForm.form,
            ...lotterySettingForm.form,
            ...ticketsType.form,
            ...subTicket.form,
            ...scheduleDaysForm.form,
            ...lotteryMoneyForm.form
        ];

        for (let formObj of completeFormArray) {
            completeObject[formObj.id] = formObj.value;
        }

        completeObject["rewardGiftDesc"] = "";
        completeObject["isRepeat"] = true;
        completeObject["isMemberLottery"] = false;
    
        for (let objKey in completeObject) {
            if (objKey === "lotteryEndTime" || objKey === "lotteryStartTime") {
                if (completeObject[objKey] === "") {
                    completeObject[objKey] = "";
                } else {
                    completeObject[objKey] = new Date(transformGMTToUTC(completeObject[objKey]));
                }
            }
            if (objKey === "rewardType") {
                completeObject[objKey] = completeObject[objKey] === "Money Lottery" ? "M" : "G"
            }
        }

        completeObject["rewardImages"] = imagesList;
        
        onCreateLottery(completeObject);
    };

    const redirectToLotteryList = () => {
        onCancel();
    };

    return(
        <CreateLotteryContainer>
            <CreateLotteryFirstSection>
                <form name={"lottery settings"} autoComplete={"off"} >
                    <FormSectionContainer>
                    <SectionTitle>
                    Lottery settings
                </SectionTitle>
                        {lotterySettingFormView}
                    </FormSectionContainer>
                </form>
            {selectedLotteryType === 1 &&<form name={"lotteryMoney"}  autoComplete="off">
                <FormSectionContainer>
                    {lotteryMoneyFormView}
                </FormSectionContainer> 
            </form>}
            {selectedLotteryType === 2 && <form>
                <FormSectionContainer>
                    {lotteryNameFormView}
                </FormSectionContainer>
            </form>}
            {selectedLotteryType === 2 && <form>
            <ImageUploader />
            </form>}
            {selectedLotteryType != 3 && <form name={"Customer Registration"} html-for={"customer resgistraion"} autoComplete="off">
                <FormSectionContainer>
                <SectionTitle>
                Scheduled days
                </SectionTitle>
                {scheduleDaysFormView}
                </FormSectionContainer>
        </form>}
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
                    Lottery Type
                    </LotteryTypeTitle>
                    <LotteryTypeValue>
                    Repeated lottery
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