import {FC, useEffect, useMemo, useState} from 'react';
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
    VerticalButton,GraphButton,GraphRow,GraphYaxis, GraphYButton,GraphItem,Label, BtnSection, RefreshBtn} from './StyledDashboard';

const exceptCards = ["yearwiseAuctionTicketsCount","monthwiseAuctionTicketsCount","daywiseAuctionTicketsCount","yearwiseLotteryTicketsCount","monthwiseLotteryTicketsCount","countrywiseUsers","countrywiseGoldUsers","countrywiseLotteryIncome","countrywiseAuctionIncome","goldUsers","regularUsers","monthwiseRegistartionsCount","yearwiseRegistartionsCount",
"daywiseRegistartionsCount","yearwiseExecutedAuctionsCount","monthwiseExecutedAuctionsCount","daywiseLotteryTicketsCount",
"daywiseExecutedAuctionsCount","yearwiseExecutedLotteriesCount",'monthwiseExecutedLotteriesCount',"daywiseExecutedLotteriesCount","goldUsers","regularUsers"];

const linegraphXaxis = [
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

const lineGraphYButtons = [
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

const usersDoughtnutGraphXaxisButton = [
    {
        label: "Users",
        id:'users',
        isSelected:true,
        results:[]
    },
    {
        label: "Tickets",
        id:'tickets',
        isSelected:false,
        results:[]
    }
];


const Dashboard:FC = () => {
    const dispatch = useDispatch();

    const dashboardData:any = useSelector((state:RootState) => state.dashboard.data);

    const [userData, setUserDatea] = useState<any>({});
    const [lotteriesData, setLotteriesData] = useState({});

    const [graph1X, setGraph1X] = useState(linegraphXaxis);
    const [graph1Y, setGraph1Y] = useState(lineGraphYButtons);
    const [lineGraphData, setLineGraphData] = useState({})

    const [usersDoughtnutData,setUsersDoughtnutData] = useState<any>([]);

    const [cardsList, setCardsList] = useState<any>([]);
    const [auctionCardList, setAuctionCardList] = useState<any>([])

    // ----
    const [donughtXasisButtons, setXDoughtnutButton] = useState<any>([])

    const updateDoughtnutChartData = (dataObj,doughtChatXasisButton) => {
        if (donughtXasisButtons.length === 0) {
            let updatedObj = doughtChatXasisButton.map((data) => {
                return {
                    ...data,
                    results:dataObj[data.id]
                }
            });
            setXDoughtnutButton(updatedObj);
        }
    }


    if (dashboardData !== undefined && Object.keys(dashboardData).length > 0) {

        let cardsListNames = ["totalUsers","executedLotteries",
        "executedLotteriesTotalRewardPrice","executedLotteriesTotalTicketsPrice",
        "executedLotteriesTotalTicketsSold"];
        // code to set cards list
        if (cardsList.length === 0) {
            // let keysList = Object.keys(dashboardData).filter((key) => {
            //     return exceptCards.indexOf(key) === -1
            // })
            setCardsList(cardsListNames);
            setAuctionCardList(["executedAuctions","executedAuctionsTotalRewardPrice",
            "executedAuctionsTotalTicketsPrice","executedAuctionsTotalTicketsSold"])
        }


        // end code to set cards list

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

        
        // code for line graph
        if (Object.keys(lineGraphData).length === 0) {
        let lineGraphValues = {
            yearwiseRegistartionsCount:dashboardData.yearwiseRegistartionsCount,
            monthwiseRegistartionsCount:dashboardData.monthwiseRegistartionsCount,
            daywiseRegistartionsCount: dashboardData.daywiseRegistartionsCount,
            yearwiseExecutedAuctionsCount:dashboardData.yearwiseExecutedAuctionsCount,
            monthwiseExecutedAuctionsCount:dashboardData.monthwiseExecutedAuctionsCount,
            daywiseExecutedAuctionsCount:dashboardData.daywiseExecutedAuctionsCount,
            yearwiseExecutedLotteriesCount:dashboardData.yearwiseExecutedLotteriesCount,
            monthwiseExecutedLotteriesCount:dashboardData.monthwiseExecutedLotteriesCount,
            daywiseExecutedLotteriesCount:dashboardData.daywiseExecutedLotteriesCount
        }

        setLineGraphData(lineGraphValues);
    }
        //  end code for line graph

        // dougtnut users graph

        const mapUsersDoughtnutGraph = (usersData) => {
            let updatedArray = usersDoughtnutGraphXaxisButton.map((obj) => {
                return{
                    ...obj,
                    results:[usersData[obj.id]]
                }
            });
            if (usersDoughtnutData.length === 0){
                setUsersDoughtnutData(updatedArray);
            }
        }

        // if (usersDoughtnutData.length === 0) {
            let usersData = {users:{
                usersGoldMembers:dashboardData.goldUsers,
                usersRegularMembers:dashboardData.regularUsers,
            },
            tickets:{
                executedLotteriesPlatinumTicketsSold:dashboardData.executedLotteriesPlatinumTicketsSold,
                executedLotteriesGoldTicketsSold:dashboardData.executedLotteriesGoldTicketsSold,
                executedLotteriesSilverTicketsSold:dashboardData.executedLotteriesSilverTicketsSold,
                executedLotteriesBronzeTicketsSold:dashboardData.executedLotteriesBronzeTicketsSold
            }
        }
            mapUsersDoughtnutGraph(usersData)
        // }

        // end doughtnut users graph

    }

    useEffect(() => {
        dispatch(getDashboardData())
    },[]);

    const RereshData = () => {
        dispatch(getDashboardData())
    }

    // linegraphCode Starts
    const lineGraphXaxisButtons = graph1X.map((obj) =>{
        return <GraphButton onClick={() => {updateLineGraphXValue(obj)}}  isSelected={obj.isSelected}>
            {obj.label}
        </GraphButton>
    });

    const lineGraphYaxisButtons = graph1Y.map((obj) => {
        return <GraphButton onClick={() => {updateLineGraphYValue(obj)}}  isSelected={obj.isSelected} >{obj.label}</GraphButton>
    });

    const updateLineGraphYValue = (selectedObj:any) => {
        setGraph1Y(graph1Y.map((obj) => {
            return {
                ...obj,
                isSelected:obj.id === selectedObj.id
            }
        }))
    }

    const updateLineGraphXValue = (selectedObj:any) => {
        setGraph1X(graph1X.map((obj) => {
            return {
                ...obj,
                isSelected:obj.id === selectedObj.id
            }
        }))
    }

    // end linegraph code

    // doughtnut graph code
    const updateDoughtnutGraphValue = (selectedObj:any) => {
        let updatedData = donughtXasisButtons.map((obj:any) => {
            return {...obj,
                isSelected:obj.id === selectedObj.id
            }
        });

        setXDoughtnutButton([...updatedData]);
    };

    const doughtnutYAxisButton = donughtXasisButtons.map((obj:any) => {
        return <GraphButton onClick={() => {updateDoughtnutGraphValue(obj)}} isSelected={obj.isSelected}>
            {obj.label}
            </GraphButton>
    })

    let doughtnutGraph = useMemo(() => {
        return <DoughnutChart label={`Users by country`} detail={donughtXasisButtons} />
    },[donughtXasisButtons]);

    // end doughtnut graph code

    // users doughtnut graph code starts

    const updateUsersPiechartYaxisValue = (selectedObj:any) => {
        let updatedData = usersDoughtnutData.map((obj:any) => {
            return {...obj,
                isSelected:obj.id === selectedObj.id
            }
        });
        setUsersDoughtnutData([...updatedData]);
    }
    
    let usersDoughtnutGraphYAxisButtons = usersDoughtnutData.map((obj:any) => {
        return <GraphButton onClick={() => {updateUsersPiechartYaxisValue(obj)}} isSelected={obj.isSelected}>
            {obj.label}
            </GraphButton>
    })

    // end users doughtnut graph code


    // cards view
    let cardsView = cardsList.map((cardKey) => {
        return <Card>
            <DashboardCard count = {dashboardData[cardKey]} label={cardKey} isNeedToShowDollarSign={false} />
            </Card>
    });

    let auctionCards = auctionCardList.map((cardKey) => {
        return <Card>
        <DashboardCard count = {dashboardData[cardKey]} label={cardKey} isNeedToShowDollarSign={false} />
        </Card>
    })
    // end cards view

    return <>
    <HeaderWrapper>
    <ViewHeader title={"Dashboard"} />
    <BtnSection>
        <RefreshBtn onClick={RereshData}>
            Refresh
        </RefreshBtn>
    </BtnSection>
    </HeaderWrapper>
    <h3>
            Lottery
        </h3>
    <CardsList>
        {cardsView}
    </CardsList>
    <h3>
            Auction
        </h3>
    <CardsList>
        {auctionCards}
    </CardsList>
    <GraphList>
    <GraphRow>
    <GraphWrapper>
    <GraphItem>
    <VerticalButton>
                {doughtnutYAxisButton}
            </VerticalButton>
            {doughtnutGraph}
    </GraphItem>
    <GraphItem>
    <GraphYaxis>
                    <Label>
                        Country
                    </Label>
               </GraphYaxis>
    </GraphItem>
    </GraphWrapper>
    {/* End doughtnut graph */}
    {/* ------------------------------------------------ */}
    <GraphWrapper>
    <GraphItem>
    <VerticalButton>
                {lineGraphYaxisButtons}
            </VerticalButton>
            <LineGraph graph1X={graph1X}  graph1Y={graph1Y} lineGraphData={lineGraphData}/>
    </GraphItem>
    <GraphItem>
    <GraphYaxis>
                    <Label>
                        Time
                    </Label>
                    {lineGraphXaxisButtons}
               </GraphYaxis>
    </GraphItem>
    </GraphWrapper>
    </GraphRow>
    </GraphList>

    <GraphList>
        <GraphRow>
        <GraphWrapper>
    <GraphItem>
    <VerticalButton>
                {usersDoughtnutGraphYAxisButtons}
            </VerticalButton>
            {usersDoughtnutData.length > 0 && <PieGraph label={`User`} detail={usersDoughtnutData} />}
    </GraphItem>
    </GraphWrapper>

    <GraphWrapper>
    <GraphItem>
    <VerticalButton>
                {usersDoughtnutGraphYAxisButtons}
            </VerticalButton>
            {usersDoughtnutData.length > 0 && <BarChart label={`User`} detail={usersDoughtnutData} />}
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