import styled from 'styled-components';

export const ProfileImage = styled.img`
height: 70px;
width: 70px;
object-fit: contain;
border-radius: 50%;
`;

export const Wrapper = styled.div`
width: 100%;
box-sizing: border-box;
background-color: #ffffff;
display: flex;
flex-flow: row;
align-items:center;
justify-content: flex-end;
height: 60px;
padding: 0 40px;
box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.04);
border-bottom: 1px solid #F6F6F6;
`;

export const DropdownContainer = styled.div`
position: absolute;
top: 60px;
right: -30px;
width: 140px;
z-index: 1;
box-shadow: 0px 4px 44px rgb(0 0 0 / 12%);
  background-color: #FFFFFF;
  border-radius: 5px;
  display: none;
`;


export const ProfielWapper = styled.div`
position: relative;
margin-right: 20px;
&:hover{
    ${DropdownContainer}{
        display: block;
    }
}
`;


export const DropdownOption = styled.div`
width: 100%;
box-sizing: border-box;
padding: 12px 16px;
border-bottom: 1px solid #f7f7f7;
color: #000000;
text-align: left;
cursor: pointer;
&:last-child{
    border-bottom: none;
}
`;