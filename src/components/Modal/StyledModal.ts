import styled from 'styled-components';
import Box from '@mui/material/Box';
import {Close} from '@styled-icons/ionicons-outline/Close';

export const ModalHeadre = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content:space-between;
padding: 20px 30px;
font-weight: 500;
border: 1px solid #E9EFFF;
`;

export const HeaderTitle = styled.div`
font-size: 16px;
color: #000000;
`;

export const CloseIcon = styled(Close)`
height: 30px;
width: 38px;
cursor: pointer;
color: #000000;
`;

export const StyledBox = styled(Box)`
position: absolute;
  top: 19%;
  left: 30%;
  min: 400px;
  background-color: #ffffff;
  border: none;
`;