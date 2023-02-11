import styled from 'styled-components';
import {Dot} from '@styled-icons/bootstrap/Dot';
export const BreadCrumbs = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
`;

export const GamesView = styled.div`
width: 100%;
box-sizing: border-box;
padding: 30px;
background-color: #ffffff;
margin-top: 30px;
width: calc(100vw - 341px);
`;

export const GamesHeaders = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
`;

export const GameHeader = styled.div`
font-size: 12px;
font-weight: 500;
color: #687182;
text-transform: uppercase;
display: flex;
align-items: center;
justify-content: center;
max-width: 160px;
`;

export const TemplateItem = styled.div`
font-weight: 400;
font-size: 14px;
color: #200E32; 
max-width: 160px;
min-width: 160px;
`;

export const TemplatLineItem = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12);
border-radius: 10px;
height: 68px;
margin-bottom: 16px;
padding: 10px;
${TemplateItem}:nth-child(6){
    color: red;
    min-width: 140px;
    max-width: unset;
}
${TemplateItem}:nth-child(7){
    color: #219653 !important;
    border: 1px solid #3957E8;
    border-radius: 4px;
    min-width: unset;
    max-width: unset;
}
`;

export const TemplateList =  styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
`;



export const TemplateId = styled.div`
font-size: 14px;
font-weight: 500;
color: #3A57E8;
text-decoration: underline;
text-decoration-color: #3A57E8;
max-width: 160px;
min-width: 160px;
cursor: pointer;
`;

export const LotteryReward = styled.div`
font-weight: 400;
font-size: 14px;
color: #200E32; 
max-width: 160px;
min-width: 160px;
`;

export const ActiveStatus = styled.span`
background: rgba(33, 150, 83, 0.1);
border: 1px solid #219653;
border-radius: 4px;
color: #219653;
padding: 3px 10px 3px 0;
max-width: 160px;
min-width: 160px;
font-size: 12px;
`;

export const DeactiveStatus = styled.span`
background: rgba(235, 87, 87, 0.1);
border: 1px solid #EB5757;
border-radius: 4px;
color: #EB5757;
padding: 3px 10px 3px 0;
max-width: 160px;
min-width: 160px;
font-size: 12px;
`;

export const TemplateListHeader = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
margin-bottom: 20px;
`;

export const DotIcon = styled(Dot)`
/* width:10px */
height:20px;
`;

export const PublishBtn = styled.div`
padding: 8px 16px;
color: #000000;
cursor:pointer;
`;