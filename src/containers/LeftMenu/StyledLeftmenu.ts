import styled from "styled-components";
import {Simpleanalytics} from '@styled-icons/simple-icons/Simpleanalytics';
import {Ticket} from '@styled-icons/zondicons/Ticket';
import {Hammer} from '@styled-icons/fa-solid/Hammer';
import {UserSolidCircle} from '@styled-icons/zondicons/UserSolidCircle';
import {Speakerphone} from '@styled-icons/heroicons-outline/Speakerphone';
import {Notification} from '@styled-icons/zondicons/Notification';
import {SettingsSuggest} from '@styled-icons/material/SettingsSuggest';
import {DotFill} from '@styled-icons/octicons/DotFill';


interface NavItemProps {
    isActive: boolean
}

interface SubmenuProps {
    isSubmenuVisible: boolean
}


export const StyledWrapper =styled.nav`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
`;

export const NavLogo = styled.img`
width: 100%;
box-sizing: border-box;
text-align: center;
object-fit: contain;
max-width: 120px;
`;

export const LogoSection = styled.div`
width: 100%;
box-sizing: border-box;
text-align: center;
padding: 29px 0 30px 0;
border-bottom: 1px solid #E9ECEF;
`;

export const NavItems = styled.div`
width: 100%;
box-sizing: border-box;
padding: 0 10px 50px 10px;
margin-top: 30px;
overflow-y: scroll;
`;

export const NavMenuItem = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
cursor: pointer;
padding: 10px 5px;
margin: 3px 0;
background-color: ${(props:NavItemProps) => props.isActive ? '#3a57e81a' : '#ffffff' };
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : "#000000" };
border-radius: 4px;
`;

export const NavIcon = styled.span`
display: flex;
align-items: center;
justify-content: center;
flex-basis: 15%;
padding: 5px;
font-size: 12px;
`;

export const NavLabel = styled.div`
width: 100%;
box-sizing: border-box;
display:flex;
flex-flow: column;
align-items: flex-start;
`;

export const LabelAndArrow = styled.div`
display: flex;
flex-flow: row;
align-items: center;
justify-content: flex-start;
font-size: 16px;
`;

export const Option = styled.div`
font-size: 14px;
color: #979797;
padding: 10px 0 10px 10px;
margin-left: 34px;
border-radius: 4px;
background-color: ${(props:NavItemProps) => props.isActive ? '#3a57e81a' : '#ffffff' };
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : "#000000" };
`;

export const SubmenuContainer = styled.div`
width: 100%;
box-sizing: border-box;
display: ${(props:SubmenuProps) => props.isSubmenuVisible ? 'block': 'none' };
background-color: #ffffff;
cursor: pointer;
`;

export const DashboardIcon = styled(Simpleanalytics)`
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const LotteryIcon = styled(Ticket)`
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const HammerIcon = styled(Hammer)`
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const UserSolidCircleIcon = styled(UserSolidCircle)`
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const SpeakerphoneIcon = styled(Speakerphone)`
color:${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const NotificationIcon = styled(Notification)`
color:${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const SettingsSuggestIcon = styled(SettingsSuggest)`
color:${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 18px;
`;

export const DotSingleIcon = styled(DotFill)`
height: 10px;
margin-right: 4px;
`;