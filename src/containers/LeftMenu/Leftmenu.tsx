import {FC} from 'react';
import {adminRouts} from '../../routs'
import {useNavigate, useLocation} from 'react-router-dom';
import HeaderLogoUrl from '../../assets/images/headerLogo.svg';
import {StyledWrapper, NavLogo, LogoSection, NavMenuItem, NavIcon, NavLabel, NavItems, Option, SubmenuContainer, LabelAndArrow } from './StyledLeftmenu';
import {DashboardIcon, LotteryIcon, HammerIcon, UserSolidCircleIcon,SpeakerphoneIcon,NotificationIcon,SettingsSuggestIcon, DotSingleIcon} from './StyledLeftmenu';

interface SubmenuOption {
    submenuLabel: string,
    isActive: boolean,
    routePath: string,
    activeRoutePaths:string[]
}

interface NavResponse {
    label: string,
    isActive:boolean,
    id:string,
    position: number,
    isVisible:boolean,
    routePath:string,
    isSubmenuExists: boolean,
    isSubmenuExpanded: boolean,
    iconName: string,
    submenu?:SubmenuOption[],
    activeRoutePaths:string[]
}

const LeftMenu:FC = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const isActivePath = (routsList:string[]):boolean => {
        var re = new RegExp(location.pathname, 'gi');
        let pathsList = routsList.join(" ");

        return pathsList.match(re) !== null;
    };

    let menuResponse: NavResponse[] = [
        {
            label: "Dashboard",
            isActive: false,
            id: "dashboard_1",
            iconName: 'DashboardIcon',
            position: 1,
            isVisible:true,
            routePath: adminRouts.dashboard,
            isSubmenuExists: true,
            isSubmenuExpanded: false,
            activeRoutePaths:[adminRouts.dashboard],
            submenu:[
                {
                    submenuLabel: "Dashboard",
                    isActive: false,
                    routePath: adminRouts.dashboard,
                    activeRoutePaths:[adminRouts.dashboard]
                }
            ]
        },
        {
            label: "Lottery",
            isActive: true,
            id: "lottery_2",
            iconName: 'LotteryIcon',
            position: 2,
            isVisible:true,
            routePath: "#",
            isSubmenuExists: true,
            isSubmenuExpanded: true,
            activeRoutePaths:[adminRouts.lotteryList, adminRouts.gamesList],
            submenu:[
                {
                    submenuLabel: "Lottery Games",
                    isActive: false,
                    routePath: adminRouts.lotteryList,
                    activeRoutePaths:[adminRouts.lotteryList]
                },
                {
                    submenuLabel: "Lottery Templates",
                    isActive: false,
                    routePath: adminRouts.gamesList,
                    activeRoutePaths:[adminRouts.gamesList]
                }
            ]
        },
        {
            label: "Auction",
            isActive: false,
            id: "auction_3",
            iconName: 'HammerIcon',
            position: 3,
            isVisible:true,
            routePath: "#",
            isSubmenuExists: true,
            isSubmenuExpanded: true,
            activeRoutePaths:[adminRouts.auctionList, adminRouts.auctionRequestList],
            submenu:[
                {
                    submenuLabel: "Auctions",
                    isActive: false,
                    routePath: adminRouts.auctionList,
                    activeRoutePaths:[adminRouts.auctionList]
                },
                {
                    submenuLabel: "New Auctions",
                    isActive: false,
                    routePath: adminRouts.auctionRequestList,
                    activeRoutePaths:[adminRouts.auctionRequestList]
                }
            ]
        },
        {
            label: "Users",
            isActive: false,
            id: "users_4",
            iconName: 'UserSolidCircleIcon',
            position: 3,
            isVisible:true,
            routePath: adminRouts.usersList,
            isSubmenuExists: false,
            isSubmenuExpanded: false,
            activeRoutePaths:[],
        },
        {
            label: "Promotions",
            isActive: false,
            id: "promotions_2",
            iconName: 'SpeakerphoneIcon',
            position: 4,
            isVisible:true,
            routePath:"/admin/promotions",
            isSubmenuExists: false,
            isSubmenuExpanded: false,
            activeRoutePaths:[],
        },
        {
            label: "Notfications",
            isActive: false,
            id: "notifications_2",
            iconName: 'NotificationIcon',
            position: 5,
            isVisible:true,
            routePath:"/admin/promotions",
            isSubmenuExists: false,
            isSubmenuExpanded: false,
            activeRoutePaths:[],
        },
        {
            label: "Settings",
            isActive: false,
            id: "settings_2",
            iconName: 'SettingsSuggestIcon',
            position: 6,
            isVisible:true,
            routePath:adminRouts.settings,
            isSubmenuExists: false,
            isSubmenuExpanded: false,
            activeRoutePaths:[adminRouts.settings],
        }
    ]

    const redirectToView = (path: string):void => {
        navigate(path);
    }

    const submenuView = (submenuArray:SubmenuOption[] | any) => {
        return submenuArray.map((obj:SubmenuOption) => {
            return <Option isActive={isActivePath(obj.activeRoutePaths)} onClick={() => {redirectToView(obj.routePath)}} >
                <DotSingleIcon /> {obj.submenuLabel}
            </Option>
        });
    };

    let menuItems = menuResponse.map((menuObj) => {
        return <><NavMenuItem onClick={() => {redirectToView(menuObj.routePath)}} isActive={isActivePath(menuObj.activeRoutePaths)} >
        <NavIcon>
            {menuObj.iconName === 'DashboardIcon' && <DashboardIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
            {menuObj.iconName === 'LotteryIcon' &&<LotteryIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
            {menuObj.iconName === 'HammerIcon' &&<HammerIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
            {menuObj.iconName === 'UserSolidCircleIcon' &&<UserSolidCircleIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
            {menuObj.iconName === 'SpeakerphoneIcon' &&<SpeakerphoneIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
            {menuObj.iconName === 'NotificationIcon' &&<NotificationIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
            {menuObj.iconName === 'SettingsSuggestIcon' &&<SettingsSuggestIcon isActive={isActivePath(menuObj.activeRoutePaths)} />}
        </NavIcon>
        <NavLabel>
            <LabelAndArrow>
            {menuObj.label}
            </LabelAndArrow>
        </NavLabel>
    </NavMenuItem>
    {menuObj.isSubmenuExists && 
            <SubmenuContainer isSubmenuVisible={menuObj.isSubmenuExpanded}>
                {submenuView(menuObj.submenu)}
            </SubmenuContainer>}
    </>
    });

    return<StyledWrapper>
        <LogoSection>
            <NavLogo src={HeaderLogoUrl} />
        </LogoSection>
        <NavItems>
        {menuItems}
        </NavItems>
    </StyledWrapper>
};

export default LeftMenu;