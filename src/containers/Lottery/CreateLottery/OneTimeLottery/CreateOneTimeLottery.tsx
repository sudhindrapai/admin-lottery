import {FC} from 'react';
import * as appEndpoints from '../../../../routs';
import ViewHeader from '../../../../components/ViewHeader/ViewHeader';
import {Container}from './StyledOneTimeLottery';
import OneTimeLotteryForm from '../../../Forms/Lottery/CreateLottery/OneTimeLottery/CreateOneTimeLottery'
import Button from '../../../../components/UI/Button/Button';
import {HeaderSection, LotteryContent} from '../RepeatedLottery/StyledCreateLottery';

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

const CreateOneTimeLottery:FC = () => {

    const validateCreateLotteryReq = () => {}

    return <Container>
        <HeaderSection>
        <ViewHeader title={"Create Lottery"} isBackButtonRequired={true} backButtonRedirectionUrl={appEndpoints.adminRouts.lotteryList} />
        <Button title={"Create"} btnSize={ButtonSize.lg} btnVariant={ButtonVariant.primaryFilled} clicked={validateCreateLotteryReq} />
        </HeaderSection>
        <LotteryContent>
        <OneTimeLotteryForm />
        </LotteryContent>
    </Container>
};

export default CreateOneTimeLottery