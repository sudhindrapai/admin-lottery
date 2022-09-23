import styled from 'styled-components';

interface GraphButtonProps {
    isSelected: boolean
}

export const HeaderWrapper = styled.div`
width: 100%;
box-sizing: border-box;
margin-bottom: 20px;
`;

export const GraphWrapper = styled.div`
width: 100%;
box-sizing: border-box;
background-color: #ffffff;
padding: 20px;
display: flex;
flex-flow: column nowrap;
flex-basis: 42%;
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

export const GraphButton = styled.div`
width: 100%;
box-sizing: border-box;
color: ${(props:GraphButtonProps) => props.isSelected ? '#3a57e8' : '#000000'};
background-color: ${(props:GraphButtonProps) => props.isSelected ? 'rgba(58,87,232,0.1)' : '#ffffff'};
padding: 10px 8px;
border: 1px solid #f1f1f1;
text-align:left;
cursor: pointer;
height: 50px;
word-break: break-word;
`;

export const VerticalButton = styled.div`
width: 100px;
box-sizing:border-box;
display: flex;
flex-flow: column wrap;
align-items: flex-start;
justify-content: flex-start;
margin-top: 30px;
padding-right: 10px;
`;

export const GraphRow = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
gap: 30px;
`;

export const GraphYaxis = styled.div`
width: 250px;
height: 50px;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
border: 1px solid #f1f1f1;
margin-left: 95px;
margin-top: 15px;
width: auto;
`;

export const GraphItem = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items:flex-start;
justify-content:flex-start;
`;

export const Label = styled.div`
background-color: rgba(58, 87, 232,0.3);
height: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 0 15px;
`;
export const GraphYButton = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 0 25px;
cursor: pointer;
`;