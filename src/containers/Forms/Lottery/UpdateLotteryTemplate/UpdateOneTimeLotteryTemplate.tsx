import {FC,useState, useRef, useEffect} from 'react';
import Button from '../../../../components/UI/Button/Button';

import ImageUploader from '../../../../components/ImageUploader/ImageUploader';
import FormBuilder from '../../../FormBuilder/FormBuilder';
import {updateFormInputState, validateForm, updateFormSelectState, transformGMTToUTC, updateFormDate} from '../../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../../Utility/InterFacesAndEnum';
import {WeekNames, FormSectionContainer,LotteryTypeTitle,LotteryTypeValue,CreateLotteryContainer, SectionTitle,UploadImageBtnSection, FormElementTitle, CreateLotteryFirstSection, CreateLotterySecondSection, TwoFormSection, FormView, Action} from '../CreateLottery/RepeatedLottery/StyledCreateLottery';

import {useSelector, useDispatch} from 'react-redux';
import {setUpdateImgDetails} from '../../../../features/imageUploaderSlice';
import {RootState} from '../../../../app/Store';

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
            id:"rewardType",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
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
            elementType:FormElementType.input,
            value:"",
            id:"lotterySettingVisibility",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
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
    onCancel():void,
    templateDetail:any
}

const CreateLotteryForm:FC<LotteryProps> = (props) => {

    const {onCreateLottery,onCancel, templateDetail} = props;

    const dispatch = useDispatch();

    const uploadImageRef = useRef<HTMLInputElement>(null);

    const [lotteryName, setLotteryName] = useState<CreateLottery>(LotteryNameForm)
    const [lotterySettingForm, setLotterySettingForm] = useState<CreateLottery>(lotterySettingsForm);
    const [ticketsType, setTicketType] = useState<CreateLottery>(ticketTypeForm);
    const [subTicket, setSubTicket] = useState<CreateLottery>(subTicketForm);
    const [lotteryMoneyFormValues, setLotteryMoneyForm] = useState<CreateLottery>(lotteryMoneyForm);
    const [lotteryTicketPriceValues, setLotteryTicketPriceValueForm] = useState<CreateLottery>(lotteryTicketPriceForm);
    const [scheduleFormValues, setScheduleFormValues] = useState<CreateLottery>(scheduleDaysForm);
    const [selectedLotteryType, setLotteryType] = useState(3);


    const imgList = useSelector((state:RootState) => state.images.imageNames);
    
    useEffect(() => {

        if (Object.keys(templateDetail).length > 0) {
            let ticketType = templateDetail.rewardType === "M" ? "Money Lottery": "Gift Lottery";
            let Visibility = templateDetail.isMemberLottery ?  "Gold Members" : "All Members";
            let lotteryPriceMoney = templateDetail.rewardAmount;
            let startDate = templateDetail.lotteryStartDate;
            let endDate = templateDetail.lotteryEndDate;
            let bronzePrice = templateDetail.bronzeTicketPrice;
            let bronzeSubTickets = templateDetail.bronzeSubTickets;
            let silverPrice = templateDetail.silverTicketPrice;
            let silverSubTickets = templateDetail.silverSubTickets;
            let goldPrice = templateDetail.goldTicketPrice;
            let goldTickets = templateDetail.goldSubTickets;
            let platinumPrice = templateDetail.platinumTicketPrice;
            let platinumtickets = templateDetail.platinumSubTickets;
            let giftName = templateDetail.rewardGiftName;
            let lotteryStartTime = templateDetail.lotteryStartTime;
            let lotteryEndTime = templateDetail.lotteryEndTime;
            let images = templateDetail.rewardImages ? templateDetail.rewardImages : [];

            let imageNames:any = [];
            for (let imageString of images) {
                if (imageString !== undefined && imageString !== null && imageString.length > 0) {
                    let imageArray = imageString.split("/");
                    let imageNameCount = (imageArray.length)-1;
                    let imageName = imageArray[imageNameCount];
                    imageNames.push(imageName)
                }
            }

            dispatch(setUpdateImgDetails({
                images:images,
                imageNames:imageNames
            }))

            if (ticketType === "Money Lottery") {
                setLotteryType(1);
            } else {
                setLotteryType(2);
            }

                let updatedForm = lotterySettingForm.form.map((lotteryObj) => {
                    return {
                        ...lotteryObj,
                        value: lotteryObj.id === "rewardType" ? ticketType : lotteryObj.id === "lotterySettingVisibility"? Visibility : lotteryObj.value
                    }
                });
                setLotterySettingForm({
                    ...lotterySettingForm,
                    form:updatedForm
                });
            
                let updatedMoneyForm = lotteryMoneyFormValues.form.map((moneyFormObj) => {
                    return {
                        ...moneyFormObj,
                        value: lotteryPriceMoney
                    }
                });
                setLotteryMoneyForm({
                    ...lotteryMoneyFormValues,
                    form: updatedMoneyForm
                });

                let startDateArray = startDate.split("-");
                let startTimeArray = lotteryStartTime.split(":");
                let updatedStartDate:any = new Date().setFullYear(startDateArray[0],startDateArray[1]-1,startDateArray[2])
                updatedStartDate = new Date(updatedStartDate).setHours(startTimeArray[0],startTimeArray[1],startTimeArray[2])
                
                let endDateArray = endDate.split("-");
                let endTimeArray = lotteryEndTime.split(":")
                let updatedEndDate:any = new Date().setFullYear(endDateArray[0],endDateArray[1]-1,endDateArray[2])
                updatedEndDate = new Date(updatedEndDate).setHours(endTimeArray[0],endTimeArray[1],endTimeArray[2]);

                let updatedScheduleForm = scheduleFormValues.form.map((scheduleObj) => {

                    return{
                        ...scheduleObj,
                        value: scheduleObj.id === "lotteryStartDate" ? 
                        new Date(updatedStartDate) : scheduleObj.id === "lotteryEndDate" ? (updatedEndDate) : scheduleObj.slectedDate
                    }
                });
                
                setScheduleFormValues({
                    ...scheduleFormValues,
                    form: updatedScheduleForm
                });

                let updatedTicketPriceForm = ticketsType.form.map((ticketValueObj) => {
                    return {
                        ...ticketValueObj,
                        value:ticketValueObj.id === "bronzeTicketPrice" ? bronzePrice :
                        ticketValueObj.id === "silverTicketPrice" ? silverPrice :
                        ticketValueObj.id === "goldTicketPrice" ? goldPrice :
                        ticketValueObj.id === "platinumTicketPrice" ? platinumPrice : ticketValueObj.value
                    }
                });

                setTicketType({
                    ...ticketsType,
                    form: updatedTicketPriceForm
                });

                let updatedSubticketForm = subTicket.form.map((subticketObj) => {
                    return{
                        ...subticketObj,
                        value: subticketObj.id === "bronzeSubTickets" ? bronzeSubTickets :
                        subticketObj.id === "silverSubTickets" ? silverSubTickets :
                        subticketObj.id === "goldSubTickets" ? goldTickets : 
                        subticketObj.id === "platinumSubTickets" ? platinumtickets: subticketObj.value
                        
                    }
                });

                setSubTicket({
                    ...subTicket,
                    form: updatedSubticketForm
                });

                let updatedLotteryNameForm = lotteryName.form.map((nameObj) => {
                    return {
                        ...nameObj,
                        value: giftName
                    }
                });
                setLotteryName({
                    ...lotteryName,
                    form:updatedLotteryNameForm
                })
        }
    },[]);

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
        let completeObject:any = {};
        
        let completeFormArray = [
            ...lotteryName.form,
            ...lotterySettingForm.form,
            ...ticketsType.form,
            ...subTicket.form,
            ...scheduleFormValues.form,
            ...lotteryMoneyFormValues.form
        ]

        for (let formObj of completeFormArray) {
            if (formObj.id === "lotteryStartDate" || formObj.id === "lotteryEndDate") {
                console.log(new Date(transformGMTToUTC(formObj.value)),"formObj")
                completeObject[formObj.id] = (transformGMTToUTC(formObj.value));
            } else {
                completeObject[formObj.id] = formObj.value;
            }
        
            if (formObj.id === "rewardType") {
                completeObject[formObj.id] = completeObject[formObj.id] === "Money Lottery" ? "M" : "G"
            }
            
        }


        completeObject["rewardGiftDesc"] = "";
        completeObject["isRepeat"] = false;
        completeObject["isMemberLottery"] = false;
        completeObject["lotteryId"] = templateDetail.lotteryId;
        completeObject["lotteryEndTime"] = templateDetail.lotteryEndTime;
        completeObject["lotteryStartTime"] = templateDetail.lotteryStartTime;
        completeObject["rewardImages"] = imgList;

        onCreateLottery(completeObject)
    };

    const redirectToLotteryList = () => {
        onCancel();
    };

    const triggerUploadImage = () => {
        uploadImageRef?.current?.click();
    };

    const uploadImage = (event) => {
        console.log(event.target.files[0]);
    } 

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
            {selectedLotteryType === 1 && <form name={"lotteryMoney"}  autoComplete="off">
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
            {/* <FormSectionContainer> */}
                {/* <SectionTitle>
                Images
                </SectionTitle>
                <UploadImageBtnSection>
                    <input type={"file"} hidden={true} onChange={(event) => {uploadImage(event)}} ref={uploadImageRef} />
                    <div onClick={triggerUploadImage} >Upload Image</div>
                </UploadImageBtnSection> */}
                <ImageUploader />
                {/* </FormSectionContainer> */}
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
            <Button title={"Update"} 
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
                    One time lottery
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