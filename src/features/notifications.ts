import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

interface NotificationStateProps {
    emailNotifications: any,
    pushNotifications:any,
    isEmailNotificationCreated: boolean,
    isPushNotificationCreated: boolean
}

interface SetNotificationList {
    data: any
}

interface ToggleCreationState{
    isCreated: boolean
}

const NotificationState:NotificationStateProps = {
    emailNotifications: [],
    pushNotifications:[],
    isEmailNotificationCreated: false,
    isPushNotificationCreated: false
}

export const getEmailNotifications = createAsyncThunk(
    'Email notification',
    async (payload:string,{dispatch}) => {
        await fetch(endpoints.getEmailNotifications,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.data === 200) {
           dispatch(setEmailNotificatons({
               data:[]
           }));
           dispatch(toggleNotificationVisibility({
            isVisible: true,
            status: NotificationType.success,
            message: response.errorMsg
        }));
    } else {
        dispatch(toggleNotificationVisibility({
            isVisible: true,
            status: NotificationType.error,
            message: response.errorMsg
        }));
    }
        })
        .catch((error) => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "something went wrong"
            }));
        })
    }
);

export const getPushNotifications = createAsyncThunk(
    'get pushnotification list',
    async (payload:string,{dispatch}) => {
        await fetch(endpoints.getPushNotifications,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.data === 200) {
            dispatch(setPushNotificatons({
                data: []
            }));
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.success,
                message: response.errorMsg
            }));
        } else {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: response.errorMsg
            }));
        }
        })
        .catch((error)=> {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "something went wrong"
            }));
        })
    }
);

const notificationSlice = createSlice({
    name: 'Notificaton Slice',
    initialState: NotificationState,
    reducers: {
        setEmailNotificatons: (state, action:PayloadAction<SetNotificationList>) => {
            return {
                ...state,
                emailNotifications: action.payload.data
            }
        },
        setPushNotificatons: (state, action:PayloadAction<SetNotificationList>) => {
            return {
                ...state,
                pushNotifications: action.payload
            }
        }
    }
});

export const {setEmailNotificatons, setPushNotificatons} = notificationSlice.actions
export default notificationSlice.reducer;