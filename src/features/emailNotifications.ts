import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';
import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

interface EmailNotificationNode {
    emailNotificationId: number,
    emailSubject: string,
    emailBody: string,
    emailScheduleDate: string,
    emailUserType: string,
    emailIds: null | string,
    isActive: boolean,
    emailSentCount: number,
    emailCreatedCount: number
}

interface NotificationState {
    data: [] | EmailNotificationNode[]
}

const notificationInitialState:NotificationState = {
    data:[]
}

const emailNotificationSlice = createSlice({
    name: 'Email notifications',
    initialState: notificationInitialState,
    reducers:{
        setData: (state, action:PayloadAction<{data:EmailNotificationNode[]}>) => {
            return {
                ...state,
                data: action.payload.data
            }
        }
    }
});

export const getEmailNotificationList = createAsyncThunk(
    'get email notifications list',
    async (payload:void, {dispatch}) => {
        await fetch (endpoints.getEmailNotificationList,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.statusCode === 200) {
                dispatch(setData({
                    data:response.result
                }))
            }
        })
    }
);

export const {setData} = emailNotificationSlice.actions;
export default emailNotificationSlice.reducer;