import styled from 'styled-components';

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
`;

export const BrandLogo = styled.img`
width: auto;
height: 120px;
object-fit: contain;
margin-bottom: 30px;
`;

export const LoginForm = styled.form`
width: 100%;
box-sizing: border-box;
margin-bottom: 30px;
`;

export const ForgotPswd = styled.div`
width: 100%;
box-sizing:border-box;
text-align: right;
font-size: 12px;
cursor:pointer;
color: rgba(0,0,0,0.5);
`;