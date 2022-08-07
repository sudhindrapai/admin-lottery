import {createSlice, PayloadAction} from '@reduxjs/toolkit';
enum NotificationType {
    success = "success",
    error = "error",
    warning = 'warning'
}

interface NotificationProps {
    isVisible: boolean,
    status: NotificationType,
    message: string
}


const notificatoinState: NotificationProps = {
    isVisible: false,
    status: NotificationType.success,
    message: "Kings Ring"
}
// 
const notificationSlice = createSlice({
    name: "Notification",
    initialState: notificatoinState,
    reducers:{
        toggleNotificationVisibility: (state, action:PayloadAction<NotificationProps>) => {
            return{
                ...state,
                isVisible: action.payload.isVisible,
                status: action.payload.status,
                message: action.payload.message
            }
        }
    }
});

export const {toggleNotificationVisibility} = notificationSlice.actions;
export default notificationSlice.reducer;