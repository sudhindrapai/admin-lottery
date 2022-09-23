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
    VerticalButton,GraphButton,GraphRow,GraphYaxis, GraphYButton,GraphItem,Label} from './StyledDashboard';

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


const doughtChatXasisButton = [
    {
        label: "Users",
        id:'users',
        isSelected:true,
        results:[]
    },
    {
        label: "Gold Members",
        id:'goldMembers',
        isSelected:false,
        results:[]
    },
    {
        label: "Lottery Income",
        id:'lotteryIncome',
        isSelected:false,
        results:[]
    },
    {
        label: "Auction income",
        id:'auctionIncome',
        isSelected:false,
        results:[]
    }
];


const Dashboard:FC = () => {
    const dispatch = useDispatch();

    const dashboardData:any = useSelector((state:RootState) => state.dashboard.data);

    const [userData, setUserDatea] = useState<any>({});
    const [lotteriesData, setLotteriesData] = useState({});

    const [graph1X, setGraph1X] = useState(lineGraphXButtons);
    const [graph1Y, setGraph1Y] = useState(graph1HorizontalBtns);

    // ----
    const [donughtXasisButtons, setXDoughtnutButton] = useState([])

    let cardsView:any = <div></div>

    const updateDoughtnutChartData = (dataObj,doughtChatXasisButton) => {
        if (donughtXasisButtons.length === 0) {
            let updatedObj = doughtChatXasisButton.map((data) => {
                return {
                    ...data,
                    results:dataObj[data.id]
                }
            });
            console.log(updatedObj)
            setXDoughtnutButton(updatedObj);
        }
    }

    if (dashboardData !== undefined && Object.keys(dashboardData).length > 0) {

        // code to set doughtnut graph data
        if (Object.keys(userData).length === 0) {
            setUserDatea({
                goldUsers: dashboardData.goldUsers,
                regularUsers: dashboardData.regularUsers
            });
        }

        let doughtnutDataObj = {
            users: dashboardData.countrywiseUsers,
            goldMembers: dashboardData.countrywiseGoldUsers,
            lotteryIncome:dashboardData.countrywiseLotteryIncome,
            auctionIncome:dashboardData.countrywiseAuctionIncome
        }
        
        updateDoughtnutChartData(doughtnutDataObj,doughtChatXasisButton);
        // end code to set doughtnut graph data

    //     if (Object.keys(lotteriesData).length === 0) {
    //         setLotteriesData({
    //             upcomingLotteres:dashboardData.upcomingLotteres,
    //             currentLotteries:dashboardData.currentLotteries,
    //             executedLotteries:dashboardData.executedLotteries,
    //             deletedLotteries:dashboardData.deletedLotteries
    //         })
    //     }

    //     let keys = Object.keys(dashboardData).filter((kayName) => {
    //         return exceptCards.includes(kayName) === false;
    //     })
    //     cardsView = keys.map((keyName) => {
    //         return <Card>
    //             <DashboardCard label={keyName} count={dashboardData[keyName]} isNeedToShowDollarSign={false} />
    //             </Card>
    //     })
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
        return <GraphYButton>{timeObj.label}</GraphYButton>
    });


    const doughtnutYAxisButton = donughtXasisButtons.map((obj:any) => {
        return <GraphButton isSelected={obj.isSelected}>{obj.label}</GraphButton>
    })

    return <>
    <HeaderWrapper>
    <ViewHeader title={"Dashboard"} />
    </HeaderWrapper>
    <GraphList>
    <GraphRow>
    <GraphWrapper>
    <GraphItem>
    <VerticalButton>
                {doughtnutYAxisButton}
            </VerticalButton>
            {donughtXasisButtons.length > 0 &&
            <DoughnutChart label={`Users by country`} detail={donughtXasisButtons} />}
    </GraphItem>
    <GraphItem>
    <GraphYaxis>
                    <Label>
                        Time
                    </Label>
               </GraphYaxis>
    </GraphItem>
    </GraphWrapper>
    </GraphRow>
    </GraphList>
    {/* <GraphList>
        <GraphRow>
        <GraphWrapper>
            <GraphItem>
            <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
            <LineGraph />
            </GraphItem>
            <GraphItem>
                <GraphYaxis>
                    <Label>
                        Time
                    </Label>
               {lineGraphYaxisButtons}
               </GraphYaxis>
            </GraphItem>
        </GraphWrapper>
        <GraphWrapper>
        <GraphItem>
        <VerticalButton>
                {lineGraphXaxisButtons}
        </VerticalButton>
        {Object.keys(lotteriesData).length > 0 && 
        
        </GraphItem>
        <GraphItem>
        <GraphYaxis>
                    <Label>
                        Time
                    </Label>
               {lineGraphYaxisButtons}
               </GraphYaxis>
            </GraphItem>
        </GraphWrapper>
        </GraphRow>

        <GraphRow>
        <GraphWrapper>
        <GraphItem>
        <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
        {Object.keys(lotteriesData).length > 0 && 
        <PieGraph label={`User Details (total users: ${dashboardData.totalUsers})`} detail={userData} />}
        </GraphItem>
        <GraphItem>
        <GraphYaxis>
                    <Label>
                        Time
                    </Label>
               {lineGraphYaxisButtons}
               </GraphYaxis>
            </GraphItem>
        </GraphWrapper>
        <GraphWrapper>
        <GraphItem>
        <VerticalButton>
                {lineGraphXaxisButtons}
            </VerticalButton>
        {Object.keys(userData).length > 0 && 
        <BarChart label={`Lottery details (total lotteries: ${dashboardData.totalLotteries})`} detail={lotteriesData} />}
        </GraphItem>
        <GraphItem>
        <GraphYaxis>
                    <Label>
                        Time
                    </Label>
               {lineGraphYaxisButtons}
               </GraphYaxis>
            </GraphItem>
        </GraphWrapper>
        </GraphRow>
        </GraphList> */}
        {/* <CardsList>
            {cardsView}
        </CardsList> */}
        </>
};

export default Dashboard