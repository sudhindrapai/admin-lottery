import {FC, useState,useEffect} from 'react';
import Button from '../../../components/UI/Button/Button';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {BreadCrumbs} from './StyledLotteryGame';
import {useSelector, useDispatch} from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import {getTemplateList,publishLottery} from '../../../features/templateListslice';
import {GamesView,TemplateList, TemplatLineItem, TemplateId,
     TemplateItem, ActiveStatus,TemplateListHeader, DeactiveStatus, DotIcon, PublishBtn} from './StyledLotteryGame';
import {LotteryOptionsList,LotteryOption,LotteryTypeTitle} from '../LotteryList/StyledLottery'
import { RootState } from '../../../app/Store';
import {transformDate} from '../../../Utility/Utility';
import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs';
import JsonToCsv from '../../../components/JSONToCSV/JsonToCsv'

import oneTimeLotteryImgSrc from '../../../assets/images/oneTimeLottery.svg';
import repeatedLotteryImgSrc from '../../../assets/images/repeatedLottery.svg';
const weekNames = ["Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday","Sunday"];
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

const LotteryTemplateList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let templateList = useSelector((state:RootState) => state.templateList.templateList);
    const [createLotteryModal, setCreateLotteryModalStatus] = useState(false);

    useEffect(()=> {
        dispatch(getTemplateList());
    },[]);

    const redirectToTemplateList = (id:number, isRepeatLottery:boolean) => {
        if (isRepeatLottery) {
            navigate(`/admin/lottery/update-template/${id}`);
        } else {
            navigate(`/admin/lottery/update-onetime-template/${id}`);
        }
    }

    const publishTemplate = (id:number) => {
        dispatch(publishLottery({templateId:id}));
    };

    let templateListView = templateList.map((templateObj:any) => {
        return <TemplatLineItem>
            <TemplateId onClick={() => {redirectToTemplateList(templateObj.lotteryId, templateObj.isRepeat)}}>
                {templateObj.lotteryId}
            </TemplateId>
            <TemplateItem>
             {templateObj.rewardType === "M" ? `${templateObj.rewardAmount ? "$ " + templateObj.rewardAmount: "$ 0"}` : templateObj.rewardGiftName} 
            </TemplateItem>
            <TemplateItem>
                {templateObj.isRepeat ? "Repeated Lottery": "One Time Lottery"}
            </TemplateItem>
            <TemplateItem>
            {templateObj.isRepeat ? weekNames[templateObj.lotteryStartDay - 1]: transformDate(templateObj.lotteryStartDate)}
            </TemplateItem>
            <TemplateItem>
            {templateObj.isRepeat ? weekNames[templateObj.lotteryEndDay - 1]: transformDate(templateObj.lotteryEndDate)}
            </TemplateItem>
            <TemplateItem>
                { templateObj.isActive ? <ActiveStatus>
                   <DotIcon/>Active
                </ActiveStatus>:
                <DeactiveStatus>
                    <DotIcon/>Disabled
                </DeactiveStatus>}
            </TemplateItem>
             <TemplateItem>
                 <PublishBtn onClick={() => {publishTemplate(templateObj.lotteryId)}}>
                     Publish
                 </PublishBtn>
             </TemplateItem>
        </TemplatLineItem>
    });

    const redirectToCreateLottery = (type: number):void => {
        if (type === 1) {
            navigate(adminRouts.createOneTimeLottery);
        } else {
            navigate(adminRouts.createRepeatedLottery);
        }
    }

    return<>
    <Modal isOpen={createLotteryModal} 
        name={"Create lottery option modal"} 
        title={"Create Lottery"} toggleModal={() => {setCreateLotteryModalStatus(!createLotteryModal)}} >
            <LotteryOptionsList>
                <LotteryOption onClick={() => {redirectToCreateLottery(1)}}>
            <img src={oneTimeLotteryImgSrc} />
            <LotteryTypeTitle>
                One time Lottery
            </LotteryTypeTitle>
            </LotteryOption>
            <LotteryOption onClick={() => {redirectToCreateLottery(2)}}>
            <img src={repeatedLotteryImgSrc} />
            <LotteryTypeTitle>
            Repeated Lottery
            </LotteryTypeTitle>
            </LotteryOption>
            </LotteryOptionsList>
        </Modal>
    <BreadCrumbs>
    <ViewHeader title={"Lottery Templates"} isNeedCreateButton={false} btnText={"Test button"}
     routePath={"/"} />
     <span>
     <span style={{marginRight: '10px'}}>
         <JsonToCsv data={templateList} fileLabel={"templates"} /></span>
     <Button title={"+ Create Lottery"} btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
     clicked={() => {setCreateLotteryModalStatus(true)}} />
     </span>
     </BreadCrumbs>
     <GamesView>
         <TemplateListHeader>
             <TemplateItem>
             Template ID
             </TemplateItem>
             <TemplateItem>
             Lottery Reward
             </TemplateItem>
             <TemplateItem>
             Lottery Type
             </TemplateItem>
             <TemplateItem>
             Start Date/ Day
             </TemplateItem>
             <TemplateItem>
             End Date/ Day
             </TemplateItem>
             <TemplateItem>
             Lottery Status
             </TemplateItem>
             <TemplateItem>
             Action
             </TemplateItem>
         </TemplateListHeader>
         <TemplateList>
             {templateListView}
         </TemplateList>
     </GamesView>
    </>
};

export default LotteryTemplateList;
