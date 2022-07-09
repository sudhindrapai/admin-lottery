import {FC, useState} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';

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

const auctionBasePriceState: FormState = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"auctionBasePrice",
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

    const [ticketDetail, setTicketDetail] = useState(TicketDetail);
    const [subticketDetails, setSubticketDetails] = useState(subTicketDetails);
    const [auctionBasePrice, setAuctionBasePrice] = useState(auctionBasePriceState);

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

    const updateTicketDetail = () => {};

    const updateAuctionBasePriceDetail = () => {}
 
    return <Wrapper>
        <Container>
            <BreadCrumbSection>
            <ViewHeader title={"Settings"} />
            </BreadCrumbSection>
        <Section>
            <SectionTitle>
                Lottery/Auction ticket details
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
            btnVariant={ButtonVariant.primaryFilled} clicked={updateTicketDetail} />
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
            btnVariant={ButtonVariant.primaryFilled} clicked={updateAuctionBasePriceDetail} />
            </AuctionView>
            </SectionBody>
        </Section>
        </Container>
    </Wrapper>
};

export default Settings