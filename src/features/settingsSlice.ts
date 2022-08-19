import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';
import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

interface SettingsNode {
    settingId: number,
    settingFor: string,
    bronzeTicketPrice: number,
    silverTicketPrice: number,
    goldTicketPrice: number,
    platinumTicketPrice: number,
    bronzeSubTickets: number,
    silverSubTickets: number,
    goldSubTickets: number,
    platinumSubTickets: number,
    isAdminWinner: boolean,
    safetyDepositAmount: number
}

interface SettingsState {
    data: SettingsNode[] | []
}


const settingsInitialState:SettingsState = {
    data: []
}

const settingsSlice = createSlice({
    name:'Settings detail slice',
    initialState: settingsInitialState,
    reducers:{
        setData: (state, action:PayloadAction<SettingsState>) => {
            return {
                ...state,
                data: action.payload.data
            }
        }
    }
});


export const getSettingsData = createAsyncThunk(
    'get settings data',
    async (payload:void, {dispatch}) => {
        await fetch (endpoints.getSettingsData, {
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
                    data: response.result
                }))
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
        .catch(() => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "Something went wrong"
            }));
        })
    }
);

export const updateSettingsData = createAsyncThunk(
    'Updated lottery or auction data',
    async(payload:SettingsNode | {}, {dispatch}) => {
        await fetch(endpoints.updatedSettingsData, {
            method: 'PUT',
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
            if (response.statusCode === 200) {
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
        .catch(() => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "Something went wrong"
            }));
        })
    });

export const {setData} = settingsSlice.actions;
export default settingsSlice.reducer