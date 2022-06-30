import {FC,Fragment, useState, useEffect} from 'react';
import {transformDate, tablePagination, searchTableData,sortTableValues} from '../../../Utility/Utility'
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';
import EmptyTableView from '../../../components/EmptyTableView/EmptyTableView';

import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getAuctionRequest} from '../../../features/auctionList';
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
    new TableHeader("Auction price", true, false, false, 'auctionProposedPrice'),
    new TableHeader("Requested date", false, false, false, 'Requested_date'),
    new TableHeader("Category", false, false, false, 'category'),
    new TableHeader("User Name", false, false, false, 'userName'),
    new TableHeader("Email Address", false, false, false, 'emailAddress'),
]

let tabMenuViewList = [
    {
        label: "New Auctions",
        id: "newRequest_1",
        queryParam:"A",
        isActive: true,
        isSerarchViewActive: true
    },
    {
        label: "Cancelled Auctions",
        id: "cancelledAuctions_3",
        queryParam:"D",
        isActive: false,
        isSerarchViewActive: false
    }
]


const AuctionList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let requestList = useSelector((state:RootState) => state.auction.newAuctions);
    let page = useSelector((state: RootState) => state.lotteryList.page);

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);
    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);
    const [pageNumber, setPageNumber] = useState(1);
    const [originalResponse, setOriginalResponse] = useState<any>([]);
    const [responseData, setResponse] = useState([]);
    const [totalResponseLength, setResponseLength] = useState(0)
    const [tableSearch, setSearch] = useState("")

    useEffect(() => {
        getTableData(tabMenu);
    },[]);

    useEffect(() => {
        if (requestList.length > 0) {
            setResponseLength(requestList.length);
            setOriginalResponse(requestList);
            let pagedResponse = tablePagination(requestList,1);
            if (pagedResponse.isValidResponse) {
                setResponse(pagedResponse.data);
            }
        }
    },[requestList]);

    const redirectToDetailView = (auctionId:number) => {
        navigate(adminRouts.approveAuction(auctionId))
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

        dispatch(getAuctionRequest("auctionStatus=I"));
    }

    const updatePageNumber = (pageNumber) => {
        if (originalResponse.length > 0) {
            let pagedResponse = tablePagination(originalResponse,pageNumber);
            if (pagedResponse.isValidResponse) {
                setPageNumber(pagedResponse.pageNumber);
                setResponse(pagedResponse.data);
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
        setResponse(pagedResponse.data);
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
        let idBtn =  <Button title={`#${tableRowObj.auctionId}`} 
        btnSize={ButtonSize.sm} btnVariant={ButtonVariant.primaryLink} 
        clicked={() => {redirectToDetailView(tableRowObj.auctionId)}} />;

        let status = tableRowObj.auctionType === "C" ? <TableStyle.Live>
            Live
        </TableStyle.Live> : tableRowObj.auctionType === "U" ? <TableStyle.Upcoming>
            Not Live
        </TableStyle.Upcoming> : null;

        return <tr>
            <td>
            {idBtn}
            </td>
            <td>
                &#x24; {tableRowObj.auctionProposedPrice}
            </td>
            <td>
                {transformDate(tableRowObj.auctionStartDate)}
            </td>
            <td>
                {tableRowObj.productCategory}
            </td>
            <td>
            {tableRowObj.userName}
            </td>
            <td>
            {tableRowObj.userEmailId}
            </td>
        </tr>
    })

    const setTableSearchValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const triggerSearch = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            let searchResponse = searchTableData(originalResponse,tableSearch);
           if (searchResponse.length > 0) {
            setResponse(searchResponse);
            setPageNumber(1);
            setResponseLength(searchResponse.length)
           }
        }
    }
    
    return <Fragment>
        <TableStyle.BreadcrumbSection>
        <ViewHeader title={"New Auctions"} isNeedCreateButton={true} btnText={"Test button"}
     routePath={"/"} />
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