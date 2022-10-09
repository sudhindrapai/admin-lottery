import {FC, useState, useRef, useEffect} from 'react';
import Button from '../../components/UI/Button/Button'
import {transformGMTToUTC} from '../../Utility/Utility'
import StaticForm from './staticImgUploaderForm'

import {StaticBannerSectionWrapper, DesktopBannerSection,
     BannerSectionTitle, AddImageBtn, BannerSectionSubtitle, StaticFormSection} from './StyledPromotions';

import {RootState} from '../../app/Store'
import {uploadPromotionImages} from '../../features/promotions';
import {useSelector, useDispatch} from 'react-redux';
import {updatePromotion} from '../../features/promotions'

import TestStaticForm from './TempStaticForm';

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

    const [bannerUrl, setBannerUrl] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEnaDate] = useState(new Date());
    const [desktopImgUrl1, setDesktopImgUrl1] = useState("");
    const [mobileImgUrl1, setMobileImgUrl1] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        if (details && Object.keys(details).length > 0) {
            setBannerUrl(details.promotionBannerUrl);
            setStartDate(details.promotionStartDate);
            setEnaDate(details.promotionEndDate);
            setDesktopImgUrl1(details.promotionWebBannerImages ? details.promotionWebBannerImages : "");
            setMobileImgUrl1(details.promotionMobileBannerImages ? details.promotionMobileBannerImages : "");
            setId(details.promotionId ? details.promotionId : 0)
        }
    },[details]);

    const [isForDesktopImg, setDesktopImgStatus] = useState(false);

    const desktopImgUrl = useSelector((state:RootState) => state.promotions.desktopImagUrl);
    const mobileImgUrl = useSelector((state:RootState) => state.promotions.mobileImgUrl);
    const desktopImgName = useSelector((state:RootState) => state.promotions.desktopFileName);
    const mobileImgName = useSelector((state:RootState) => state.promotions.mobileFileName)

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
            isForDesktop:isForDesktopImg,
            id:id
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
        let mobileBannerUrl = mobileImgName.length > 0 ? mobileImgName : desktopImgName
        let requestObj = {};
        requestObj["promotionId"] = details.promotionId;
        requestObj["promotionPage"] = details.promotionPage;
        requestObj["promotionType"] = details.promotionType;
        requestObj["promotionPosition"] = "TOP";
        requestObj["promotionStartDate"] = transformGMTToUTC(startDate.toString());
        requestObj["promotionEndDate"] = transformGMTToUTC(endDate.toString());
        requestObj["promotionBannerUrl"] = bannerUrl;
        requestObj["promotionImages"] = [
            desktopImgName, 
            mobileBannerUrl
        ]
        dispatch(updatePromotion(requestObj));
    };

    const updateDateChange = (date:any,name:string) => {
        if (name === "startDate") {
            setStartDate(date)
        } else {
            setEnaDate(date)
        }
    }

    const updateBannerRedirectionUrl = (url:string) => {
        setBannerUrl(url)
    }

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
        {desktopImgUrl1 && <img src={desktopImgUrl1} />}
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
        {mobileImgUrl1 && <img src={mobileImgUrl1} />}
        <StaticFormSection>
            {/* <StaticForm bannerRedirectionUrl={bannerRedirectionUrl} details={details} /> */}
        </StaticFormSection>
        <TestStaticForm startDate={startDate} endDate={endDate} url={bannerUrl} onDateChange = {updateDateChange} onUrlChange = {updateBannerRedirectionUrl} />
        <Button title={"Update"} btnSize={ButtonSize.md} 
        btnVariant={ButtonVariant.primaryFilled} 
        clicked={createStaticImgObj} >
                Update
            </Button>
    </StaticBannerSectionWrapper>
};

export default StaticImageUploader