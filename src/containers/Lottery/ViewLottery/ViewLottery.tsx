import {FC, useEffect} from 'react';

import UpdateLotteryGame from '../UpdateLotteryGame/UpdateLotteryGame';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {useSelector, useDispatch} from 'react-redux';
import {getLotteryGameDetail,updateLottery} from '../../../features/lotteryListSlice';
import {useNavigate,useParams} from 'react-router-dom';
import {RootState} from '../../../app/Store';

import {HeaderView} from './styledViewLottery';

import {adminRouts} from '../../../routs';

const ViewLottery:FC = () => {
    const dispatch = useDispatch();
    const paramsObj = useParams();
    const navigation = useNavigate()
    const gameDetail = useSelector((state:RootState) => state.lotteryList.lotteryGameDetail)
    
    useEffect(() => {
        dispatch(getLotteryGameDetail(paramsObj?.lotteryId? paramsObj.lotteryId : ""))
    },[]);

    const updateGame = (requestObj) => {
        dispatch(updateLottery(requestObj));
    };

    const navigateToView = (path:string):void => {
        navigation(path);
    };

    let view  = Object.keys(gameDetail).length > 0 ? 
        <UpdateLotteryGame onCancel={() => {navigateToView(adminRouts.lotteryList)}} onCreateLottery={updateGame} templateDetail={gameDetail} />:
     <div>Please wait</div>

    return <div>
        <HeaderView>
        <ViewHeader title={`#${gameDetail.lotteryGameId}`} isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.lotteryList} />
        </HeaderView>
        {view}
    </div>
};

export default ViewLottery