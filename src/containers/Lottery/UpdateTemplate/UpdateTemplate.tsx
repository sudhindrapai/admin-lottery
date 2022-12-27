import {FC, useEffect} from 'react';
import UpdateTemplateForm from '../../Forms/Lottery/UpdateLotteryTemplate/UpdateLotteryTemplate';
import {useParams,useLocation} from 'react-router-dom';

import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {getUpdateTemplateDetail, setUpdateTemplate} from '../../../features/updateTemplateSlice';
import {updateLottery} from '../../../features/lotteryListSlice';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/Store';
import {setUpdateImgDetails} from '../../../features/imageUploaderSlice';
import {adminRouts} from '../../../routs';

import {validateCreateRepeatLottery} from '../../../Utility/formValidation';
import {NotificationType} from '../../../Utility/InterFacesAndEnum';
import {toggleNotificationVisibility} from '../../../features/networkNotification';

const UpdateTemplate:FC = () => {

    const templateObj = useSelector((state: RootState) => state.updateTemplate.templateObj)
    const params = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        let {lotteryId} = params;
        dispatch(getUpdateTemplateDetail(lotteryId ? lotteryId : ""));
        return () => {
            dispatch(setUpdateTemplate({
                templateObj:{
                    lotteryId:""
                }
            }))
        }
    },[]);

    const updateLotteryDetails = (updateObj:any) => {
        let validatedObj = validateCreateRepeatLottery(updateObj);
        if (validatedObj.status) {
            dispatch(updateLottery(updateObj));
        } else {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: validatedObj.message
            }));
        }
    };

    let view  = Object.keys(templateObj).length > 0 ? 
    <>
    <ViewHeader title={`Update lottery`} isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.gamesList} />
    <UpdateTemplateForm onCreateLottery={updateLotteryDetails} onCancel={() => {}} templateDetail={templateObj} /> </> : 
    <div>Please wait</div>

    return view
};

export default UpdateTemplate