import styled from 'styled-components';
import {CheckBox} from '@styled-icons/material-outlined/CheckBox';
import {CheckBoxOutlineBlank} from '@styled-icons/material-outlined/CheckBoxOutlineBlank';

export const SelectedCheckbox = styled(CheckBox)`
color: #000000;
height: 26px;
`;

export const EmptyCheckbox  = styled(CheckBoxOutlineBlank)`
color: #000000;
height: 26px;
`;
export const StatusContainer = styled.div`
width: 100%;
box-sizing: border-box;
background-color: #ffffff;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
margin-bottom: 24px;
`;

export const StatusBody = styled.div`
width: 100%;
box-sizing: border-box;
padding: 14px 24px;
border-bottom: 1px solid #E9EDF5;
`;

export const TwoSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
`;

export const SectionTitle = styled.div`
width: 100%;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 18px;
    -webkit-letter-spacing: 0.0024em;
    -moz-letter-spacing: 0.0024em;
    -ms-letter-spacing: 0.0024em;
    letter-spacing: 0.0024em;
    color: #200E32;
    padding: 24px;
    border-bottom: 1px solid #E9EDF5;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
justify-content: space-between;
div{
    Button{
        padding: 8px 16px;
        border-radius: 6px;
        text-transform: capitalize;
        font-size: 14px;
    };
    Button:first-child {
        margin-right: 10px;
    }
};
`;

export const StatusTitle = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.03em;
color: #687182;
margin-bottom: 16px;
width:100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;

`;

export const Value = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.03em;
color: #3A57E8;
`;

export const CheckboxContainer = styled.div`
weight: 100%; 
box-sizing: border-box;
display: flex;
flex-flow:row nowrap;
align-items: center;
justify-content: flex-start;
margin-top: 18px;
cursor: pointer;
`;

export const CheckboxDesc = styled.div`
color: #000000;
margin-left: 15px;
`;

export const Table = styled.table`
width: 100%;
box-sizing: border-box;
`;

export const EmptyTableBody = styled.div`
width: 100%;
box-sizing: border-box;
text-align: center;
padding: 50px;
font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: #ADB5BD;
`;