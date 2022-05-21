import styled from 'styled-components';
import {ArrowBack} from '@styled-icons/evaicons-solid/ArrowBack';

export const Title = styled.div`
font-size: 18px;
line-height: 27px;
font-weight: 600;
color: #000000;
display: inline-flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
width: fit-content;
background-color: transparent;
`;

export const ArrowBackIcon = styled(ArrowBack)`
color: #000000;
height: 30px;
margin-right: 15px;
`;