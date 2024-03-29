
import {FC, useState, useEffect} from 'react';
import {transformDate,tablePagination,searchTableData, sortTableValues} from '../../../Utility/Utility'
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';
import EmptyTableView from '../../../components/EmptyTableView/EmptyTableView';

import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getUserList} from '../../../features/Users'

import {Wrapper, Container} from './StyledPushNotification';
import * as TableStyle from '../../Lottery/LotteryList/StyledLottery';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs';

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
    new TableHeader("User ID", true, true, false, 'userId'),
    new TableHeader("User Name", true, false, false, 'userName'),
    new TableHeader("Joined date", false, false, false, 'joinedDate'),
    new TableHeader("Total Purchased", false, false, false, 'totalPurchased'),
    new TableHeader("Joined Lotteries", true, false, false, 'joinedLotteries'),
    new TableHeader("Joined Auction", true, false, false, 'joinedAuction'),
    new TableHeader("Membership", false, false, false, 'membership')
]

let tabMenuViewList = [
    {
        label: "All",
        id: "winnerAuctions_2",
        queryParam:"C",
        isActive: true,
        isSerarchViewActive: false
    },
    {
        label: "Gold Members",
        id: "cancelledAuctions_3",
        queryParam:"U",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Regular Members",
        id: "pendingAuctons_4",
        queryParam:"E",
        isActive: false,
        isSerarchViewActive: false
    }
]


const UserList:FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);
    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);
    const [originalResponse, setOriginalResponse] = useState<any>([]);
    const [responseData, setResponseData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResponseLength, setResponseLength] = useState(0)
    const [tableSearch, setSearch] = useState("");

    const userList = useSelector((state:RootState) => state.users.users)

    const redirectToDetailView = (auctionId:number) => {
        redirectToView(adminRouts.updateAuction(auctionId));
    }

    const redirectToView = (pathName:string) => {
        navigate(pathName);
    }

    useEffect(() => {
        if (userList.length === 0) {
            getTableData(tabMenu);
        }
    },[]);

    useEffect(() => {
        if (userList.length > 0) {
            setResponseLength(userList.length);
            setOriginalResponse(userList);
            let pagedResponse = tablePagination(userList,1);
            if (pagedResponse.isValidResponse) {
                setResponseData(pagedResponse.data);
            }
        } else {
            setResponseData([]);
        }
    },[userList]);

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

        dispatch(getUserList(`auctionStatus=${selectedObj.queryParam}`));
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

        let tableBody = responseData.map((tableRowObj:any) => {

            let idBtn =  <Button title={`#${tableRowObj.userId}`} 
        btnSize={ButtonSize.sm} btnVariant={ButtonVariant.primaryLink} 
        clicked={() => {redirectToDetailView(tableRowObj.userId)}} />;

            return <tr>
            <td>
            {idBtn}
            </td>
            <td>
                {tableRowObj.userName}
            </td>
            <td>
                {transformDate(tableRowObj.joinedDate)}
            </td>
            <td>
                {tableRowObj.totalPurchase}
            </td>
            <td>
            <TableStyle.NumberOfUsers>
            {tableRowObj.joinedLotteries? tableRowObj.joinedLotteries : 0}
            </TableStyle.NumberOfUsers>
            </td>
            <td>
            <TableStyle.NumberOfUsers>
            {tableRowObj.joinedAuction? tableRowObj.joinedAuction : 0}
            </TableStyle.NumberOfUsers>
            </td>
            <td>
                {tableRowObj.isGoldMember === true ? "Gold members" : "Regular Member"}
            </td>
        </tr>
        });

    return <Wrapper>
        <Container>
            <TableStyle.BreadcrumbSection>
                <ViewHeader title={"Push Notifications"} />
                <Button title={"Create Notification"} 
        btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
        clicked={() => {redirectToView(adminRouts.createNotification)}} />
            </TableStyle.BreadcrumbSection>
        </Container>
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
        {userList.length === 0 && <EmptyTableView />}
            <TableFooter totalCount={totalResponseLength} currentPageNumber={pageNumber} updatePageNumber={updatePageNumber} />
        </TableStyle.TableWrapper>
        </TableStyle.ContentSection>
    </Wrapper>
};

export default UserList