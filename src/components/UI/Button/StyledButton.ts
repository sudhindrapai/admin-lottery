import styled from 'styled-components';

interface ButtonProps {
    btnSize: string,
}

export const StyledButton = styled.button`
background-color: #3a57e8;

`;

export const PrimaryBtnFilled = styled.button`
background-color: #3a57e8;
padding: ${(props:ButtonProps) => props.btnSize === 'small' ? '4px 6px' : props.btnSize === 'medium' ? '6px 8px' : '8px 16px'};
width: auto;
border: none;
color: #ffffff;
cursor: pointer;
border-radius: 4px;
`;

export const PrimaryBtnLink = styled.button`
background-color: transparent;
padding: ${(props:ButtonProps) => props.btnSize === 'small' ? '4px 6px' : props.btnSize === 'medium' ? '6px 8px' : '8px 16px'};
width: auto;
border: none;
color: #3a57e8;
cursor: pointer;
text-decoration: underline;
text-decoration-color: #3a57e8;
`;