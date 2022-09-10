import {FC, useEffect, useState} from 'react';
import * as appEndpoints from '../../../../routs';
import ViewHeader from '../../../../components/ViewHeader/ViewHeader';
import {Container}from './StyledOneTimeLottery';
import OneTimeLotteryForm from '../../../Forms/Lottery/CreateLottery/OneTimeLottery/CreateOneTimeLottery'
import Button from '../../../../components/UI/Button/Button';
import {HeaderSection, LotteryContent} from '../RepeatedLottery/StyledCreateLottery';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../../routs'

import {createLottery,toggleLotteryCreateState} from '../../../../features/createLotterySlide';
import {getSettingsData} from '../../../../features/settingsSlice';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../app/Store';

const CreateOneTimeLottery:FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isCreated = useSelector((state: RootState) => state.createLottery.isLotteryCreated);
    const ticketDetails = useSelector((state:RootState) => state.settings.data);

    const [lotteryTicketDetails, setTicketDetails] = useState<any>([])

    const onCreate = (obj:any) => {
        dispatch(createLottery(obj))
    }

    useEffect(() => {
        if (ticketDetails.length === 0) {
            dispatch(getSettingsData());
        } else {
            let lotteryTicketDetails = ticketDetails.filter((ticketObj) => {
                return ticketObj.settingFor === "LOTTERY"
            });
            console.log(lotteryTicketDetails,"lotteryTicketDetails")
            setTicketDetails(lotteryTicketDetails);
        }
    },[ticketDetails]);

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
        <OneTimeLotteryForm ticketObj={lotteryTicketDetails} onCreateLottery={onCreate} onCancel={redirectToList} />
        </LotteryContent>
    </Container>
};

export default CreateOneTimeLottery