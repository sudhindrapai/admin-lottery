import {FC, useEffect} from 'react';
import UpdateTemplateForm from '../../Forms/Lottery/UpdateLotteryTemplate/UpdateOneTimeLotteryTemplate';
import {useParams} from 'react-router-dom';
import {getUpdateTemplateDetail, setUpdateTemplate} from '../../../features/updateTemplateSlice';
import {updateLottery} from '../../../features/lotteryListSlice'
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/Store';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

import {validateCreateOnetimeLottery} from '../../../Utility/formValidation';
import {NotificationType} from '../../../Utility/InterFacesAndEnum';
import {toggleNotificationVisibility} from '../../../features/networkNotification';

const UpdateOneTimeTemplate = () => {

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

    let view  = Object.keys(templateObj).length > 0 ? 
    <UpdateTemplateForm onCreateLottery={updateLotteryData} onCancel={() => {}} templateDetail={templateObj} /> :
     <div>Please wait</div>

    return view;
};

export default UpdateOneTimeTemplate