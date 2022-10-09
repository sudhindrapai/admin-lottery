import {FC, useEffect} from 'react';

import UpdateLotteryGame from '../UpdateLotteryGame/UpdateLotteryGame';

import {useSelector, useDispatch} from 'react-redux';
import {getLotteryGameDetail} from '../../../features/lotteryListSlice';
import {useLocation,useParams} from 'react-router-dom';
import {RootState} from '../../../app/Store'
const ViewLottery:FC = () => {
    const dispatch = useDispatch();
    const paramsObj = useParams();
    const gameDetail = useSelector((state:RootState) => state.lotteryList.lotteryGameDetail)
    // const
    useEffect(() => {
        // console.log(location)
        dispatch(getLotteryGameDetail(paramsObj?.lotteryId? paramsObj.lotteryId : ""))
    },[]);

    let view  = Object.keys(gameDetail).length > 0 ? 
        <UpdateLotteryGame onCancel={() => {}} onCreateLottery={() => {}} templateDetail={gameDetail} />:
     <div>Please wait</div>

    return <div>
        {view}
    </div>
};

export default ViewLottery