import {FC, useEffect} from 'react';
import Button from '../../../components/UI/Button/Button';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {BreadCrumbs} from './StyledLotteryGame';
import {useSelector, useDispatch} from 'react-redux';
import {getTemplateList} from '../../../features/templateListslice';
import {GamesView, GamesHeaders, GameHeader, TemplateList, TemplatLineItem, TemplateId,
     TemplateItem, ActiveStatus,TemplateListHeader, DeactiveStatus, DotIcon} from './StyledLotteryGame';
import { RootState } from '../../../app/Store';
import {transformDate} from '../../../Utility/Utility';
import {useNavigate} from 'react-router-dom';

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

    let templateListView = templateList.map((templateObj:any) => {
        return <TemplatLineItem>
            <TemplateId onClick={() => {redirectToTemplateList(templateObj.lotteryId, templateObj.isRepeat)}}>
                {templateObj.lotteryId}
            </TemplateId>
            <TemplateItem>
             {templateObj.rewardType === "M" ? `${templateObj.rewardAmount ? templateObj.rewardAmount: 0}` : templateObj.rewardGiftName} 
            </TemplateItem>
            <TemplateItem>
                {templateObj.isRepeat ? "Repeated Lottery": "One Time Lottery"}
            </TemplateItem>
            <TemplateItem>
            {templateObj.isRepeat ? templateObj.lotteryStartDay: transformDate(templateObj.lotteryStartDate)}
            </TemplateItem>
            <TemplateItem>
            {templateObj.isRepeat ? templateObj.lotteryEndDay: transformDate(templateObj.lotteryEndDate)}
            </TemplateItem>
            <TemplateItem>
                { templateObj.isActive ? <ActiveStatus>
                   <DotIcon/>Active
                </ActiveStatus>:
                <DeactiveStatus>
                    <DotIcon/>Disabled
                </DeactiveStatus>}
            </TemplateItem>
        </TemplatLineItem>
    });

    return<>
    <BreadCrumbs>
    <ViewHeader title={"Lottery Templates"} isNeedCreateButton={false} btnText={"Test button"}
     routePath={"/"} />
     </BreadCrumbs>
     <GamesView>
         <TemplateListHeader>
             <TemplateItem>
             TEMPLATE ID
             </TemplateItem>
             <TemplateItem>
             Reward
             </TemplateItem>
             <TemplateItem>
             Repeat/One time lottery
             </TemplateItem>
             <TemplateItem>
             Start date/ Day
             </TemplateItem>
             <TemplateItem>
             End Date/ Day
             </TemplateItem>
             <TemplateItem>
             Status
             </TemplateItem>
         </TemplateListHeader>
         <TemplateList>
             {templateListView}
         </TemplateList>
     </GamesView>
    </>
};

export default LotteryTemplateList;
