import {FC, Fragment, useState, useEffect} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';

import {transformGMTToUTC} from '../../../Utility/Utility'
import ImageUploader from '../../../components/ImageUploader/ImageUploader'
import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, NotificationType ,FormElement} from '../../../Utility/InterFacesAndEnum';

import {adminRouts} from '../../../routs';
import {createAuction, toggleAuctionCreation} from '../../../features/auctionList';
import {getSettingsData} from '../../../features/settingsSlice'
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../app/Store';
import {useNavigate} from 'react-router-dom';

import {CreateLotteryFirstSection, CreateLotterySecondSection} from '../../Forms/Lottery/CreateLottery/RepeatedLottery/StyledCreateLottery';
import {HeaderView,FormContainer, FormWrapper, SectionTitle, FormBody, TwoSections, ActionBtn, CheckboxContainer, CheckboxDesc} from './StyledCreateAuction';
import {SelectedCheckbox, EmptyCheckbox} from './StyledCreateAuction';

import {validateCreateAuction} from '../../../Utility/formValidation';
import {toggleNotificationVisibility} from '../../../features/networkNotification';

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
        slectedDate: null,
        disabled: false
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
    slectedDate: null,
    disabled: false
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
    slectedDate: null,
    disabled: false
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
    slectedDate: null,
    disabled: false
}
],
    isValidForm: true
};

const ScheduleDays: FormState = {
    form:[{
        elementType:FormElementType.datePicker,
            value:"",
            id:"auctionStartDate",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.date,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
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
    {elementType:FormElementType.datePicker,
        value:"",
        id:"auctionEndDate",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.date,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"End Date",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null,
        disabled: false
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
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Location",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null,
            disabled: false
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
        label:"City",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null,
        disabled: false
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
        slectedDate: null,
        disabled: false
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
    slectedDate: null,
    disabled: false
}, {elementType:FormElementType.input,
    value:"",
    id:"pincode",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.number,
    customValidationType: customValidationType.numberValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Pin/Zip code",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null,
    disabled: false
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
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Name",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null,
            disabled: false
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
        slectedDate: null,
        disabled: false
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
    slectedDate: null,
    disabled: false
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
            slectedDate: null,
            disabled: false
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
        slectedDate: null,
        disabled: false
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
    slectedDate: null,
    disabled: false
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
    slectedDate: null,
    disabled: false
}],
    isValidForm: true
};

const productDetails: FormState = {
    form:[{
        elementType:FormElementType.select,
            value:"",
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
            dropdownValues:["", "vehicle"],
            selectedTime: null,
            slectedDate: null,
            disabled: false
    }, 
    {elementType:FormElementType.select,
        value:"",
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
        dropdownValues:["", "car"],
        selectedTime: null,
        slectedDate: null,
        disabled: false
}],
    isValidForm: true
};

const CreateAuction:FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [auctionDetail, setauctoinDetail] = useState<FormState>(AuctionDetail);
    const [scheduleDetail, setScheduleDetail] = useState<FormState>(ScheduleDays);
    const [addressDetail, setAddressDetail] = useState<FormState>(AddressDetails);
    const [userDetail, setUserDetail] = useState<FormState>(UserDetails);
    const [ticketdetail, setTicketDetail] = useState<FormState>(TicketDetail);
    const [subTicketDetail, setSubTicketDetail] = useState<FormState>(subTicketDetails);
    const [productDetail, setProductDetails] = useState<FormState>(productDetails);
    const [isForGoldMembers, setStatus] = useState<boolean>(false);

    const isAuctionCreated = useSelector((state:RootState) => state.auction.isAuctionCreated);
    const ticketData = useSelector((state:RootState) => state.settings.data);

    useEffect(() => {
        dispatch(getSettingsData());
    },[]);

    useEffect(() => {
        if (ticketData && ticketData.length > 0) {
        let auctionObj = ticketData.filter((auctionObj) => {
            return auctionObj.settingFor === "AUCTION"
        })[0];

        let updatedTicketType = ticketdetail.form.map((ticketTypeObj) => {
            return{
                ...ticketTypeObj,
                value: auctionObj[ticketTypeObj.id]
            }
        });

        let updatedsubTicketType = subTicketDetail.form.map((ticketTypeObj) => {
            return{
                ...ticketTypeObj,
                value: auctionObj[ticketTypeObj.id]
            }
        });

        setSubTicketDetail({
            ...subTicketDetail,
            form:updatedsubTicketType
        })

        setTicketDetail({
            ...ticketdetail,
            form:updatedTicketType
        })
    }
    },[ticketData]);

    useEffect(() => {
        if (isAuctionCreated === true) {
            navigate(adminRouts.auctionList);
        }

        return () => {
            dispatch(toggleAuctionCreation({
                isAuctionCreated: false
            }))
        }

    },[isAuctionCreated]);

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
        setScheduleDetail({
            ...scheduleDetail,
            form:updatedArray
        });
    };

    const scheduleDaysView = <FormBuilder formElements={ScheduleDays.form} 
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

    const validateForm = () => {

    let formElementsArray = [
        ...auctionDetail.form,
        ...scheduleDetail.form,
        ...addressDetail.form,
        ...userDetail.form,
        ...ticketdetail.form,
        ...subTicketDetail.form,
        ...productDetail.form,
    ];

    let requestObj:any = {};

    for (let formElement of formElementsArray) {
        requestObj[formElement.id] = formElement.value
    }

    if (requestObj.auctionStartDate.length > 0 && requestObj.auctionEndDate.length > 0) {
        requestObj["auctionStartDate"] = transformGMTToUTC(requestObj.auctionStartDate);
        requestObj["auctionEndDate"] = transformGMTToUTC(requestObj.auctionEndDate);
        requestObj["isMemberAuction"] = isForGoldMembers;
    } else {
        requestObj["auctionStartDate"] = "";
        requestObj["auctionEndDate"] = "";
        requestObj["isMemberAuction"] = isForGoldMembers;
    }

    let validatedObj = validateCreateAuction(requestObj);

    if (validatedObj.status) {
        dispatch(createAuction(requestObj));
    } else {
        dispatch(toggleNotificationVisibility({
            isVisible: true,
            status: NotificationType.error,
            message: validatedObj.message
        }));
    }

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
                <ActionBtn>
                <Button
                title={"Create Auction"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={validateForm} />
        </ActionBtn>
            </CreateLotteryFirstSection>
            <CreateLotterySecondSection>
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
