import {FC, Fragment} from 'react';

import ViewHeader from '../../../components/ViewHeader/ViewHeader';

import {adminRouts} from '../../../routs'

import {} from '../../Lottery/CreateLottery/RepeatedLottery/StyledCreateLottery';
import {HeaderView} from './StyledCreateAuction';

const CreateAuction = () => {
    return <Fragment>
        <HeaderView>
        <ViewHeader title={"Create Auction"} isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.auctionList} />
        </HeaderView>
    </Fragment>
};

export default CreateAuction
