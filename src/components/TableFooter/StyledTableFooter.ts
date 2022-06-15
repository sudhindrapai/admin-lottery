import styled from 'styled-components';
import {ArrowIosBack} from '@styled-icons/evaicons-solid/ArrowIosBack';
import {ArrowIosForward} from '@styled-icons/evaicons-solid/ArrowIosForward'

export const Wrapper = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items:center;
justify-content: space-between;
height: 64px;
`;

export const RecordsCount = styled.div`
font-size: 12px;
color: #687182;
`;

export const Pagination = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-end;
`;

export const ChevronWrapper = styled.div`
display: inline-block;
padding: 0 2px 2px 3px;
border: 1px solid #ccc;
background: #F7F9FC;
box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
border-radius: 6px;
cursor: pointer;
`;

export const PageNumber = styled.div`
font-size: 12px;
color: #3A57E8;
margin: 0 10px;
`;

export const ChevronRightIcon = styled(ArrowIosForward)`
width: 16px;
color: #464F60;
`;

export const ChevronLeftIcon = styled(ArrowIosBack)`
width: 16px;
color: #464F60;
`;