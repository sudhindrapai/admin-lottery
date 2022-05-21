import {FC, Fragment, useState} from 'react';
import Header from '../../../../components/ViewHeader/ViewHeader';
import {HeaderSection, LotteryContent} from './StyledCreateLottery';
import Button from '../../../../components/UI/Button/Button';
import * as appEndpoints from '../../../../routs';
import CreateLotteryForm from '../../../Forms/Lottery/CreateLottery/RepeatedLottery/CreateRepeatedLottery';

enum ButtonSize {
    sm = "small",
    md = "medium",
    lg = "large"
}
enum ButtonVariant {
    primaryFilled = "primary-filled",
    secondary = "secondary",
    primaryLink = "primaryLink"
}

const CreateLottery:FC = () => {
    const validateCreateLotteryReq = () => {}

    return <Fragment>
        
        <HeaderSection>
        <Header title="Create a Lottery"  isBackButtonRequired={true} 
        backButtonRedirectionUrl={appEndpoints.adminRouts.lotteryList} />
        <Button title={"Create"} btnSize={ButtonSize.lg} btnVariant={ButtonVariant.primaryFilled} clicked={validateCreateLotteryReq} />
        </HeaderSection>
        <LotteryContent>
            <CreateLotteryForm />
        </LotteryContent>
    </Fragment>
};

export default CreateLottery