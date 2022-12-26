import styled from 'styled-components';
import {Delete} from '@styled-icons/fluentui-system-regular/Delete'

export const Wrapper = styled.div`
width: 100%;
box-sizing: border-box;
margin-bottom: 24px;
`;

export const Container = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
align-items: flex-start;
justify-content: flex-start;
background-color: #ffffff;
border-radius: 8px;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
`;

export const TitleWrapper = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
padding: 24px;
border-bottom: 1px solid #E9EDF5;
`;

export const Title = styled.div`
font-weight: 500;
font-size: 18px;
letter-spacing: 0.0024em;
color: #200E32;
`;

export const AddBtn = styled.div`
font-weight: 400;
font-size: 18px;
letter-spacing: 0.0024em;
color: #3A57E8;
cursor: pointer;
`;

export const EmptyImgSection = styled.div`
width: 100%;
box-sizing: border-box;
padding: 65px;
text-align: center;
font-weight: 400;
font-size: 18px;
line-height: 20px;
color: #ADB5BD;
`;

export const Image = styled.img`
height: 80px;
width: 80px;
min-height: 80px;
min-width: 80px;
object-fit: contain;
border: 1px solid #ccc;
border-radius: 4px;
`;

export const ImageWrapper = styled.div`
width: 100%;
box-sizing: border-box;
padding: 24px;
background-color: #ffffff;
border-bottom-right-radius: 6px;
border-bottom-left-radius: 6px;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
gap: 15px;
`;

export const IndImgWrapper = styled.div`
position: relative;
`;

export const DeleteIcon = styled(Delete)`
height:20px;
width: 20px;
position: absolute;
top: 0;
right: 0;
cursor:pointer;
`;