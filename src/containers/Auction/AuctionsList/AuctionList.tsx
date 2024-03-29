import {FC,Fragment, useState, useEffect} from 'react';
import {transformDate,tablePagination,searchTableData, sortTableValues} from '../../../Utility/Utility'
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import EmptyTableView from '../../../components/EmptyTableView/EmptyTableView';

import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getAuctions} from '../../../features/auctionList';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs';

import * as TableStyle from '../../Lottery/LotteryList/StyledLottery';


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

class TableHeader{
    constructor(public label:string, public isSortRequired: boolean, public isAscSorted: boolean, public isDscSorted:boolean, public id: string){}
}

let tableHeaders = [
    new TableHeader("Auction ID", true, true, false, 'auctionId'),
    new TableHeader("Auction price", true, false, false, 'auctionPrice'),
    new TableHeader("Start date", false, false, false, 'Start_date'),
    new TableHeader("End date", false, false, false, 'End_date'),
    new TableHeader("Received amount", true, false, false, 'amountCollected'),
    new TableHeader("users joined", true, false, false, 'noOfUsersJoined'),
    new TableHeader("Status", false, false, false, 'Status')
]

let tabMenuViewList = [
    {
        label: "Live Auctions",
        id: "winnerAuctions_2",
        queryParam:"C",
        isActive: true,
        isSerarchViewActive: false
    },
    {
        label: "Upcoming Auctions",
        id: "cancelledAuctions_3",
        queryParam:"U",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Excuted Auctions",
        id: "pendingAuctons_4",
        queryParam:"E",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Cancelled",
        id: "CancelledAuctons_5",
        queryParam:"D",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "All",
        id: "all_1",
        queryParam:"A",
        isActive: false,
        isSerarchViewActive: true
    }
]


const AuctionList:FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let auctionList = useSelector((state:RootState) => state.auction.auctions);

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);
    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);
    const [originalResponse, setOriginalResponse] = useState<any>([]);
    const [responseData, setResponseData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResponseLength, setResponseLength] = useState(0)
    const [tableSearch, setSearch] = useState("")

    useEffect(() => {
        getTableData(tabMenu);
    },[]);

    useEffect(() => {
        if (auctionList.length > 0) {
            setResponseLength(auctionList.length);
            setOriginalResponse(auctionList);
            let pagedResponse = tablePagination(auctionList,1);
            if (pagedResponse.isValidResponse) {
                setResponseData(pagedResponse.data);
            }
        } else {
            setResponseData([]);
        }
    },[auctionList]);

    const redirectToView = (path: string) => {
        navigate(path);
    };

    const redirectToDetailView = (auctionId:number, status:string) => {
        if (status !== "U") return
        navigate(adminRouts.updateAuction(auctionId));
    }

    const updateTabMenuOption = (selectedMenuId) => {
        let updatedMenuArray = tabMenu.map((menuObj) => {
            return {
                ...menuObj,
                isActive: menuObj.id === selectedMenuId
            }
        });
        getTableData(updatedMenuArray)
        setTabMenu(updatedMenuArray);
    };

    const getTableData = (tabObj) => {
        let selectedObj = tabObj.filter((tabObj) => {
            return tabObj.isActive
        })[0];

        dispatch(getAuctions(`auctionStatus=${selectedObj.queryParam}`));
    }

    const updatePageNumber = (pageNumber) => {
        if (originalResponse.length > 0) {
            let pagedResponse = tablePagination(originalResponse,pageNumber);
            if (pagedResponse.isValidResponse) {
                setPageNumber(pagedResponse.pageNumber);
                setResponseData(pagedResponse.data);
            }
        }
    };

    let tabMenuView = tabMenu.map((menuObj) => {
        return <TableStyle.MenuOption onClick={() => {updateTabMenuOption(menuObj.id)}} 
        isActive={menuObj.isActive} key={menuObj.id} >{menuObj.label}</TableStyle.MenuOption>
    });

    const sortTable = (id:string, isSortAsc:boolean) => {
        let sortedArray:any = sortTableValues(originalResponse, id, !isSortAsc);
        setPageNumber(1);
        setOriginalResponse(sortedArray);
        // tableHeaderValues, setHeaderValues
        let pagedResponse = tablePagination(sortedArray,1);
        setResponseData(pagedResponse.data);
        let updatedTableHeaders:any = [];
        for (let headerObj of tableHeaderValues) {
            if (headerObj.id === id) {
               
                let updatedObj = {
                    ...headerObj,
                    isAscSorted: !isSortAsc,
                    isDscSorted: isSortAsc
                }
                updatedTableHeaders.push(updatedObj);
            } else {
                let updatedObj = {
                    ...headerObj,
                    isAscSorted: false,
                    isDscSorted: false
                } 
                updatedTableHeaders.push(updatedObj)
            }
        }
        setHeaderValues(updatedTableHeaders);
    }

    let tableBody = responseData.map((tableRowObj:any) => {
        let idBtn = tableRowObj.auctionId;
        if (tableRowObj.auctionStatus === "U") {
            idBtn =  <Button title={`#${tableRowObj.auctionId}`} 
        btnSize={ButtonSize.sm} btnVariant={ButtonVariant.primaryLink} 
        clicked={() => {redirectToDetailView(tableRowObj.auctionId, tableRowObj.auctionStatus)}} />;
        }

        let status = tableRowObj.auctionStatus === "C" ? <TableStyle.Live>
            Live
        </TableStyle.Live> : tableRowObj.auctionStatus === "U" ? <TableStyle.Upcoming>
            Not Live
        </TableStyle.Upcoming> : null;

        return <tr>
            <td>
            {idBtn}
            </td>
            <td>
                &#x24; {tableRowObj.auctionPrice? tableRowObj.auctionPrice : 0}
            </td>
            <td>
                {transformDate(tableRowObj.auctionStartDate)}
            </td>
            <td>
                {transformDate(tableRowObj.auctionEndDate)}
            </td>
            <td>
            <TrafficLight 
            maxAmount={tableRowObj.auctionPrice? tableRowObj.auctionPrice : 0} 
            compareAmount={tableRowObj.amountCollected? tableRowObj.amountCollected : 0} />
            &#x24; {tableRowObj.amountCollected? tableRowObj.amountCollected : 0}
            </td>
            <td>
                <TableStyle.NumberOfUsers>
                    {tableRowObj.noOfUsersJoined}
                </TableStyle.NumberOfUsers>
            </td>
            <td>
                {status}
            </td>
        </tr>
    });

    const setTableSearchValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const triggerSearch = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            let searchResponse = searchTableData(originalResponse,tableSearch);
           if (searchResponse.length > 0) {
            setResponseData(searchResponse);
            setPageNumber(1);
            setResponseLength(searchResponse.length)
           }
        }
    }

    
    return <Fragment>
        <TableStyle.BreadcrumbSection>
        <ViewHeader title={"Auctions"} isNeedCreateButton={true} btnText={"Test button"}
     routePath={adminRouts.createAuction} />
     <Button title={"+ Create Auction"} btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
     clicked={() => {redirectToView(adminRouts.createAuction)}} />
        </TableStyle.BreadcrumbSection>
        <TableStyle.ContentSection>
            <TableStyle.SearchSectionContainer>
                <TableStyle.Input value={tableSearch} onKeyDown={triggerSearch} 
                onChange={setTableSearchValue}  placeholder={"Search"} />
            </TableStyle.SearchSectionContainer>
        <TableStyle.TabMenuContainer>
        {tabMenuView}
        </TableStyle.TabMenuContainer>
        <TableStyle.TableWrapper>
            <TableStyle.Table>
            <TableHeaderComponent headers={tableHeaderValues} onToggleSort={sortTable} />
            <TableStyle.Tbody>
                {tableBody}
            </TableStyle.Tbody>
            </TableStyle.Table>
            {responseData.length === 0 && <EmptyTableView />}
            <TableFooter totalCount={totalResponseLength} currentPageNumber={pageNumber} updatePageNumber={updatePageNumber} />
        </TableStyle.TableWrapper>
        </TableStyle.ContentSection>
    </Fragment>
};

export default AuctionList