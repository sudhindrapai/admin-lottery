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

import {GraphList, GraphWrapper, Card, CardsList,HeaderWrapper,
    VerticalButton,GraphButton,GraphRow,GraphYaxis, GraphYButton} from './StyledDashboard';

const exceptCards = ["totalUsers","goldUsers","regularUsers", "totalLotteries",
"upcomingLotteres","currentLotteries","executedLotteries","deletedLotteries"];

const graph1HorizontalBtns = [
    {
        label:"Y",
        id:'year',
        isSelected:true
    },
    {
        label:"M",
        id:'month',
        isSelected:false
    },
    {
        label:"D",
        id:'day',
        isSelected:false
    }
]

const lineGraphXButtons = [
    {
        label: "Users",
        id:'users',
        isSelected:true
    },
    {
        label: "Lottery",
        id:'lottery',
        isSelected:false
    },
    {
        label: "Auction",
        id:'auction',
        isSelected:false
    },
    {
        label: "Gold Member",
        id:'goldMember',
        isSelected:false
    },
    {
        label: "Registration",
        id:'registration',
        isSelected:false
    }
];

const Dashboard:FC = () => {
    const dispatch = useDispatch();

    const dashboardData:any = useSelector((state:RootState) => state.dashboard.data);

    const [useData, setUserDatea] = useState<any>({});
    const [lotteriesData, setLotteriesData] = useState({});

    const [graph1X, setGraph1X] = useState(lineGraphXButtons);
    const [graph1Y, setGraph1Y] = useState(graph1HorizontalBtns)

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

    const lineGraphXaxisButtons = graph1X.map((btnObj) =>{
        return <GraphButton isSelected={btnObj.isSelected}>
            {btnObj.label}
        </GraphButton>
    });

    const lineGraphYaxisButtons = graph1Y.map((timeObj) => {
        return <GraphYButton></GraphYButton>
    })

    return <>
    <HeaderWrapper>
    <ViewHeader title={"Dashboard"} />
    </HeaderWrapper>
    <GraphList>
        <GraphRow>
        <GraphWrapper>
            <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
            <LineGraph />
        </GraphWrapper>
        <GraphWrapper>
        <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
        {Object.keys(lotteriesData).length > 0 && 
        <DoughnutChart label={`User Details (total users: ${dashboardData.totalUsers})`} detail={useData} />}
        </GraphWrapper>
        </GraphRow>
        <GraphRow>
        <GraphWrapper>
        <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
        {Object.keys(lotteriesData).length > 0 && 
        <PieGraph label={`User Details (total users: ${dashboardData.totalUsers})`} detail={useData} />}
        </GraphWrapper>
        <GraphWrapper>
        <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
        {Object.keys(useData).length > 0 && 
        <BarChart label={`Lottery details (total lotteries: ${dashboardData.totalLotteries})`} detail={lotteriesData} />}
        </GraphWrapper>
        </GraphRow>
        </GraphList>
        <CardsList>
            {cardsView}
        </CardsList>
        </>
};

export default Dashboard