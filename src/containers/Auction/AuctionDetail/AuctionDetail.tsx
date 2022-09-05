import {FC, Fragment, useState, useEffect} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import CountdownTimer from '../../../components/CountdownTimer/CountdownTimer';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TablFooter from '../../../components/TableFooter/TableFooter';

import ImageUploader from '../../../components/ImageUploader/ImageUploader'
import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../Utility/InterFacesAndEnum';

import {adminRouts} from '../../../routs';
import {getAuctionDetailById, deleteAuction, toggleAuctionDeletionState,updateAuction} from '../../../features/auctionList';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';

import {CreateLotteryFirstSection, CreateLotterySecondSection} from '../../Forms/Lottery/CreateLottery/RepeatedLottery/StyledCreateLottery';
import {HeaderView,FormContainer, FormWrapper, FormBody, TwoSections, ActionBtn} from '../CreateAuction/StyledCreateAuction';
import {StatusContainer, StatusBody, StatusTitle,SectionTitle, Value, TwoSection, CheckboxContainer, CheckboxDesc, Table, EmptyTableBody} from './StyledAuctionDetail';
import { RootState } from '../../../app/Store';
import {SelectedCheckbox, EmptyCheckbox} from './StyledAuctionDetail';

class TableHeader{
    constructor(public label:string, public isSortRequired: boolean, public isAscSorted: boolean, public isDscSorted:boolean, public id: string){}
}

let winnerDetailTableHeaders = [
    new TableHeader("Users", false, true, false, 'users'),
    new TableHeader("Purchase Date", false, false, false, 'purchaseDate'),
    new TableHeader("Ticket type", false, false, false, 'ticketType'),
    new TableHeader("No Of Tickets", false, false, false, 'noOfTickets'),
    new TableHeader("Total amount", false, false, false, 'totalAmount')
];

let purchaseDetailTableHeaders = [
    new TableHeader("Users", true, true, false, 'users'),
    new TableHeader("Purchase Date", true, false, false, 'purchaseDate'),
    new TableHeader("Ticket type", false, false, false, 'ticketType'),
    new TableHeader("No Of Tickets", false, false, false, 'noOfTickets'),
    new TableHeader("Total amount", true, false, false, 'totalAmount')
];


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
    {elementType:FormElementType.input,
        value:"",
        id:"auctionTitle",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Title",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"auctionDesc",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.text,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Description (Optional)",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"auctionPrice",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.number,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Auction Price",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"auctionProposedPrice",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.number,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Proposed Price",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
}],
    isValidForm: true
};

const ScheduleDays: FormState = {
    form:[{
        elementType:FormElementType.datePicker,
            value:"",
            id:"auctionStartDate",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.date,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Start Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    }, 
    {elementType:FormElementType.datePicker,
        value:"",
        id:"auctionEndDate",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: false,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.date,
        customValidationType: customValidationType.null,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"End Date",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
}],
    isValidForm: true
}

const AddressDetails: FormState = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"address",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Location",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    }, 
    {elementType:FormElementType.input,
        value:"",
        id:"city",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"city",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
},
    {elementType:FormElementType.input,
        value:"",
        id:"state",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"State",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"country",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.text,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Country",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
}, {elementType:FormElementType.input,
    value:"",
    id:"pincode",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.text,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Pin/Zip code",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
}],
    isValidForm: true
};

const UserDetails: FormState = {
    form:[{
        elementType:FormElementType.input,
            value:"",
            id:"userName",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Name",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    }, 
    {elementType:FormElementType.input,
        value:"",
        id:"userMobile",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.number,
        customValidationType: customValidationType.mobileValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Mobile Number",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"userEmailId",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.email,
    customValidationType: customValidationType.emailValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Email",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
}],
    isValidForm: true
};

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

const productDetails: FormState = {
    form:[{
        elementType:FormElementType.select,
            value:"select",
            id:"productType",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.number,
            customValidationType: customValidationType.characterValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Type",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["select", "Vehicle"],
            selectedTime: null,
            slectedDate: null
    }, 
    {elementType:FormElementType.select,
        value:"select",
        id:"productCategory",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: false,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.number,
        customValidationType: customValidationType.characterValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Category",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:["select", "car"],
        selectedTime: null,
        slectedDate: null
}],
    isValidForm: true
};

const CreateAuction:FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auctionId} = useParams();

    const [auctionDetail, setauctoinDetail] = useState<FormState>(AuctionDetail);
    const [scheduleDetail, setScheduleDetail] = useState<FormState>(ScheduleDays);
    const [addressDetail, setAddressDetail] = useState<FormState>(AddressDetails);
    const [userDetail, setUserDetail] = useState<FormState>(UserDetails);
    const [ticketdetail, setTicketDetail] = useState<FormState>(TicketDetail);
    const [subTicketDetail, setSubTicketDetail] = useState<FormState>(subTicketDetails);
    const [productDetail, setProductDetails] = useState<FormState>(productDetails);
    const [isForGoldMembers, setStatus] = useState<boolean>(false);
    const [tableHeaderValues, setTableHeader] = useState(winnerDetailTableHeaders);
    const [purchaseTableHeaders, setPurchaseTableHeaders] = useState(purchaseDetailTableHeaders);

    const detailResponse = useSelector((state:RootState) => state.auction.auctionDetail);
    const isAuctionDeleted = useSelector((state:RootState) => state.auction.isAuctionDeleted);

    useEffect(() => {
        dispatch(getAuctionDetailById(auctionId?auctionId:""))
    },[]);

    useEffect(() => {
        if (isAuctionDeleted === true) {
            navigate(adminRouts.auctionList);
        }
        return () => {
            dispatch(toggleAuctionDeletionState({
                isDeleted:false
            }))
        }
    },[])

    useEffect(() => {
        // if (Object.keys(detailResponse).length > 0) {
            let updatedForms = mapAuctionResponse(auctionDetail.form);
            setauctoinDetail({...auctionDetail, form:updatedForms});

            let updatedScheduleForm = mapAuctionResponse(scheduleDetail.form);
            setScheduleDetail({
                ...scheduleDetail,
                form: updatedScheduleForm
            })

            let updatedAddressForm = mapAuctionResponse(addressDetail.form);
            setAddressDetail({...addressDetail, form: updatedAddressForm});

            let userDetailForm = mapAuctionResponse(userDetail.form);
            setUserDetail({
                ...userDetail,
                form: userDetailForm
            });

            let productTypeForm = mapAuctionResponse(productDetail.form);
            setProductDetails({
                ...productDetail,
                form: productTypeForm
            });

            let ticketsDetailForm = mapAuctionResponse(ticketdetail.form);
            setTicketDetail({
                ...ticketdetail,
                form:ticketsDetailForm
            });

            let subTickets = mapAuctionResponse(subTicketDetail.form);
            setSubTicketDetail({
                ...subTicketDetail,
                form: subTickets
            });

            setStatus(detailResponse.isMemberAuction);

            // console.log(updatedAddressForm,'addressDetail')
        // }
    },[detailResponse]);

    const mapAuctionResponse = (formElements:FormElement[]) => {
        let updatedFormElement = formElements.map((element) => {
            let updatedElement = {
                ...element
            }
            // if (element.elementType === "datePicker") {
                updatedElement["value"] = detailResponse[element.id];
            // }
            
            return updatedElement;
        });
        return updatedFormElement;
    }

    // ---------- auction detail form ------

    const handleAuctionDetailInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, auctionDetail.form);
        setauctoinDetail({
            ...auctionDetail,
            form: updatedStateArray
        });
    }

    const auctionDetailView = <FormBuilder formElements={auctionDetail.form} 
    onInputChange = {handleAuctionDetailInput} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;

    // ---------- end auction detail --------

    //  ---------- schedule days -------------
    const handleScheduleDaysTimeInput = (date: Date, name: string) => {
        let updatedArray = updateFormDate(date, name, scheduleDetail.form);
        console.log(updatedArray,"updatedArray")
        setScheduleDetail({
            ...scheduleDetail,
            form: updatedArray
        });
    };

    const scheduleDaysView = <FormBuilder formElements={scheduleDetail.form} 
    onInputChange = {()=>{}} 
    onSelectValueChange={() => {}} 
    onChangeDate={handleScheduleDaysTimeInput} onChangeTime={() => {}} />;

    //  ---------- end schedule days ----------

    //  --------- address details ------------
    const handleAddressState = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, addressDetail.form);
        setAddressDetail({
            ...addressDetail,
            form: updatedStateArray
        });
    }

    const addressDetailView = <FormBuilder formElements={addressDetail.form} 
    onInputChange = {handleAddressState} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;

    // --------- end address details ---------

    //  -------------- user detals -------
    const handleUserDeailState = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, userDetail.form);
        setUserDetail({
            ...userDetail,
            form: updatedStateArray
        });
    }

    const useDetailView = <FormBuilder formElements={userDetail.form} 
    onInputChange = {handleUserDeailState} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;
    //  -------------- end user details --------

    //  ------------- ticket details -----------

    const handleTicketDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, ticketdetail.form);
        setTicketDetail({
            ...ticketdetail,
            form: updatedStateArray
        });
    }

    const ticketDetalView = <FormBuilder formElements={ticketdetail.form} 
    onInputChange = {handleTicketDetails} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;
    // ------------- end ticket details --------

    //  ---------- subticket details --------
    const handleSubTicketDetails = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, subTicketDetail.form);
        setSubTicketDetail({
            ...subTicketDetail,
            form: updatedStateArray
        });
    }

    const subTicketDetalView = <FormBuilder formElements={subTicketDetail.form} 
    onInputChange = {handleSubTicketDetails} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;
    //  ---------- end subticket details --------

    // --------- product details ----------
    const handleProductDetails = (value: string, name: string) => {
        let updatedArray = updateFormSelectState(value, name, productDetail.form);
        setProductDetails({
            ...productDetail,
            form:updatedArray
        });
    }
    const productDetailView = <FormBuilder formElements={productDetail.form} 
    onInputChange = {() => {}} 
    onSelectValueChange={handleProductDetails} 
    onChangeDate={() => {}} onChangeTime={() => {}} />;
    // --------- set product details ------


    const deleteAuctionDetails = () => {
        dispatch(deleteAuction(`auctionId=${auctionId}`));
    }

    const validateForm = () => {
    let tempObj = [
        ...auctionDetail.form,
        ...scheduleDetail.form,
        ...addressDetail.form,
        ...userDetail.form,
        ...ticketdetail.form,
        ...subTicketDetail.form,
        ...productDetail.form
    ]
    let requestObj = {};
    for (let element of tempObj) {
        requestObj[element.id] = element.value;
    }
    requestObj["auctionType"] = detailResponse.auctionType;
    requestObj["auctionId"] = detailResponse.auctionId
    dispatch(updateAuction(requestObj));
    };

    return <Fragment>
        <HeaderView>
        <ViewHeader title={"Create Auction"} isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.auctionList} />
        </HeaderView>
        <FormContainer>
            <CreateLotteryFirstSection>
                <FormWrapper>
                    <SectionTitle>
                        Auction Detail
                    </SectionTitle>
                    <FormBody>
                        {auctionDetailView}
                        <CheckboxContainer onClick={() => {setStatus(!isForGoldMembers)}} >
                            {isForGoldMembers ? <SelectedCheckbox /> : <EmptyCheckbox />}
                            <CheckboxDesc>
                                For Gold members
                            </CheckboxDesc>
                        </CheckboxContainer>
                    </FormBody>
                </FormWrapper>
                <FormWrapper>
                    <SectionTitle>
                        Schedule Days
                    </SectionTitle>
                    <FormBody>
                        {scheduleDaysView}
                    </FormBody>
                </FormWrapper>
                <FormWrapper>
                    <SectionTitle>
                        Address
                    </SectionTitle>
                    <FormBody>
                        {addressDetailView}
                    </FormBody>
                </FormWrapper>
                <ImageUploader />
                <FormWrapper>
                    <SectionTitle>
                    Purchases
                    <div>
                    <Button
                title={"Export"}
            btnSize ={ButtonSize.sm} 
            btnVariant={ButtonVariant.secondary} clicked={validateForm} />
            </div>
                    </SectionTitle>
                    <FormBody>
                    <Table>
                        <thead>
                    <TableHeaderComponent headers={purchaseTableHeaders} onToggleSort={() => {}} />
                    </thead>
                    </Table>
                    <EmptyTableBody>
                        No Data Found
                    </EmptyTableBody>
                    </FormBody>
                </FormWrapper>
                <FormWrapper>
                    <SectionTitle>
                        Winner Details
                    </SectionTitle>
                    <FormBody>
                    <Table>
                        <thead>
                    <TableHeaderComponent headers={tableHeaderValues} onToggleSort={() => {}} />
                    </thead>
                    </Table>
                    <EmptyTableBody>
                        No Data Found
                    </EmptyTableBody>
                    </FormBody>
                </FormWrapper>
                <ActionBtn>
                <Button
                title={"Delete"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.secondary} clicked={deleteAuctionDetails} />
                <Button
                title={"Update"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={validateForm} />
            
        </ActionBtn>
            </CreateLotteryFirstSection>
            <CreateLotterySecondSection>
                <StatusContainer>
                    <TwoSection>
                    <StatusBody>
                        <StatusTitle>
                            Status
                        </StatusTitle>
                        <Value>
                        {detailResponse.auctionStatus === "U" ? "Upcoming" : "Live"}
                        </Value>
                    </StatusBody>
                    <StatusBody>
                        <StatusTitle>
                           Ends on
                        </StatusTitle>
                        <Value>
                        <CountdownTimer timestamp={new Date(detailResponse.auctionEndDate)} />
                        </Value>
                    </StatusBody>
                    </TwoSection>
                    <StatusBody>
                        <StatusTitle>
                            Auction Type
                        </StatusTitle>
                        <Value>
                        {detailResponse.auctionType === "A" ? "Admin Created" : "User Created"}
                        </Value>
                    </StatusBody>
                    <StatusBody>
                        <StatusTitle>
                        Visibility
                        </StatusTitle>
                        <Value>
                        {detailResponse.isMemberAuction ? "Gold Members" : "All Users"}
                        </Value>
                    </StatusBody>
                </StatusContainer>
            <FormWrapper>
                    <SectionTitle>
                        User Details
                    </SectionTitle>
                    <FormBody>
                        {useDetailView}
                    </FormBody>
                </FormWrapper>
                <FormWrapper>
                    <SectionTitle>
                    ticket Prices
                    </SectionTitle>
                    <TwoSections>
                    <FormBody>
                        {ticketDetalView}
                    </FormBody>
                    <FormBody>
                        {subTicketDetalView}
                    </FormBody>
                    </TwoSections>
                </FormWrapper>
                <FormWrapper>
                    <SectionTitle>
                        Product details
                    </SectionTitle>
                    <FormBody>
                        {productDetailView}
                    </FormBody>
                </FormWrapper>
            </CreateLotterySecondSection>
        </FormContainer>
    </Fragment>
};

export default CreateAuction
