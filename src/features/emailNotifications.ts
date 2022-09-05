import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';
import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

import {handle401Status} from '../Utility/Utility';


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

interface CreateEmailNotificationPayload {
    emailSubject:string,
    emailBody:string,
    emailScheduleDate: string,
    emailUserType: string,
    emailAttachments: string[]
}

interface NotificationState {
    data: [] | EmailNotificationNode[],
    emailNotificationDetail: EmailNotificationNode | {},
    isDeleted: boolean,
    isNotificationCreated: boolean
}

const notificationInitialState:NotificationState = {
    data:[],
    emailNotificationDetail: {},
    isDeleted:false,
    isNotificationCreated: false
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
        },
        setEmailNotificationDetail: (state, action:PayloadAction<{data:EmailNotificationNode}>) => {
            return {
                ...state,
                emailNotificationDetail: action.payload.data
            }
        },
        updateDeleteStatus: (state, action:PayloadAction<{isDeleted:boolean}>) => {
            return {
                ...state,
                isDeleted: action.payload.isDeleted
            }
        },
        setEmailNotificationCreationState:(state,action:PayloadAction<{status:boolean}>) => {
            return {
                ...state,
                isNotificationCreated: action.payload.status
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

            if (response.statusCode === 401) {
                handle401Status();
            }

            if (response.statusCode === 200) {
                dispatch(setData({
                    data:response.result
                }))
            }
        })
    }
);

export const getNotificationDetail = createAsyncThunk(
    'get email notification detail', 
    async (payload:number, {dispatch}) => {
        await fetch(`${endpoints.getEmailNotificationDetail}${payload}`,{
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

            if (response.statusCode === 401) {
                handle401Status();
            }

            if (response.statusCode === 200) {
                dispatch(setEmailNotificationDetail({
                    data:response.result
                }))
            } else {

            }
        })
    }
    );

export const deleteEmailNotification = createAsyncThunk(
        'Delete Email Notification',
    async(payload:string,{dispatch}) => {
        await fetch(`${endpoints.deleteEmailNotificationEndPoint}?${payload}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {

            if (response.statusCode === 401) {
                handle401Status();
            }

            if (response.statusCode === 200) {
                dispatch(updateDeleteStatus({
                    isDeleted: true
                }))
            }
        })
    }
    );

    export const createAndScheduleEmailNotification = createAsyncThunk(
        'Create and Schedules email notifications',
        async(payload:CreateEmailNotificationPayload, {dispatch}) => {
            await fetch(endpoints.createEmailNotification,{
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
                body:JSON.stringify(payload)
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {

                if (response.statusCode === 401) {
                    handle401Status();
                }    

                if (response.statusCode === 200) {
                    dispatch(setEmailNotificationCreationState({
                        status:true
                    }))
                }
            })
        }
    );

export const {setData, setEmailNotificationDetail, updateDeleteStatus, setEmailNotificationCreationState} = emailNotificationSlice.actions;
export default emailNotificationSlice.reducer;