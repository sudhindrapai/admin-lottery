import {FC, Fragment, useEffect, useState} from 'react';
import Header from '../../../../components/ViewHeader/ViewHeader';
import {HeaderSection, LotteryContent} from './StyledCreateLottery';
import * as appEndpoints from '../../../../routs';
import CreateLotteryForm from '../../../Forms/Lottery/CreateLottery/RepeatedLottery/CreateRepeatedLottery';


import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../../routs'

import {createLottery,toggleLotteryCreateState} from '../../../../features/createLotterySlide';
import {getSettingsData} from '../../../../features/settingsSlice'
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../app/Store';

import {transformGMTToUTC} from '../../../../Utility/Utility';
import {validateCreateRepeatLottery} from '../../../../Utility/formValidation';
import {NotificationType} from '../../../../Utility/InterFacesAndEnum';
import {toggleNotificationVisibility} from '../../../../features/networkNotification';

const weekNames = ["Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday","Sunday"];

const CreateLottery:FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isCreated = useSelector((state: RootState) => state.createLottery.isLotteryCreated);
    const ticketDetails = useSelector((state:RootState) => state.settings.data);

    const [lotteryTicketDetails, setTicketDetails] = useState<any>([])

    const onCreate = (obj:any) => {
        let validatedObj = validateCreateRepeatLottery(obj);
        if (validatedObj.status) {

            let updatedPayload = {
                ...obj
            }

            for (let objKey in updatedPayload) {
                if (objKey === "lotteryEndTime" || objKey === "lotteryStartTime") {
                    if (updatedPayload[objKey] === "") {
                        updatedPayload[objKey] = "";
                    } else {
                        updatedPayload[objKey] = (transformGMTToUTC(updatedPayload[objKey]));
                    }
                }
            }

            updatedPayload = {
                ...obj,
                lotteryEndDay: weekNames.indexOf(obj.lotteryEndDay) + 1,
                lotteryStartDay: weekNames.indexOf(obj.lotteryStartDay) + 1
            }

            dispatch(createLottery(updatedPayload))
        } else {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: validatedObj.message
            }));
        }
    }

    useEffect(() => {
        if (ticketDetails.length === 0) {
            dispatch(getSettingsData());
        } else {
            let lotteryTicketDetails = ticketDetails.filter((ticketObj) => {
                return ticketObj.settingFor === "LOTTERY"
            });
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

    return <Fragment>
        <HeaderSection>
        <Header title="Create a Lottery"  isBackButtonRequired={true} 
        backButtonRedirectionUrl={appEndpoints.adminRouts.gamesList} />
        </HeaderSection>
        <LotteryContent>
            <CreateLotteryForm ticketObj={lotteryTicketDetails} onCreateLottery={onCreate} onCancel={redirectToList}  />
        </LotteryContent>
    </Fragment>
};

export default CreateLottery