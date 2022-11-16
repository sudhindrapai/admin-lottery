import {FC, useEffect} from 'react';
import UpdateTemplateForm from '../../Forms/Lottery/UpdateLotteryTemplate/UpdateOneTimeLotteryTemplate';
import {useParams} from 'react-router-dom';
import {getUpdateTemplateDetail, setUpdateTemplate} from '../../../features/updateTemplateSlice';
import {updateLottery} from '../../../features/lotteryListSlice'
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/Store';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

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

    const updateLottery = (updateObj) => {
        dispatch(updateLottery(updateObj));
    }

    let view  = Object.keys(templateObj).length > 0 ? 
    <UpdateTemplateForm onCreateLottery={updateLottery} onCancel={() => {}} templateDetail={templateObj} /> :
     <div>Please wait</div>

    return view;
};

export default UpdateOneTimeTemplate