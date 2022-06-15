import {FC, useState} from 'react';
import {MenuOption,SearchSectionContainer, Input, TabMenuContainer, TableWrapper,Table, Tbody} from  './styledPurchaseList';

import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';

class TableHeader{
    constructor(public label:string, public isSortRequired: boolean, public isAscSorted: boolean, 
        public isDscSorted:boolean, public id: string){}
}

let tableHeaders = [
    new TableHeader("user", true, true, false, 'user'),
    new TableHeader("Purchase date", false, false, false, 'purchaseDate'),
    new TableHeader("Ticket type", false, false, false, 'ticketType'),
    new TableHeader("noOfTickets", true, false, false, 'noOfTickets'),
    new TableHeader("Total Amount", true, false, false, 'totalAmount')
]

let tabMenuViewList = [
    {
        label: "All",
        id: "all_1",
        isActive: true,
        isSerarchViewActive: true
    },
    {
        label: "Winner Lotteries",
        id: "winnerLotteries_2",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Cancelled Lotteries",
        id: "cancelledLotteries_3",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Pending Lotteries",
        id: "pendingLotteries_3",
        isActive: false,
        isSerarchViewActive: false
    }
]

const PurchaseList = () => {
    const [searchValue, setSearchValue] = useState("");
    const [tabMenu, setTabMenu] = useState(tabMenuViewList);
    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);

    const updateTabMenuOption = (selectedMenuId:string) => {
        let updatedMenuArray = tabMenu.map((menuObj) => {
            return {
                ...menuObj,
                isActive: menuObj.id === selectedMenuId
            }
        });
        setTabMenu(updatedMenuArray);
    };

    let tabMenuView = tabMenu.map((menuObj) => {
        return <MenuOption onClick={() => {updateTabMenuOption(menuObj.id)}} 
        isActive={menuObj.isActive} key={menuObj.id} >{menuObj.label}</MenuOption>
    });

    const updatePageNumber = (pageNumber:number) => {
        console.log(pageNumber)
    }

    return <>
    <SearchSectionContainer>
         {/* <DropdownContainer>
         <FilterIcon /> {activeDropdownLabel} <ChevronDownIcon/>
             <DropdownOptionsContainer>
                 {searchDropdown}
             </DropdownOptionsContainer>
        </DropdownContainer> */}
        <Input placeholder={"Search"} />
        </SearchSectionContainer>
        <TabMenuContainer>
             {tabMenuView}
         </TabMenuContainer>
         <TableWrapper>
         <Table>
         <thead>
             <TableHeaderComponent headers={tableHeaderValues} onToggleSort={() => {}} />
         </thead>
         <Tbody>
             <tr>
                 <td>123</td>
             </tr>
         </Tbody>
         </Table>
         <TableFooter totalCount={27} currentPageNumber={1} updatePageNumber={updatePageNumber} />
     </TableWrapper>
    </>
};

export default PurchaseList;