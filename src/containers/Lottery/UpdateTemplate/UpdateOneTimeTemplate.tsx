import {FC, useEffect} from 'react';
import Button from '../../../components/UI/Button/Button'
import UpdateTemplateForm from '../../Forms/Lottery/UpdateLotteryTemplate/UpdateOneTimeLotteryTemplate';
import {useParams} from 'react-router-dom';
import {getUpdateTemplateDetail, setUpdateTemplate} from '../../../features/updateTemplateSlice';
import {updateLottery} from '../../../features/lotteryListSlice';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/Store';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {adminRouts} from '../../../routs';

import {Breadcrumbs} from './StyledUpdateTemplate';

import {validateCreateOnetimeLottery} from '../../../Utility/formValidation';
import {NotificationType} from '../../../Utility/InterFacesAndEnum';
import {toggleNotificationVisibility} from '../../../features/networkNotification';

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

const UpdateOneTimeTemplate:FC = () => {

    const templateObj = useSelector((state: RootState) => state.updateTemplate.templateObj);

    const params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        let {lotteryId} = params;
        dispatch(getUpdateTemplateDetail(lotteryId ? lotteryId : ""));
        return () => {
            dispatch(setUpdateTemplate({
                templateObj:{}
            }))
        }
    },[]);

    const updateLotteryData = (updateObj:any) => {
        let validatedObj = validateCreateOnetimeLottery(updateObj);
        if (validatedObj.status) {
            dispatch(updateLottery(updateObj));
        } else {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: validatedObj.message
            }));
        }
    }

    const deleteTemplate = (obj:any) => {
        console.log(obj)
    }

    let view  = Object.keys(templateObj).length > 0 ? 
    <>
    <Breadcrumbs>
    <ViewHeader title={`Update lottery`} isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.gamesList} />
    <Button title={"Delete"} btnSize={ButtonSize.md} btnVariant={ButtonVariant.secondary} 
     clicked={() => {deleteTemplate(templateObj)}} />
    </Breadcrumbs>
    
    <UpdateTemplateForm onCreateLottery={updateLotteryData} onCancel={() => {}} templateDetail={templateObj} /> </>:
     <div>Please wait</div>

    return view;
};

export default UpdateOneTimeTemplate