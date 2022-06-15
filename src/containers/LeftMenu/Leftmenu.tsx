import {FC} from 'react';
import {adminRouts} from '../../routs'
import {useNavigate, useParams} from 'react-router-dom';
import HeaderLogoUrl from '../../assets/images/headerLogo.svg';
import {StyledWrapper, NavLogo, LogoSection, NavMenuItem, NavIcon, NavLabel, NavItems, Option, SubmenuContainer, LabelAndArrow } from './StyledLeftmenu';
import {DashboardIcon, LotteryIcon, HammerIcon, UserSolidCircleIcon,SpeakerphoneIcon,NotificationIcon,SettingsSuggestIcon, DotSingleIcon} from './StyledLeftmenu';

interface SubmenuOption {
    submenuLabel: string,
    isActive: boolean,
    routePath: string
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
    submenu?:SubmenuOption[]
}

const LeftMenu:FC = () => {

    const navigate = useNavigate();

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
            submenu:[
                {
                    submenuLabel: "Dashboard",
                    isActive: false,
                    routePath: adminRouts.dashboard
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
            submenu:[
                {
                    submenuLabel: "Lottery Games",
                    isActive: false,
                    routePath: adminRouts.lotteryList
                },
                {
                    submenuLabel: "Lottery Templates",
                    isActive: false,
                    routePath: adminRouts.gamesList
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
            isSubmenuExists: false,
            isSubmenuExpanded: false
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
            isSubmenuExpanded: false
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
            isSubmenuExpanded: false
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
            isSubmenuExpanded: false
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
            isSubmenuExpanded: false
        }
    ]

    const redirectToView = (path: string):void => {
        navigate(path);
    }

    const submenuView = (submenuArray:SubmenuOption[] | any) => {
        return submenuArray.map((obj:SubmenuOption) => {
            return <Option onClick={() => {redirectToView(obj.routePath)}} >
                <DotSingleIcon /> {obj.submenuLabel}
            </Option>
        });
    };

    let menuItems = menuResponse.map((menuObj) => {
        return <><NavMenuItem onClick={() => {redirectToView(menuObj.routePath)}} isActive={menuObj.isActive} >
        <NavIcon>
            {menuObj.iconName === 'DashboardIcon' && <DashboardIcon isActive={menuObj.isActive} />}
            {menuObj.iconName === 'LotteryIcon' &&<LotteryIcon isActive={menuObj.isActive} />}
            {menuObj.iconName === 'HammerIcon' &&<HammerIcon isActive={menuObj.isActive} />}
            {menuObj.iconName === 'UserSolidCircleIcon' &&<UserSolidCircleIcon isActive={menuObj.isActive} />}
            {menuObj.iconName === 'SpeakerphoneIcon' &&<SpeakerphoneIcon isActive={menuObj.isActive} />}
            {menuObj.iconName === 'NotificationIcon' &&<NotificationIcon isActive={menuObj.isActive} />}
            {menuObj.iconName === 'SettingsSuggestIcon' &&<SettingsSuggestIcon isActive={menuObj.isActive} />}
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