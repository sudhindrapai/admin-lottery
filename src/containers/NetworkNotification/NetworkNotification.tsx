import React from 'react';
import {RootState} from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {toggleNotificationVisibility} from '../../features/networkNotification';
import {NotificatoinWrapper} from './StyledNotification';
import {NotificationType} from '../../Utility/InterFacesAndEnum'

const Notification:React.FC = () => {

    const dispatch = useDispatch();

    let isVisible = useSelector((state:RootState) => state.networkNotification.isVisible);
    let notificationStatus = useSelector((state:RootState) => state.networkNotification.status);
    let message = useSelector((state:RootState) => state.networkNotification.message);

    setTimeout(() => {
        dispatch(toggleNotificationVisibility({
            isVisible: false,
            status: NotificationType.success,
            message: "Kings Ring"
        }))
    }, 3000);

    return (<NotificatoinWrapper 
        visibility = {isVisible}
    status={notificationStatus === "success" || "error" ? "#FFFFFF" : "#000000"}  
    bgColor ={notificationStatus === "success" ? "green" : notificationStatus === "error" ? "red":"yellow"} >
        {message}
    </NotificatoinWrapper>)
};

export default Notification;