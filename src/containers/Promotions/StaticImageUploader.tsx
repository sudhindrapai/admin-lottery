import {FC, useState, useRef} from 'react';
import Button from '../../components/UI/Button/Button'

import StaticForm from './staticImgUploaderForm'

import {StaticBannerSectionWrapper, DesktopBannerSection,
     BannerSectionTitle, AddImageBtn, BannerSectionSubtitle, StaticFormSection} from './StyledPromotions';

import {RootState} from '../../app/Store'
import {uploadPromotionImages} from '../../features/promotions';
import {useSelector, useDispatch} from 'react-redux';

interface StaticImgProps {
    details:any,
    bannerRedirectionUrl:string
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



const StaticImageUploader:FC<StaticImgProps> = ({details, bannerRedirectionUrl}) => {

    const dispatch = useDispatch();

    const [isForDesktopImg, setDesktopImgStatus] = useState(false);

    const desktopImgUrl = useSelector((state:RootState) => state.promotions.desktopImagUrl);
    const mobileImgUrl = useSelector((state:RootState) => state.promotions.mobileImgUrl);

    const inputRef = useRef<HTMLInputElement>(null);


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
            <StaticForm bannerRedirectionUrl={bannerRedirectionUrl} details={details} />
        </StaticFormSection>
        <Button title={"Update"} btnSize={ButtonSize.md} 
        btnVariant={ButtonVariant.primaryFilled} 
        clicked={createStaticImgObj} >
                Update
            </Button>
    </StaticBannerSectionWrapper>
};

export default StaticImageUploader