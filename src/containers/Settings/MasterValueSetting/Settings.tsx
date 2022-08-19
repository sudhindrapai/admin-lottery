import {FC, useState, useEffect} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';

import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getSettingsData, updateSettingsData} from '../../../features/settingsSlice'

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../Utility/InterFacesAndEnum';

import {Wrapper,Container,BreadCrumbSection,Section, SectionTitle, 
    SectionBody, TwoSectonView, FormBody, AuctionView} from './StyledSettings';

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

const TicketDetail: FormState = {
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
            slectedDate: null
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
        slectedDate: null
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
    slectedDate: null
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
    slectedDate: null
}],
    isValidForm: true
};

const subTicketDetails: FormState = {
    form:[{
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
            slectedDate: null
    }, 
    {elementType:FormElementType.input,
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
        slectedDate: null
},
{elementType:FormElementType.input,
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
    slectedDate: null
}, {elementType:FormElementType.input,
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
    slectedDate: null
}],
    isValidForm: true
};

const AuctionTicketDetails: FormState = {
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
            slectedDate: null
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
        slectedDate: null
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
    slectedDate: null
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
    slectedDate: null
}],
    isValidForm: true
};

const AuctionSubTicketDetails: FormState = {
    form:[{
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
            slectedDate: null
    }, 
    {elementType:FormElementType.input,
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
        slectedDate: null
},
{elementType:FormElementType.input,
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
    slectedDate: null
}, {elementType:FormElementType.input,
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
    slectedDate: null
}],
    isValidForm: true
};

const auctionBasePriceState: FormState = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"safetyDepositAmount",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Auction Base Pricr",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    }],
    isValidForm: true
}

const Settings:FC = () => {

    const dispatch = useDispatch();

    const [ticketDetail, setTicketDetail] = useState(TicketDetail);
    const [subticketDetails, setSubticketDetails] = useState(subTicketDetails);
    const [auctionTicketDetails, setAuctioTicketDetails] = useState(AuctionTicketDetails);
    const [auctionSubTicketDetails, setAuctionSubTicketDetails] = useState(AuctionSubTicketDetails);
    const [auctionBasePrice, setAuctionBasePrice] = useState(auctionBasePriceState);

    const settingsData = useSelector((state:RootState) => state.settings.data);

    useEffect(() => {
        dispatch(getSettingsData());
    }, []);

    useEffect(() => {
        if (settingsData.length > 0) {
            setSettingsData();
        }
    },[settingsData]);


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

        let updatedSubticketDetail = subticketDetails.form.map((ticketObj) => {
            return {
                ...ticketObj,
                value: lotteryData[ticketObj.id]
            }
        });

        let updatedAuctionTicketDetails = auctionTicketDetails.form.map((ticketObj) => {
            return {
                ...ticketObj,
                value: auctionData[ticketObj.id]
            }
        });
        
        let updatedAuctionSubTicketDetails = auctionSubTicketDetails.form.map((ticketObj) => {
            return {
                ...ticketObj,
                value: auctionData[ticketObj.id]
            }
        });

        // auctionBasePrice setAuctionBasePrice
        let updatedAuctionBasePrice = auctionBasePrice.form.map((ticketObj) => {
            return {
                ...ticketObj,
                value: auctionData[ticketObj.id]
            }
        });

        setAuctionBasePrice({
            ...auctionBasePrice,
            form:updatedAuctionBasePrice
        })

    setAuctioTicketDetails({
        ...auctionTicketDetails,
        form:updatedAuctionTicketDetails
    });

    setAuctionSubTicketDetails({
        ...auctionSubTicketDetails,
        form: updatedAuctionSubTicketDetails
    })

        setSubticketDetails({
            ...subticketDetails,
            form:updatedSubticketDetail
        });

        setTicketDetail({
            ...ticketDetail,
            form:updatedSettings
        });

    }

    //  ---------- auction ticket details -----------

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

    const handleAuctionSubTicketDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, subticketDetails.form);
        setSubticketDetails({
            ...subticketDetails,
            form: updatedStateArray
        });
    }

    const auctionSubTicketDetalView = <FormBuilder formElements={subticketDetails.form} 
    onInputChange = {handleAuctionSubTicketDetails} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;

    //  ---------- end auction ticket details -------

        //  ------------- ticket details -----------

        const handleTicketDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
            let updatedStateArray = updateFormInputState(event, ticketDetail.form);
            setTicketDetail({
                ...ticketDetail,
                form: updatedStateArray
            });
        }
    
        const ticketDetalView = <FormBuilder formElements={ticketDetail.form} 
        onInputChange = {handleTicketDetails} 
        onSelectValueChange={() => {}} 
        onChangeDate={() => {}} onChangeTime={() => {}} />;
        // ------------- end ticket details --------

         //  ---------- subticket details --------
    const handleSubTicketDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, subticketDetails.form);
        setSubticketDetails({
            ...subticketDetails,
            form: updatedStateArray
        });
    }

    const subTicketDetalView = <FormBuilder formElements={subticketDetails.form} 
    onInputChange = {handleSubTicketDetails} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;
    //  ---------- end subticket details --------

    // ---------- auction base price -----------

    const handleAuctionBasePriceDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, auctionBasePrice.form);
        setAuctionBasePrice({
            ...auctionBasePrice,
            form: updatedStateArray
        });
    }

    const auctionBasePriceView = <FormBuilder formElements={auctionBasePrice.form} 
    onInputChange = {handleAuctionBasePriceDetails} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;

    // --------- end auction base price -------

    const updateTicketDetail = (isFromLottery:boolean) => {
        let payload:any = {

        }
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
        if (isFromLottery) {
            payload = {
                ...lotteryData,
                ...createRequestObj(ticketDetail.form),
                ...createRequestObj(subticketDetails.form),
            }
        } else {
            payload = {
                ...auctionData,
                ...createRequestObj(auctionTicketDetails.form),
                ...createRequestObj(auctionSubTicketDetails.form),
            }
        }
        dispatch(updateSettingsData(payload))
    };

    const createRequestObj = (elementsArray:any) => {
        let updatedObj:any = {};
        for (let element of  elementsArray) {
            updatedObj[element.id] = parseInt(element.value)
        }
        return updatedObj;
    }

    const updateAuctionBasePriceDetail = () => {
        let payload:any = {

        }
        let auctionData = {};
        for (let settingsObj of settingsData) {
            if (settingsObj.settingFor === "AUCTION") {
                auctionData = settingsObj;
            }
        }
        payload = {
            ...auctionData,
            ...createRequestObj(auctionBasePrice.form),
        }
        dispatch(updateSettingsData(payload))
    }
 
    return <Wrapper>
        <Container>
            <BreadCrumbSection>
            <ViewHeader title={"Settings"} />
            </BreadCrumbSection>
        <Section>
            <SectionTitle>
                Lottery ticket details
            </SectionTitle>
            <SectionBody>
                <FormBody>
            <TwoSectonView>
                {ticketDetalView}
                </TwoSectonView>
                <TwoSectonView>
                    {subTicketDetalView}
                </TwoSectonView>
                </FormBody>
                <AuctionView>
                <Button
                title={"Save"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={() => {updateTicketDetail(true)}} />
            </AuctionView>
            </SectionBody>
        </Section>
        <Section>
            <SectionTitle>
                Auction ticket details
            </SectionTitle>
            <SectionBody>
                <FormBody>
            <TwoSectonView>
                {auctionTicketDetalView}
                </TwoSectonView>
                <TwoSectonView>
                    {auctionSubTicketDetalView}
                </TwoSectonView>
                </FormBody>
                <AuctionView>
                <Button
                title={"Save"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={() => {updateTicketDetail(false)}} />
            </AuctionView>
            </SectionBody>
        </Section>
        <Section>
            <SectionTitle>
                Auction listing minimum price
            </SectionTitle>
            <SectionBody>
                {auctionBasePriceView}
                <AuctionView>
                <Button
                title={"Save"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={() => {updateAuctionBasePriceDetail()}} />
            </AuctionView>
            </SectionBody>
        </Section>
        </Container>
    </Wrapper>
};

export default Settings