import {FC, useState} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';

import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/Modal/Modal';

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../Utility/InterFacesAndEnum';

import {adminRouts} from '../../../routs';
import {createAuction, toggleAuctionCreation} from '../../../features/auctionList';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../app/Store';
import {useNavigate} from 'react-router-dom';

import {Wrapper, Container, BreadCrumbs, FormSection, SectionTitle,
     SectionBody, PermitionSectoinTitle, AccountDetailTitleSection, 
     Title, Subtitle, UserProfilename, UserName, UserDetail, AddStaffFormBody, ModalFooter} from './StyledUserSettings';

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
        label:"User Name",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"emailAddress",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.email,
    customValidationType: customValidationType.emailValidation,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Email Address",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
},
{elementType:FormElementType.input,
    value:"",
    id:"mobileNumber",
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
    id:"accountType",
    isRequired:true,
    fullWidth: true,
    isCustomValidationRequred: true,
    inputVariant: InputVariant.outlined,
    inputType: InputTypes.text,
    customValidationType: customValidationType.null,
    isValidInput:false,
    isTouched:false,
    errorMessage:"",
    label:"Account Type",
    radioGroupValues:[],
    isPasswordHidden:true,
    dropdownValues:[],
    selectedTime: null,
    slectedDate: null
}
],
    isValidForm: true
};

const AddStaff: FormState = {
    form:[ 
        {elementType:FormElementType.input,
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
            label:"User Name",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    },
    {elementType:FormElementType.input,
        value:"",
        id:"emailAddress",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.email,
        customValidationType: customValidationType.emailValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Email Address",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
    },
    {elementType:FormElementType.input,
        value:"",
        id:"mobileNumber",
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
    {elementType:FormElementType.select,
        value:"",
        id:"accountType",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.null,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Account Type",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:["staff account","admin account"],
        selectedTime: null,
        slectedDate: null
    }
    ],
        isValidForm: true
};

const UserSettings:FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [auctionDetail, setauctoinDetail] = useState<FormState>(AuctionDetail);
    const [addStaffForm, setAddStaff] = useState<FormState>(AddStaff);
    const [isModalActive, setModalVisibility] = useState(false);

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



    const handleAddStaffDetailInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, auctionDetail.form);
        setAddStaff({
            ...auctionDetail,
            form: updatedStateArray
        });
    }

    const addStaffFormView = <AddStaffFormBody>
        <FormBuilder formElements={addStaffForm.form} 
    onInputChange = {handleAddStaffDetailInput} 
    onSelectValueChange={() => {}} 
    onChangeDate={() => {}} onChangeTime={() => {}} />
    </AddStaffFormBody>;

    const toggleAddStaffModalVisibility = () => {
        setModalVisibility(!isModalActive);
    }

    const validateForm = () => {}

    return <Wrapper>
        <Modal isOpen={isModalActive} name={"add staff"} title={"Add Staff"} toggleModal={toggleAddStaffModalVisibility}>
            {addStaffFormView}
            <ModalFooter>
            <Button
                title={"Create"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={validateForm} />
            </ModalFooter>
        </Modal>
        <Container>
            <BreadCrumbs>
                <ViewHeader title={"User Settings"} />
            </BreadCrumbs>
            <FormSection>
                <SectionTitle>
                Account details
                </SectionTitle>
                <SectionBody>
                    {auctionDetailView}
                </SectionBody>
            </FormSection>
            <PermitionSectoinTitle>
            Users and permissions
            </PermitionSectoinTitle>
            <FormSection>
                <SectionBody>
                    <AccountDetailTitleSection>
                        <Title>
                        Owner Account
                        </Title>
                    </AccountDetailTitleSection>
                    <Subtitle>
                    Store owners have some permissions that can't be assigned to staff.
                    </Subtitle>
                    <UserDetail>
                        <UserProfilename>
                            GC
                        </UserProfilename>
                        <UserName>
                        Guy Carinival
                        </UserName>
                    </UserDetail>
                </SectionBody>
            </FormSection>
            <FormSection>
                <SectionBody>
                    <AccountDetailTitleSection>
                        <Title>
                        Staff (0 of 10)
                        </Title>
                    </AccountDetailTitleSection>
                    <Subtitle>
                    Customize what your staff members can edit and access.  You can add up to 10 staff members
                    </Subtitle>
                    <Button
                title={"+ Add Staff"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={toggleAddStaffModalVisibility} />
                </SectionBody>
            </FormSection>
        </Container>
    </Wrapper>
}

export default UserSettings