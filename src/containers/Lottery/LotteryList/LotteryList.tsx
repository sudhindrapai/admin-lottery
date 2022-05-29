import {FC, Fragment, useEffect, useState} from 'react';
import {RootState} from '../../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getLotteryList} from '../../../features/lotteryListSlice';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import Button from '../../../components/UI/Button/Button';
import {useNavigate} from 'react-router-dom';
import {adminRouts} from '../../../routs';
import {transformDate} from '../../../Utility/Utility';
import Modal from '../../../components/Modal/Modal'
import {BreadcrumbSection, 
    TableWrapper,
    Table, 
    Th, 
    ContentSection, 
    Tbody, NumberOfUsers, TabMenuContainer, MenuOption,
     DropdownContainer, DropdownOptionsContainer, DropdownOption, 
     DropdownActiveOption, SearchSectionContainer, Input, LotteryOptionsList, LotteryOption, LotteryTypeTitle} from './StyledLottery';
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

const LotteryList:FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createLotteryModal, setCreateLotteryModalStatus] = useState(false);

    const [tabMenu, setTabMenu] = useState(tabMenuViewList);

    let lotteryList = useSelector((state: RootState) => state.lotteryList.lotteryList);
    let page = useSelector((state: RootState) => state.lotteryList.page);

    useEffect(() => {
        dispatch(getLotteryList())
    },[])

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

    const toggleActiveStateOfDropdown = (selectedMenuId:string) => {
        let updateMenu = tabMenu.map((menuObj) => {
            return {
                ...menuObj,
                isSerarchViewActive: menuObj.id === selectedMenuId
            }
        });
        setTabMenu(updateMenu);
    }

    let searchDropdown = tabMenu.map((menuObj) => {
        return <DropdownOption onClick={() => {toggleActiveStateOfDropdown(menuObj.id)}}>
            {menuObj.label}
        </DropdownOption>
    });

    let activeDropdownOptionObj = tabMenu.filter((menuObj) => {
        return menuObj.isSerarchViewActive;
    })[0];

    let activeDropdownLabel = <DropdownActiveOption>
        {activeDropdownOptionObj.label} 
    </DropdownActiveOption>

    const updateTabMenuOption = (selectedMenuId) => {
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

    let lotteries = lotteryList.map((lotteryObj) => {
        let lotterIdBtn =  <Button title={`#${lotteryObj.lotteryId}`} 
        btnSize={ButtonSize.sm} btnVariant={ButtonVariant.primaryLink} 
        clicked={() => {redirectToLotteryDetail(lotteryObj.lotteryId)}} />
        return<tr>
            <td>
                {lotterIdBtn}
                </td>
            <td>&#x24; {lotteryObj.lotteryId}</td>
            <td>{transformDate(lotteryObj.lotteryStartDate)}</td>
            <td>{transformDate(lotteryObj.lotteryEndDate)}</td>
            <td>&#x24; {lotteryObj.lotteryId}</td>
            <td><NumberOfUsers>{lotteryObj.lotteryId}</NumberOfUsers></td>
            <td>{lotteryObj.lotteryId}</td>
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
         <DropdownContainer>
         <FilterIcon /> {activeDropdownLabel} <ChevronDownIcon/>
             <DropdownOptionsContainer>
                 {searchDropdown}
             </DropdownOptionsContainer>
        </DropdownContainer>
        <Input placeholder={"Search"} />
        </SearchSectionContainer>

         <TabMenuContainer>
             {tabMenuView}
         </TabMenuContainer>
     <TableWrapper>
         <Table>
         <tr>
             <Th>
                 lottery Id
             </Th>
             <Th>
                 lottery Price
             </Th>
             <Th>
                 start date
             </Th>
             <Th>
                 end date
             </Th>
             <Th>
                 Received Amount
             </Th>
             <Th>
                useer Joined
             </Th>
             <Th>
                 Status
             </Th>
         </tr>
         <Tbody>
             {lotteries}
         </Tbody>
         </Table>
     </TableWrapper>
     </ContentSection>
    </Fragment>
};

export default LotteryList