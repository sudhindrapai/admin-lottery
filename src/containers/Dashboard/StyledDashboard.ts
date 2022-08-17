import styled from 'styled-components';

export const HeaderWrapper = styled.div`
width: 100%;
box-sizing: border-box;
margin-bottom: 20px;
`;

export const GraphWrapper = styled.div`
width: 100%;
box-sizing: border-box;
background-color: #ffffff;
padding: 30px;
display: flex;
flex-basis: 47%;
box-shadow: 0px 0px 2px rgb(0 0 0 / 12%);
border-radius: 8px;
`;

export const GraphList = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row wrap;
align-items: flex-start;
justify-content: flex-start;
gap:30px;
margin-bottom: 50px;
`;

export const Card = styled.div`
display: flex;
flex-flow:column;
align-items: center;
justify-content: center;
flex-basis: 23%;
/* max-width: 240px; */
`;

export const CardsList = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row wrap;
gap: 15px;
margin-bottom: 50px;
`;