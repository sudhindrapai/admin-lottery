import {FC, useState, useRef, useEffect} from 'react';
import Button from '../../components/UI/Button/Button'
import FormBuilder from '../FormBuilder/FormBuilder';
import {updateFormInputState, validateForm, updateFormSelectState, updateFormTimeState, updateFormDate} from '../../Utility/Utility';
import {FormElementType, customValidationType, InputVariant, InputTypes, FormElement} from '../../Utility/InterFacesAndEnum';

import {StaticBannerSectionWrapper, DesktopBannerSection,
     BannerSectionTitle, AddImageBtn, BannerSectionSubtitle, StaticFormSection} from './StyledPromotions';

import {RootState} from '../../app/Store'
import {uploadPromotionImages} from '../../features/promotions';
import {useSelector, useDispatch} from 'react-redux';

interface StaticImgProps {
    details:any
}

interface FormInterface {
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


const staticSectionForm: FormInterface = {
    form:[{
        elementType:FormElementType.input,
            value:"https://www.google.com",
            id:"promotionBannerUrl",
            isRequired:true,
            fullWidth: true,
            isCustomValidationRequred: true,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:false,
            isTouched:false,
            errorMessage:"",
            label:"Banner URL",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    },
    {
        elementType:FormElementType.datePicker,
            value:"",
            id:"promotionStartDate",
            isRequired:false,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:true,
            isTouched:false,
            errorMessage:"",
            label:"Start Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    },
    {
        elementType:FormElementType.datePicker,
            value:"",
            id:"promotionEndDate",
            isRequired:false,
            fullWidth: true,
            isCustomValidationRequred: false,
            inputVariant: InputVariant.outlined,
            inputType: InputTypes.text,
            customValidationType: customValidationType.numberValidation,
            isValidInput:true,
            isTouched:false,
            errorMessage:"",
            label:"End Date",
            radioGroupValues:[],
            isPasswordHidden:true,
            dropdownValues:[],
            selectedTime: null,
            slectedDate: null
    }
],
    isValidForm: true
};

const StaticImageUploader:FC<StaticImgProps> = ({details}) => {

    const dispatch = useDispatch();

    const [staticForm, setStaticForm] = useState<FormInterface>(staticSectionForm);
    const [isForDesktopImg, setDesktopImgStatus] = useState(false)

    const desktopImgUrl = useSelector((state:RootState) => state.promotions.desktopImagUrl);
    const mobileImgUrl = useSelector((state:RootState) => state.promotions.mobileImgUrl);

    const inputRef = useRef<HTMLInputElement>(null);

    // const {promotionBannerUrl,promotionEndDate,promotionId,
    //     promotionMobileBannerImages,promotionPage,promotionType,promotionWebBannerImages} = details;

        useEffect(() => {
            if (details !== undefined && details.promotionId !== undefined && details.promotionId !== null){
               let updatedResponse = getValue();
                setStaticForm({
                    ...staticForm,
                    form:updatedResponse,
                })
            }
        },[details]);

        const getValue = ():any => {
            let updatedFormElement = staticForm.form.map((element) => {
                let updatedElement = {
                    ...element
                }
                    updatedElement["value"] = details[element.id];
                
                return updatedElement;
            });
            return updatedFormElement;
        }

    const triggerImageUploader = (isforDektop:boolean) => {
        setDesktopImgStatus(isforDektop);
        inputRef.current?.click();
    }

    const createUploadFileObj = (event) => {
        uploadFile(event.target.files[0]);
    }

    const uploadFile = (files: any) => {
        const formData = new FormData();
        formData.append("file", files);
        formData.append('documentName',updateFileName(files.name));
        dispatch(uploadPromotionImages({
            formObj:formData,
            isForDesktop:isForDesktopImg
        }));
    }

    const updateFileName = (fileName:string):string => {
        let updatedName = "";
        if (fileName !== null && fileName !== undefined && fileName.trim().length > 0){
            fileName.trim().split(" ").join("-");
        }
        return updatedName
    }

    const handleInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>) => {
        let updatedStateArray = updateFormInputState(event, staticForm.form);
        setStaticForm({
            ...staticForm,
            form: updatedStateArray
        });
    }

    const handleScheduleDaysTimeInput = (date: Date, name: string) => {
        let updatedArray = updateFormDate(date, name, staticForm.form);
        setStaticForm({
            ...staticForm,
            form:updatedArray
        });
    };

    let lotteryNameFormView = <FormBuilder formElements={staticSectionForm.form} 
    onInputChange = {handleInputChange} 
    onSelectValueChange={() => {}} 
    onChangeDate={handleScheduleDaysTimeInput} onChangeTime={() => {}} />;

    let createStaticImgObj = () => {
        let mobileBannerUrl = mobileImgUrl.length > 0 ? mobileImgUrl : desktopImgUrl
        let requestObj = {};
        requestObj["promotionPosition"] = "TOP";
        requestObj["promotionImages"] = [
            desktopImgUrl, 
            mobileBannerUrl
        ]
    };

    return <StaticBannerSectionWrapper>
        <input type={"file"} ref={inputRef} 
            style={{display: 'none'}}
            onChange={(event) => {
            createUploadFileObj(event);
          }}
          accept="image/jpeg, image/png, image/jpg, image/tiff" />
        <DesktopBannerSection>
            <BannerSectionTitle>
            Desktop Banner (1920x450)
            </BannerSectionTitle>
            <AddImageBtn onClick={() => {triggerImageUploader(true)}}>
                Add image
            </AddImageBtn>
        </DesktopBannerSection>
        {desktopImgUrl && <img src={desktopImgUrl} />}
        <DesktopBannerSection>
            <BannerSectionTitle>
            Desktop Banner (1920x450)
            <BannerSectionSubtitle>
            Note: If mobile banner is not added, by default desktop banner will be displayed
            </BannerSectionSubtitle>
            </BannerSectionTitle>
            <AddImageBtn onClick={() => {triggerImageUploader(false)}}>
                Add image
            </AddImageBtn>
        </DesktopBannerSection>
        {mobileImgUrl && <img src={mobileImgUrl} />}
        <StaticFormSection>
            {lotteryNameFormView}
        </StaticFormSection>
        <Button title={"Update"} btnSize={ButtonSize.md} 
        btnVariant={ButtonVariant.primaryFilled} 
        clicked={createStaticImgObj} >
                Update
            </Button>
    </StaticBannerSectionWrapper>
};

export default StaticImageUploader