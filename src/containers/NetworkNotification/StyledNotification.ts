import styled from 'styled-components';

interface NotificationContainerProps {
    status: string,
    bgColor: string,
    visibility: boolean
}

export const NotificatoinWrapper = styled.div`
color: ${(props: NotificationContainerProps) => props.status || '#000000'};
position: fixed;
    top: 8%;
    left: 0;
    background-color: ${(props:NotificationContainerProps) => props.bgColor || '#cccccc'};
    padding: 15px 20px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    text-transform: capitalize;
    transition: transform .2s ease-out;
    transform: translateX(${(props:NotificationContainerProps) => props.visibility === true ? 0 : "-100%" });
    z-index: 1;
`;