import styled from 'styled-components';

interface WeeekDaysProps{
    isSelected: boolean
}

export const CreateLotteryContainer = styled.div`
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

export const CreateLotteryFirstSection = styled.div`
display: flex;
flex-flow: column;
align-items: center;
justify-content: flex-start;
flex-basis: 60%;
`;

export const CreateLotterySecondSection = styled.div`
display: flex;
flex-flow: column;
align-items: center;
justify-content: flex-start;
flex-basis: 40%;
`;

export const WeekNames = styled.span`
display: inline-block;
border: 1px solid transparent;
border-color: ${(props:WeeekDaysProps) => !props.isSelected ? "#ADB5BD" : "#3A57E8"};
background-color: ${(props:WeeekDaysProps) => !props.isSelected ? "#ffffff" : "#3A57E8"};
color: ${(props:WeeekDaysProps) => !props.isSelected ? "#000000" : "#ffffff"};
margin-right: 10px;
padding: 3px 8px;
font-size: 14px;
border-radius: 8px;
cursor: pointer;
`;

export const FormElementTitle = styled.div`
width: 100%;
box-sizing: border-box;
margin: 18px 0;
color: #200E32;
font-size:14px;
`;

export const FormSectionContainer = styled.div`
background-color: #ffffff;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
padding: 30px;
margin-bottom: 24px;
`;

export const SectionTitle = styled.div`
width: 100%;
box-sizing: border-box;
font-size: 18px;
font-weight: 500;
padding: 0 30px 24px 0;
border-bottom: 1px solid #E9EDF5;
margin-bottom: 24px;
`;

export const LotteryTypeTitle = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
font-size: 12px;
color:#687182;
font-weight: 500;
text-transform: uppercase;
`;

export const LotteryTypeValue = styled.div`
width: 100%;
box-sizing: border-box;
color: #3A57E8;
font-size: 14px;
font-weight: 500;
text-transform: uppercase;
margin-top: 16px;
`;

export const TwoFormSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
gap: 10px;
`;

export const FormView = styled.div`
width: 100%;
box-sizing: border-box;
flex-flow: column;
`;

export const Action = styled.div`
width: 100%;
box-sizing: border-box;
display: flex
justify-content: center;
text-align: right;
margin: 15px 0;
Button: first-child{
    margin-right: 15px;
}
`;

export const UploadImageBtnSection = styled.div`
width: 100%;
box-sizing: border-box;
text-align: right;
`;