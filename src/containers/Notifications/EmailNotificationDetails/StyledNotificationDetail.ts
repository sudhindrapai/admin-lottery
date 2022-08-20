import styled from 'styled-components';

export const Wapper = styled.div`
width: 100%;
box-sizing: border-box;
background-color: #ffffff;
padding: 24px;
box-shadow: 0px 0px 2px rgb(0 0 0 / 12%);
border-radius: 8px;
margin-top: 20px;
`;

export const Form = styled.form`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column wrap;
align-items: flex-start;
justify-content: flex-start;
`;

export const ElementWrapper = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column wrap;
align-items: flex-start;
justify-content: flex-start;
margin-bottom: 30px;
`;

export const TwoElements = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
column-gap: 30px;
${ElementWrapper}{
    flex-basis: 48%;
}
`;

export const Label = styled.label`
width: 100%;
box-sizing: border-box;
font-size: 14px;
color: #000000;
margin-bottom: 8px;
`;

export const Value = styled.div`
width: 100%;
box-sizing: border-box;
padding: 8px 16px;
border: 1px solid #f1f1f1;
border-radius: 8px;
font-size: 14px;
`;