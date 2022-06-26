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

export const HeaderView = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
`;

export const FormContainer = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
gap: 24px;
margin-top: 25px;
form{
    width: 100%;
    box-sizing: border-box;
}
`;

export const FormWrapper = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
align-items:flex-start;
justify-content: flex-start;
background-color: #ffffff;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
margin-bottom: 24px;
`;

export const SectionTitle = styled.div`
width: 100%;
box-sizing: border-box;
font-weight: 500;
font-size: 18px;
letter-spacing: 0.0024em;
color: #200E32;
padding: 24px;
border-bottom: 1px solid #E9EDF5;
`;

export const FormBody = styled.div`
width: 100%;
box-sizing: border-box;
padding: 24px;
`;

export const TwoSections = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
padding: 24px;
gap: 15px;
${FormBody}{
    display: flex;
    flex-basis: 50%;
    padding: 0;
    flex-flow: column;
}
`;

export const ActionBtn = styled.div`
width: 100%;
box-sizing: border-box;
text-align: right;
margin-bottom: 50px;
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