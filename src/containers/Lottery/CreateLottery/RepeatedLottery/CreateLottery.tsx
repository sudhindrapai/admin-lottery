import {FC, Fragment, useEffect} from 'react';
import Header from '../../../../components/ViewHeader/ViewHeader';
import {HeaderSection, LotteryContent} from './StyledCreateLottery';
import * as appEndpoints from '../../../../routs';
import CreateLotteryForm from '../../../Forms/Lottery/CreateLottery/RepeatedLottery/CreateRepeatedLottery';


import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../../routs'

import {createLottery,toggleLotteryCreateState} from '../../../../features/createLotterySlide';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../app/Store';

const CreateLottery:FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isCreated = useSelector((state: RootState) => state.createLottery.isLotteryCreated)

    const onCreate = (obj:any) => {
        dispatch(createLottery(obj))
    }

    useEffect(() => {
        if (isCreated) {
            navigate(adminRouts.lotteryList);
        }
        return () => {
            dispatch(toggleLotteryCreateState({
                isCreated: false
            }))
        }
    },[isCreated])

    const redirectToList = () => {
        navigate(adminRouts.lotteryList);
    }

    return <Fragment>
        <HeaderSection>
        <Header title="Create a Lottery"  isBackButtonRequired={true} 
        backButtonRedirectionUrl={appEndpoints.adminRouts.lotteryList} />
        </HeaderSection>
        <LotteryContent>
            <CreateLotteryForm onCreateLottery={onCreate} onCancel={redirectToList}  />
        </LotteryContent>
    </Fragment>
};

export default CreateLottery