import {FC, useEffect} from 'react';
import UpdateTemplateForm from '../../Forms/Lottery/UpdateLotteryTemplate/UpdateOneTimeLotteryTemplate';
import {useParams} from 'react-router-dom';
import {getUpdateTemplateDetail, setUpdateTemplate} from '../../../features/updateTemplateSlice';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../../app/Store';

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

    let view  = Object.keys(templateObj).length > 0 ? 
    <UpdateTemplateForm onCreateLottery={() => {}} onCancel={() => {}} templateDetail={templateObj} /> :
     <div>Please wait</div>

    return view;
};

export default UpdateOneTimeTemplate