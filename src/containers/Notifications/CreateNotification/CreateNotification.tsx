import {FC, useState, useEffect} from 'react';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';

import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import FormBuilder from '../../FormBuilder/FormBuilder';
import Button from '../../../components/UI/Button/Button';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';

import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../../Utility/InterFacesAndEnum';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../app/Store';
import {createAndScheduleEmailNotification, setEmailNotificationCreationState} from '../../../features/emailNotifications';
import {getUserList} from '../../../features/Users'
import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs'

import {transformGMTToUTC} from '../../../Utility/Utility'
import {Wrapper, Container, FormSection, SectionTitle,
     FormBody, RichTextEditorContainer, UserListWrapper, UserListInput,
      UsersListWrapper, UserDetail, TagsWrapper, TagWrapper, TagName,CloseWrapper} from './StyledCreateNotification'

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
        {elementType:FormElementType.select,
            value:"REGULAR_MEMBER",
            id:"emailUserType",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Custome Type",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:["GOLD_MEMBERS","REGULAR_MEMBER","CUSTOM"],
            selectedTime: null,
            slectedDate: null
        },
        {elementType:FormElementType.datePicker,
            value:"",
            id:"emailScheduleDate",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.null,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
        },
    {elementType:FormElementType.input,
        value:"",
        id:"emailSubject",
        isRequired:true,
        fullWidth: true,
        isCustomValidationRequred: true,
        inputVariant: InputVariant.outlined,
        inputType: InputTypes.text,
        customValidationType: customValidationType.numberValidation,
        isValidInput:false,
        isTouched:false,
        errorMessage:"",
        label:"Subject",
        radioGroupValues:[],
        isPasswordHidden:true,
        dropdownValues:[],
        selectedTime: null,
        slectedDate: null
}
],
    isValidForm: true
};

const CreateEmailNotification:FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createNotification, setNotification] = useState<FormState>(AuctionDetail);
    const [richtextEditer, setRichTextValue] = useState<string>("");
    const [localUsersList, setLocalUseersList] = useState([]);
    const [matchUserList, setMatchUsersList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const [searchedEmailId, setEmailId] = useState("")

    const imageNames = useSelector((state:RootState) => state.images.imageNames);
    const isNotificationCreated = useSelector((state:RootState) => state.emailNotifications.isNotificationCreated);
    const usersList = useSelector((state:RootState) => state.users.users);

    useEffect(() => {
        if (isNotificationCreated) {
            navigate(adminRouts.emailNotificationList);
        }
        return () => {
            setEmailNotificationCreationState({
                status: false
            });
        }
    },[isNotificationCreated]);

    useEffect(() => {
        if (searchedEmailId.length > 0) {
            let filteredEmails = localUsersList.filter((userObj:any) => {
                let isEmailInclues = userObj.emailId.toUpperCase().includes(searchedEmailId.toUpperCase())
                return isEmailInclues ? userObj : ""
            });
            setMatchUsersList(filteredEmails)
        } else {
            setMatchUsersList([])
        }
    },[searchedEmailId])

    useEffect(() => {
        if (usersList.length === 0) {
            dispatch(getUserList(""))
        } else {
            setLocalUseersList(usersList);
        }
    },[usersList])

    const handleAuctionDetailInput = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void => {
        let updatedStateArray = updateFormInputState(event, createNotification.form);
        setNotification({
            ...createNotification,
            form: updatedStateArray
        });
    }

    const handleScheduleDaysTimeInput = (date: Date, name: string) => {
        let updatedArray = updateFormDate(date, name, createNotification.form);
        setNotification({
            ...createNotification,
            form:updatedArray
        });
    };

    const handleProductDetails = (value: string, name: string) => {
        let updatedArray = updateFormSelectState(value, name, createNotification.form);
        setNotification({
            ...createNotification,
            form:updatedArray
        });
    }

    const auctionDetailView = <FormBuilder formElements={createNotification.form} 
    onInputChange = {handleAuctionDetailInput} 
    onSelectValueChange={handleProductDetails} 
    onChangeDate={handleScheduleDaysTimeInput} onChangeTime={() => {}} />;

    const setRichText = (value:string) => {
        setRichTextValue(value)
    }

    const createEmailNotification = () => {
        let payload:any = {};

        let customEmailIds:string[] = [];

        for (let customerObj of selectedUsers) {
            customEmailIds.push(customerObj.emailId)
        }

        for (let elementObj of createNotification.form) {

            payload[elementObj.id] = elementObj["value"]
        }

        payload["emailScheduleDate"] = transformGMTToUTC(payload.emailScheduleDate)

        payload["emailAttachments"] = imageNames;
        payload["emailBody"] = richtextEditer;
        payload["emailIds"] = customEmailIds;

        dispatch(createAndScheduleEmailNotification(payload))
    }

    const addUserToSelectedList = (obj:any) => {
        setSelectedUsers(selectedUsers.concat(obj));
        setMatchUsersList([]);
        setEmailId("");
    }

    const removeEmailId = (obj:any) => {
        let updatedArray = selectedUsers.filter((userObj:any) => {
            return userObj.emailId !== obj.emailId
        });
        setSelectedUsers(updatedArray);
    }

    let tagView = selectedUsers.map((tagObj: any) => {
        return <TagWrapper>
            <TagName>
                {tagObj.emailId}
            </TagName>
            <CloseWrapper onClick={() => {removeEmailId(tagObj)}}>
                X
            </CloseWrapper>
        </TagWrapper>
    })

    let usersListView = matchUserList.map((userObj:any) => {
        return <UserDetail onClick={() => {addUserToSelectedList(userObj)}} >
            {userObj.emailId}
        </UserDetail>
    })

    return <Wrapper>
        <ViewHeader title={"Create Notification"} isBackButtonRequired={true} 
        backButtonRedirectionUrl={adminRouts.emailNotificationList} />
        <Container>
            <FormSection>
                <SectionTitle>
                    Create Notification
                </SectionTitle>
                <FormBody>
                    {auctionDetailView}
                </FormBody>
                {selectedUsers.length > 0 && <TagsWrapper>
                    {tagView}
                </TagsWrapper>}
                <UserListWrapper>
                    <UserListInput placeholder={"Search for user email Id"} value={searchedEmailId} onChange={(event) => {setEmailId(event.target.value)}} />
                    <UsersListWrapper>
                        {usersListView}
                    </UsersListWrapper>
                </UserListWrapper>
                <RichTextEditorContainer>
                <RichTextEditor onValueChange={setRichText} />
                </RichTextEditorContainer>
                <RichTextEditorContainer>
                <ImageUploader />
                </RichTextEditorContainer>
            </FormSection>
            <Button
                title={"Send or schedule email"}
            btnSize ={ButtonSize.md} 
            btnVariant={ButtonVariant.primaryFilled} clicked={createEmailNotification} />
        </Container>
    </Wrapper>
};

export default CreateEmailNotification