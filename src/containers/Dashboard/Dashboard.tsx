import {FC, useEffect, useState} from 'react';
import  BarChart from '../../components/Graphs/BarChart/BarChart';
import ViewHeader from '../../components/ViewHeader/ViewHeader';
import {PieGraph} from '../../components/Graphs/PieChart/PieChart';
import {LineGraph} from '../../components/Graphs/LineGraph/LineGraph'
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import {DoughnutChart} from '../../components/Graphs/DoughnutChart/DoughnutChart';
import {RootState} from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getDashboardData} from '../../features/dashboard';

import {GraphList, GraphWrapper, Card, CardsList,HeaderWrapper} from './StyledDashboard';

const exceptCards = ["totalUsers","goldUsers","regularUsers", "totalLotteries",
"upcomingLotteres","currentLotteries","executedLotteries","deletedLotteries"];

const Dashboard:FC = () => {
    const dispatch = useDispatch();

    const dashboardData:any = useSelector((state:RootState) => state.dashboard.data);

    const [useData, setUserDatea] = useState<any>({});
    const [lotteriesData, setLotteriesData] = useState({});

    let cardsView:any = <div></div>

    if (dashboardData !== undefined && Object.keys(dashboardData).length > 0) {
        if (Object.keys(useData).length === 0) {
            setUserDatea({
                goldUsers: dashboardData.goldUsers,
                regularUsers: dashboardData.regularUsers
            });
        }

        if (Object.keys(lotteriesData).length === 0) {
            setLotteriesData({
                upcomingLotteres:dashboardData.upcomingLotteres,
                currentLotteries:dashboardData.currentLotteries,
                executedLotteries:dashboardData.executedLotteries,
                deletedLotteries:dashboardData.deletedLotteries
            })
        }

        let keys = Object.keys(dashboardData).filter((kayName) => {
            return exceptCards.includes(kayName) === false;
        })
        cardsView = keys.map((keyName) => {
            return <Card>
                <DashboardCard label={keyName} count={dashboardData[keyName]} isNeedToShowDollarSign={false} />
                </Card>
        })
    }

    useEffect(() => {
        dispatch(getDashboardData())
    },[]);

    return <>
    <HeaderWrapper>
    <ViewHeader title={"Dashboard"} />
    </HeaderWrapper>
    <GraphList>
        <GraphWrapper>
            <LineGraph />
        </GraphWrapper>
        <GraphWrapper>
        {Object.keys(lotteriesData).length > 0 && 
        <DoughnutChart label={`User Details (total users: ${dashboardData.totalUsers})`} detail={useData} />}
        </GraphWrapper>
        <GraphWrapper>
        {Object.keys(useData).length > 0 && 
        <BarChart label={`Lottery details (total lotteries: ${dashboardData.totalLotteries})`} detail={lotteriesData} />}
        </GraphWrapper>
        <GraphWrapper>
        {Object.keys(lotteriesData).length > 0 && 
        <PieGraph label={`User Details (total users: ${dashboardData.totalUsers})`} detail={useData} />}
        </GraphWrapper>
        </GraphList>
        <CardsList>
            {cardsView}
        </CardsList>
        </>
};

export default Dashboard