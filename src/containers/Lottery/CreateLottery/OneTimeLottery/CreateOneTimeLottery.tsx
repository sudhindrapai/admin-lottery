import {FC, useEffect} from 'react';
import * as appEndpoints from '../../../../routs';
import ViewHeader from '../../../../components/ViewHeader/ViewHeader';
import {Container}from './StyledOneTimeLottery';
import OneTimeLotteryForm from '../../../Forms/Lottery/CreateLottery/OneTimeLottery/CreateOneTimeLottery'
import Button from '../../../../components/UI/Button/Button';
import {HeaderSection, LotteryContent} from '../RepeatedLottery/StyledCreateLottery';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../../routs'

import {createLottery,toggleLotteryCreateState} from '../../../../features/createLotterySlide';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../app/Store';

const CreateOneTimeLottery:FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isCreated = useSelector((state: RootState) => state.createLottery.isLotteryCreated);

    const onCreate = (obj:any) => {
        console.log(obj,"one time lottery");
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

    return <Container>
        <HeaderSection>
        <ViewHeader title={"Create Lottery"} isBackButtonRequired={true} backButtonRedirectionUrl={appEndpoints.adminRouts.lotteryList} />
        </HeaderSection>
        <LotteryContent>
        <OneTimeLotteryForm onCreateLottery={onCreate} onCancel={redirectToList} />
        </LotteryContent>
    </Container>
};

export default CreateOneTimeLottery