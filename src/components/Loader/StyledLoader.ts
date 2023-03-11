import styled from 'styled-components';

export const Wrapper = styled.div`
width: 100Vw;
height: 100Vh;
background-color: rgba(0,0,0,0.4);
position: fixed;
top:0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
cursor: wait;
z-index: 101;
`;

export const LoadingImg = styled.img`
width: 200px;
height: 200px;
object-fit: contain;
`;