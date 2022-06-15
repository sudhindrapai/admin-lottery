import {FC, Fragment} from 'react';
import UpdateLotteryForm from '../../Forms/Lottery/UpdateLottery/UpdateLottery';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {Breadcrumbs} from './StyledUpdateLottery';
import {adminRouts} from '../../../routs';

import {useNavigate} from 'react-router-dom';
const UpdateLottery = () => {

    const navigate = useNavigate();

    const onUpdateLottery = () => {

    }


    return <Fragment>
        <Breadcrumbs>
        <ViewHeader title={"123123"} isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.lotteryList} />
        </Breadcrumbs>
        <UpdateLotteryForm onCreateLottery={onUpdateLottery} onCancel={() => {navigate(adminRouts.lotteryList)}} />
    </Fragment>
};

export default UpdateLottery;