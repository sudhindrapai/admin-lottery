import styled from 'styled-components';

export const CardWrapper = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
align-items: center;
justify-content: center;
padding: 18px;
gap: 14px;
background-color: #ffffff;
box-shadow: 0px 10px 30px rgba(17, 38, 146, 0.05);
border-radius: 8px;
`;

export const Label = styled.label`
width: 100%;
box-sizing: border-box;
font-weight: 400;
font-size: 16px;
line-height: 28px;
color: #8A92A6;
word-break: break-word;
text-transform: upperCase;
`;

export const Count = styled.div`
width: 100%;
box-sizing: border-box;
font-weight: 500;
font-size: 28px;
line-height: 36px;
color: #232D42;
`;