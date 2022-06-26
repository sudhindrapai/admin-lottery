import {FC,Fragment, useState, useEffect} from 'react';
import {transformDate} from '../../../Utility/Utility'
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';

import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getAuctions} from '../../../features/auctionList';

import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs';

import * as TableStyle from '../../Lottery/LotteryList/StyledLottery'


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
    new TableHeader("Auction ID", true, true, false, 'Auction_ID'),
    new TableHeader("Auction price", true, false, false, 'Aucton_price'),
    new TableHeader("Start date", false, false, false, 'Start_date'),
    new TableHeader("End date", false, false, false, 'End_date'),
    new TableHeader("Received amount", true, false, false, 'Received_amount'),
    new TableHeader("users joined", true, false, false, 'users_joined'),
    new TableHeader("Status", false, false, false, 'Status')
]

let tabMenuViewList = [
    {
        label: "All",
        id: "all_1",
        queryParam:"A",
        isActive: true,
        isSerarchViewActive: true
    },
    {
        label: "Winner Auctions",
        id: "winnerAuctions_2",
        queryParam:"E",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Cancelled Auctions",
        id: "cancelledAuctions_3",
        queryParam:"D",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Pending Auctions",
        id: "pendingAuctons_3",
        queryParam:"U",
        isActive: false,
        isSerarchViewActive: false
    }
]


const AuctionList = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let auctionList = useSelector((state:RootState) => state.auction.auctions);
    let page = useSelector((state: RootState) => state.lotteryList.page);

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);
    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);

    useEffect(() => {
        getTableData(tabMenu);
    },[])

    const redirectToView = (path: string) => {
        navigate(path);
    };

    const redirectToDetailView = (auctionId:number) => {
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

        dispatch(getAuctions("auctionStatus=U"));
    }

    const updatePageNumber = (pageNumber) => {};

    let tabMenuView = tabMenu.map((menuObj) => {
        return <TableStyle.MenuOption onClick={() => {updateTabMenuOption(menuObj.id)}} 
        isActive={menuObj.isActive} key={menuObj.id} >{menuObj.label}</TableStyle.MenuOption>
    });



    let tableBody = auctionList.map((tableRowObj) => {

        let idBtn =  <Button title={`#${tableRowObj.auctionId}`} 
        btnSize={ButtonSize.sm} btnVariant={ButtonVariant.primaryLink} 
        clicked={() => {redirectToDetailView(tableRowObj.auctionId)}} />;

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
                &#x24; {tableRowObj.auctionPrice}
            </td>
            <td>
                {transformDate(tableRowObj.auctionStartDate)}
            </td>
            <td>
                {transformDate(tableRowObj.auctionEndDate)}
            </td>
            <td>
            &#x24; {tableRowObj.amountCollected}
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
    })

    
    return <Fragment>
        <TableStyle.BreadcrumbSection>
        <ViewHeader title={"Auctions"} isNeedCreateButton={true} btnText={"Test button"}
     routePath={adminRouts.createAuction} />
     <Button title={"+ Create Auction"} btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
     clicked={() => {redirectToView(adminRouts.createAuction)}} />
        </TableStyle.BreadcrumbSection>
        <TableStyle.ContentSection>
            <TableStyle.SearchSectionContainer>
                <TableStyle.Input placeholder={"Search"} />
            </TableStyle.SearchSectionContainer>
        <TableStyle.TabMenuContainer>
        {tabMenuView}
        </TableStyle.TabMenuContainer>
        <TableStyle.TableWrapper>
            <TableStyle.Table>
            <TableHeaderComponent headers={tableHeaderValues} onToggleSort={() => {}} />
            <TableStyle.Tbody>
                {tableBody}
            </TableStyle.Tbody>
            <TableFooter totalCount={auctionList.length} currentPageNumber={page} updatePageNumber={updatePageNumber} />
            </TableStyle.Table>
        </TableStyle.TableWrapper>
        </TableStyle.ContentSection>
    </Fragment>
};

export default AuctionList