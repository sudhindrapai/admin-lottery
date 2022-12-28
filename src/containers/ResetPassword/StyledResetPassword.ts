import styled from 'styled-components';

import {Close} from '@styled-icons/ionicons-outline/Close'

export const Wrapper = styled.div`
width: 100%;
box-sizing: border-box;
height: 85vh;
width: 95vw;
display: flex;
align-items: center;
justify-content: center;
`;
export const Container = styled.div`
width: 425px;
height: auto;
background-color: #ffffff;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
padding: 50px;
text-align: center;
position: relative;
`;

export const Title = styled.div`
width: 100%;
box-sizing: border-box;
font-size: 18px;
color: #000000;
font-weight: 600;
margin-bottom: 15px;
`;

export const SubTitle = styled.div`
width: 100%;
box-sizing: border-box;
font-size: 14px;
color: rgba(0,0,0,0.5);
text-align: left;
margin-bottom: 15px;
`;

export const CloseIcon = styled(Close)`
height: 24px;
width: 24px;
cursor:pointer;
color: #000000;
position: absolute;
top: 10px;
right: 10px;
`;