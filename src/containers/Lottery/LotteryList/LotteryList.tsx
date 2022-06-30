import {FC, Fragment, useEffect, useState} from 'react';
import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getLotteryList} from '../../../features/lotteryListSlice';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs';
import {transformDate,tablePagination,searchTableData, sortTableValues} from '../../../Utility/Utility';
import Modal from '../../../components/Modal/Modal';
import TableHeaderComponent from '../../../components/TableHeader/TableHeader';
import TableFooter from '../../../components/TableFooter/TableFooter';
import {BreadcrumbSection, 
    TableWrapper,
    Table, 
    Th, 
    ContentSection, 
    Tbody, NumberOfUsers, TabMenuContainer, MenuOption,
     DropdownContainer, DropdownOptionsContainer, DropdownOption, 
     DropdownActiveOption, SearchSectionContainer, Input, LotteryOptionsList, LotteryOption,
      LotteryTypeTitle, Live, Upcoming} from './StyledLottery';
import {ChevronDownIcon, FilterIcon} from './StyledLottery';

import oneTimeLotteryImgSrc from '../../../assets/images/oneTimeLottery.svg';
import repeatedLotteryImgSrc from '../../../assets/images/repeatedLottery.svg';

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

interface TableHeaders{
    label: string,
    isSortRequired:boolean
    isAscSorted:boolean,
    id:string
}


class TableHeader{
    constructor(public label:string, public isSortRequired: boolean, public isAscSorted: boolean, public isDscSorted:boolean, public id: string){}
}

let tableHeaders = [
    new TableHeader("Lottery ID", true, true, false, 'lotteryGameId'),
    new TableHeader("Lottery price", true, false, false, 'rewardAmount'),
    new TableHeader("Start date", false, false, false, 'Start_date'),
    new TableHeader("End date", false, false, false, 'End_date'),
    new TableHeader("Received amount", true, false, false, 'amountCollected'),
    new TableHeader("users joined", true, false, false, 'noOfUsersJoined'),
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
        label: "Winner Lotteries",
        id: "winnerLotteries_2",
        queryParam:"E",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Cancelled Lotteries",
        id: "cancelledLotteries_3",
        queryParam:"D",
        isActive: false,
        isSerarchViewActive: false
    },
    {
        label: "Pending Lotteries",
        id: "pendingLotteries_3",
        queryParam:"U",
        isActive: false,
        isSerarchViewActive: false
    }
]

const LotteryList:FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createLotteryModal, setCreateLotteryModalStatus] = useState(false);

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);

    const [tableHeaderValues, setHeaderValues] = useState(tableHeaders);

    const [originalResponse, setOriginalResponse] = useState<any>([]);
    const [responseData, setResponseData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResponseLength, setResponseLength] = useState(0)
    const [tableSearch, setSearch] = useState("")

    let lotteryList = useSelector((state: RootState) => state.lotteryList.lotteryList);

    useEffect(() => {
        getLotteryData(tabMenu);
    },[]);

    useEffect(() => {
        if (lotteryList.length > 0) {
            setResponseLength(lotteryList.length);
            setOriginalResponse(lotteryList);
            let pagedResponse = tablePagination(lotteryList,1);
            if (pagedResponse.isValidResponse) {
                setResponseData(pagedResponse.data);
            }
        }
    },[lotteryList]);

    const redirectToCreateLottery = (type: number):void => {
        if (type === 1) {
            navigate(adminRouts.createOneTimeLottery);
        } else {
            navigate(adminRouts.createRepeatedLottery);
        }
    }

    const redirectToLotteryDetail = (lotteryId:number):void => {
        navigate(`/admin/lottery/view/${lotteryId}`, {state:lotteryId});
    };

    const updateTabMenuOption = (selectedMenuId) => {
        let updatedMenuArray = tabMenu.map((menuObj) => {
            return {
                ...menuObj,
                isActive: menuObj.id === selectedMenuId
            }
        });
        getLotteryData(updatedMenuArray)
        setTabMenu(updatedMenuArray);
    };

    const getLotteryData = (tabObj) => {
        let selectedObj = tabObj.filter((tabObj) => {
            return tabObj.isActive
        })[0];

        dispatch(getLotteryList(selectedObj.queryParam));
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


    let tabMenuView = tabMenu.map((menuObj) => {
        return <MenuOption onClick={() => {updateTabMenuOption(menuObj.id)}} 
        isActive={menuObj.isActive} key={menuObj.id} >{menuObj.label}</MenuOption>
    });

    let lotteries = responseData.map((lotteryObj:any) => {
        let lotterIdBtn =  <Button title={`#${lotteryObj.lotteryGameId}`} 
        btnSize={ButtonSize.sm} btnVariant={ButtonVariant.primaryLink} 
        clicked={() => {redirectToLotteryDetail(lotteryObj.lotteryGameId)}} />;

        let lotteryStatusTag = lotteryObj.lotteryGameStatus === "C" ? <Live>
            Live
        </Live> : lotteryObj.lotteryGameStatus === "U" ? <Upcoming>
            Not Live
        </Upcoming> : null;

        return<tr>
            <td>
                {lotterIdBtn}
                </td>
            <td>&#x24; {lotteryObj.rewardAmount? lotteryObj.rewardAmount : 0}</td>
            <td>{transformDate(lotteryObj.lotteryGameStartDate)}</td>
            <td>{transformDate(lotteryObj.lotteryGameEndDate)}</td>
            <td>&#x24; {lotteryObj.amountCollected? lotteryObj.amountCollected : 0}</td>
            <td><NumberOfUsers>{lotteryObj.noOfUsersJoined}</NumberOfUsers></td>
            <td>{lotteryStatusTag}</td>
            </tr>
    });

    return <Fragment>
        <Modal isOpen={createLotteryModal} 
        name={"Create lottery option modal"} 
        title={"Create Lottery"} toggleModal={() => {setCreateLotteryModalStatus(!createLotteryModal)}} >
            <LotteryOptionsList>
                <LotteryOption onClick={() => {redirectToCreateLottery(1)}}>
            <img src={oneTimeLotteryImgSrc} />
            <LotteryTypeTitle>
                One time Lottery
            </LotteryTypeTitle>
            </LotteryOption>
            <LotteryOption onClick={() => {redirectToCreateLottery(2)}}>
            <img src={repeatedLotteryImgSrc} />
            <LotteryTypeTitle>
            Repeated Lottery
            </LotteryTypeTitle>
            </LotteryOption>
            </LotteryOptionsList>
        </Modal>
        <BreadcrumbSection>
    <ViewHeader title={"Lottery"} isNeedCreateButton={true} btnText={"Test button"}
     routePath={"/"} />
     <Button title={"+ Create Lottery"} btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
     clicked={() => {setCreateLotteryModalStatus(true)}} />
     </BreadcrumbSection>
     <ContentSection>
         <SearchSectionContainer>
        <Input value={tableSearch} onKeyDown={triggerSearch} 
                onChange={setTableSearchValue}  placeholder={"Search"} />
        </SearchSectionContainer>
         <TabMenuContainer>
             {tabMenuView}
         </TabMenuContainer>
     <TableWrapper>
         <Table>
         <thead>
             <TableHeaderComponent headers={tableHeaderValues} onToggleSort={sortTable} />
         </thead>
         <Tbody>
             {lotteries}
         </Tbody>
         </Table>
         <TableFooter totalCount={totalResponseLength} currentPageNumber={pageNumber} updatePageNumber={updatePageNumber} />
     </TableWrapper>
     </ContentSection>
    </Fragment>
};

export default LotteryList

function queryParams(queryParams: any, string: any): import("@reduxjs/toolkit").AsyncThunkAction<void, string, {}> {
    throw new Error('Function not implemented.');
}
