import styled from 'styled-components';

export const StyledAppWrapper = styled.div`
width: 100%;
box-sizing: border-box;
text-align: left;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
background-color: #F6F6F6;
`;

export const LeftMenuSection = styled.div`
display: flex;
flex-basis: 18%;
height: 100vh;
border-right: 1px solid #F6F6F6;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
background-color: #ffffff;
`;

export const ContentWrapper = styled.div`
width: 100%;
box-sizing: border-box;
display:flex;
flex-flow: column;
align-items: flex-start;
justify-content: flex-start;
flex-basis: 82%;
`;

export const Content = styled.div`
width: 100%;
box-sizing: border-box;
padding: 20px 40px 0 40px;
height: 100%;
max-height: 90vh;
overflow-y: scroll;
`;