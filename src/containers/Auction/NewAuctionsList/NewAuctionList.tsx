import {FC,Fragment, useState, useEffect} from 'react';
import {transformDate} from '../../../Utility/Utility'
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';

import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getNewAuctions} from '../../../features/auctionList';

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
    new TableHeader("Requested date", false, false, false, 'Requested_date'),
    new TableHeader("Category", false, false, false, 'category'),
    new TableHeader("User Name", true, false, false, 'UserName'),
    new TableHeader("Email Address", true, false, false, 'emailAddress'),
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
    const dispatch = useDispatch();
    let auctionList = useSelector((state:RootState) => state.auction.newAuctions);
    let page = useSelector((state: RootState) => state.lotteryList.page);

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);
    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);

    useEffect(() => {
        getTableData(tabMenu);
    },[])

    const redirectToView = (path: string) => {

    };

    const redirectToDetailView = (auctionId) => {}

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

        dispatch(getNewAuctions(selectedObj.queryParam));
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
                &#x24; {tableRowObj.auctionPrice}
            </td>
            <td>
                {transformDate(tableRowObj.requestedDate)}
            </td>
            <td>
                {tableRowObj.category}
            </td>
            <td>
            {tableRowObj.name}
            </td>
            <td>
            {tableRowObj.email}
            </td>
        </tr>
    })

    
    return <Fragment>
        <TableStyle.BreadcrumbSection>
        <ViewHeader title={"New Auctions"} isNeedCreateButton={true} btnText={"Test button"}
     routePath={"/"} />
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