import {FC, useState, useEffect} from 'react';
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

let leftMenuResponse: NavResponse[] = [
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
        activeRoutePaths:[adminRouts.dashboard,adminRouts.rootPath],
        submenu:[
            {
                submenuLabel: "Dashboard",
                isActive: false,
                routePath: adminRouts.dashboard,
                activeRoutePaths:[adminRouts.dashboard,adminRouts.rootPath]
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
        routePath: adminRouts.lotteryList,
        isSubmenuExists: true,
        isSubmenuExpanded: false,
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
        routePath: adminRouts.auctionList,
        isSubmenuExists: true,
        isSubmenuExpanded: false,
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
        activeRoutePaths:[adminRouts.usersList],
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
        activeRoutePaths:[adminRouts.promotions],
    },
    {
        label: "Notfications",
        isActive: false,
        id: "notifications_2",
        iconName: 'NotificationIcon',
        position: 5,
        isVisible:true,
        routePath:adminRouts.emailNotificationList,
        isSubmenuExists: true,
        isSubmenuExpanded: false,
        activeRoutePaths:[adminRouts.emailNotificationList, adminRouts.pushNotificationList],
        submenu:[
            {
                submenuLabel: "Email Notifications",
                isActive: false,
                routePath: adminRouts.emailNotificationList,
                activeRoutePaths:[adminRouts.emailNotificationList]
            }
        ]
    },
    {
        label: "Settings",
        isActive: false,
        id: "settings_2",
        iconName: 'SettingsSuggestIcon',
        position: 6,
        isVisible:true,
        routePath:adminRouts.masterValue,
        isSubmenuExists: true,
        isSubmenuExpanded: false,
        activeRoutePaths:[adminRouts.masterValue, adminRouts.userSettings],
        submenu:[
            {
                submenuLabel: "Master values",
                isActive: false,
                routePath: adminRouts.masterValue,
                activeRoutePaths:[adminRouts.masterValue]
            }
        ]
    }
];

// {
//     submenuLabel: "Push Notifications",
//     isActive: false,
//     routePath: adminRouts.pushNotificationList,
//     activeRoutePaths:[adminRouts.pushNotificationList]
// }

// {
//     submenuLabel: "User Settings",
//     isActive: false,
//     routePath: adminRouts.userSettings,
//     activeRoutePaths:[adminRouts.userSettings]
// }

const LeftMenu:FC = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const [menuResponse, setMenuResponse] = useState<NavResponse[]>(leftMenuResponse);

    useEffect(() => {
        if (menuResponse.length === 0) {
            setMenuResponse(leftMenuResponse);
        }
    },[]) 

    const isActivePath = (routsList:string[]):boolean => {
        let updatedPathName = location.pathname === "/" ? adminRouts.dashboard : location.pathname;
        var re = new RegExp(updatedPathName, 'gi');
        let pathsList = routsList.join(" ");

        return pathsList.match(re) !== null;
    };

    const redirectToView = (path: string):void => {
        navigate(path);
    }

    const toggleCollapseState = (routerObj) => {
        let updatedMenuItems:NavResponse[] = [];
        for (let menuObj of menuResponse) {
                let updatedObj = {
                    ...menuObj,
                    isSubmenuExpanded: menuObj.id === routerObj.id ? !routerObj.isSubmenuExpanded : false
                }
                updatedMenuItems.push(updatedObj)
        }
        setMenuResponse(updatedMenuItems);
        redirectToView(routerObj.routePath);
    }

    const submenuView = (submenuArray:SubmenuOption[] | any) => {
        return submenuArray.map((obj:SubmenuOption) => {
            return <Option isActive={isActivePath(obj.activeRoutePaths)} onClick={() => {redirectToView(obj.routePath)}} >
                <DotSingleIcon /> {obj.submenuLabel}
            </Option>
        });
    };

    let menuItems = menuResponse.map((menuObj) => {
        return <><NavMenuItem onClick={() => {toggleCollapseState(menuObj)}} isActive={isActivePath(menuObj.activeRoutePaths)} >
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
            <LabelAndArrow onClick={() => {toggleCollapseState(menuObj.id)}} >
            {menuObj.label}
            </LabelAndArrow>
        </NavLabel>
    </NavMenuItem>
    {menuObj.isSubmenuExists && menuObj.isSubmenuExpanded && 
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