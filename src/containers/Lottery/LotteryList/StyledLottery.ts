import styled from 'styled-components';
import {ChevronDown} from '@styled-icons/evaicons-solid/ChevronDown';
import {FilterAlt} from '@styled-icons/boxicons-solid/FilterAlt';

interface TabMenuOptions {
    isActive: boolean
}

export const BreadcrumbSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
`;

export const ContentSection = styled.div`
width: 100%;
box-sizing: border-box;
background-color: #ffffff;
padding: 24px;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
margin-top: 20px;
`;

export const TableWrapper = styled.div`
width: 100%;
box-sizing: border-box;
overflow-x: auto;
`;

export const Table = styled.table`
width: 100%;
box-sizing: border-box;
border-collapse: collapse;
`;

export const Th = styled.th`
width: 100%;
box-sizing: border-box;
border-bottom: 1px solid #E9EDF5;
padding: 14px 4px;
text-transform: uppercase;
font-weight: 500;
font-size: 14px;
&:first-child{
    width: 10%;
};
&:nth-child(2){
    width: 15%;
};
&:nth-child(3) {
    width: 18%;
};
&:nth-child(4) {
    width: 18%;
};
&:nth-child(5) {
    width: 15%;
};
&:nth-child(6) {
    width: 14%;
};
&:nth-child(7) {
    width: 10%;
};
`;

export const Tbody  = styled.tbody`
    width: 100%;
    box-sizing: border-box;
     tr{
        td{
            border-bottom: 1px solid #E9EDF5;
            padding: 14px 4px;
            color: #200E32;
        }
    }
`;

export const NumberOfUsers = styled.span`
padding: 2px 7px;
font-size: 14px;
color: #3A57E8;
background-color: #EDEDFC;
border-radius: 6px;
`;

export const TabMenuContainer = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items:center;
justify-content: flex-start;
margin-bottom: 16px;
`;

export const MenuOption = styled.span`
padding: 8px 24px;
color: ${(props:TabMenuOptions) => props.isActive ? "#3A57E8": "#200E32"};
border-bottom: 1px solid #ffffff;
border-bottom-color: ${(props:TabMenuOptions) => props.isActive ? "#3A57E8": "#E9EDF5"};
border-bottom-width: ${(props:TabMenuOptions) => props.isActive ? "2px": "1px"};
font-weight: ${(props:TabMenuOptions) => props.isActive ? 700: 500};
display: inline-flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-around;
cursor: pointer;
`;



export const DropdownOptionsContainer = styled.div`
position: absolute;
top: 31px;
left: 0;
background-color: #ffffff;
min-width: 180px;
box-shadow: 0px 0px 2px rgb(0 0 0 / 12%);
display: none;
`;

export const DropdownContainer = styled.div`
position: relative;
width: auto;
display: flex;
flex-flow: row nowrap;
width: auto;
align-items: center;
padding: 0 10px;
:hover ${DropdownOptionsContainer}{
        display: block;
}
`;

export const DropdownActiveOption = styled.div`
color: #3a57e8;
padding: 6px 12px;
z-index: 1;
`

export const DropdownOption = styled.div`
color: #200E32;
padding: 12px 5px;
cursor: pointer;
border-bottom: 1px solid #E9EDF5;
:hover{
    background-color: #E9EDF5;
}
`;

export const SearchSectionContainer = styled.div`
display: inline-flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
border: 1px solid #cccccc;
z-index: 1;
border-radius: 6px;
margin-bottom: 24px;
`;

export const Input = styled.input`
border: none;
min-width: 250px;
padding: 8px 16px;
border-left: 1px solid #cccccc;
outline: none;
border-radius: 0 6px 6px 0;
:active {
    outline: none;
}
`;


// Icons 

export const ChevronDownIcon = styled(ChevronDown)`
color: #3a57e8;
height: 31px;
`;

export const FilterIcon = styled(FilterAlt)`
color: #3a57e8;
height: 19px;
`;

export const LotteryOptionsList = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
column-gap: 30px;
padding: 30px;
`;

export const LotteryOption = styled.div`
display: flex;
flex-basis: 50%;
align-items: center;
justify-content: center;
border: 1px solid #E9EFFF;
border-radius: 12px;   
flex-flow: column; 
padding: 12px;
cursor: pointer;
 img{
     height: 100px;
     width: 200px;
     object-fit: contain;
 }
`;

export const LotteryTypeTitle = styled.div`
font-size: 16px;
color: #000000;
font-weight: 400;
margin-top: 10px;
`;
