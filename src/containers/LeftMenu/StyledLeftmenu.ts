import styled from "styled-components";
import {Dashboard} from '@styled-icons/material/Dashboard';

interface NavItemProps {
    isActive: boolean
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
padding: 0 10px;
margin-top: 30px;
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
display: flex;
flex-flow: row;
align-items: center;
justify-content: flex-start;
font-size: 16px;
`;

export const DashboardIcon = styled(Dashboard)`
color: ${(props:NavItemProps) => props.isActive ? '#3a57e8' : '#000000'};
height: 24px;
`;