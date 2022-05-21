import {FC, useRef} from 'react';
import {adminRouts} from '../../routs'
import {useNavigate, useParams} from 'react-router-dom';
import HeaderLogoUrl from '../../assets/images/headerLogo.svg';
import {StyledWrapper, NavLogo, LogoSection, NavMenuItem, NavIcon, NavLabel, NavItems } from './StyledLeftmenu';
import {DashboardIcon} from './StyledLeftmenu';

interface NavResponse {
    label: string,
    isActive:boolean,
    id:string,
    position: number,
    isVisible:boolean,
    routePath:string,
    isSubmenuExists: boolean,
    submenu?:[
        {
            label: string,
            isSelected: boolean,
            routePath: string
        }
    ]
}

const LeftMenu:FC = () => {

    const navigate = useNavigate();

    let menuResponse: NavResponse[] = [
        {
            label: "Dashboard",
            isActive: false,
            id: "dashboard_1",
            position: 1,
            isVisible:true,
            routePath: adminRouts.dashboard,
            isSubmenuExists: false
        },
        {
            label: "Lottery",
            isActive: true,
            id: "lottery_2",
            position: 2,
            isVisible:true,
            routePath: adminRouts.lotteryList,
            isSubmenuExists: false
        },
        {
            label: "Auction",
            isActive: false,
            id: "auction_2",
            position: 3,
            isVisible:true,
            routePath: adminRouts.auctionList,
            isSubmenuExists: false
        },
        {
            label: "Users",
            isActive: false,
            id: "users_2",
            position: 3,
            isVisible:true,
            routePath: adminRouts.usersList,
            isSubmenuExists: false
        },
        {
            label: "Promotions",
            isActive: false,
            id: "promotions_2",
            position: 4,
            isVisible:true,
            routePath:"/admin/promotions",
            isSubmenuExists: false
        },
        {
            label: "Notfications",
            isActive: false,
            id: "notifications_2",
            position: 5,
            isVisible:true,
            routePath:"/admin/promotions",
            isSubmenuExists: false
        },
        {
            label: "Settings",
            isActive: false,
            id: "settings_2",
            position: 6,
            isVisible:true,
            routePath:adminRouts.settings,
            isSubmenuExists: false
        }
    ]

    const redirectToView = (path: string):void => {
        navigate(path);
    }

    let menuItems = menuResponse.map((menuObj) => {
        return <NavMenuItem onClick={() => {redirectToView(menuObj.routePath)}} isActive={menuObj.isActive} >
        <NavIcon>
            <DashboardIcon isActive={menuObj.isActive} />
            
        </NavIcon>
        <NavLabel>
            {menuObj.label}
        </NavLabel>
    </NavMenuItem>
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