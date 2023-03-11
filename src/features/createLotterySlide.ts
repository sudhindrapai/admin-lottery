import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints'

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {toggleLoader} from './loader'
import {NotificationType} from '../Utility/InterFacesAndEnum';

import {handle401Status} from '../Utility/Utility';

interface CreateLottery{
    errorMessage: string,
    isLotteryCreated: boolean
}

const createLotteryState:CreateLottery = {
    errorMessage:"",
    isLotteryCreated: false
};

export const createLottery = createAsyncThunk(
    'oneTimeLottery',
    async (requeryBody:any, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch (endpoints.createLottery,{
            method: "POST",
            body: JSON.stringify(requeryBody),
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            if (data.statusCode === 401) {
                handle401Status();
            }


            if (data.statusCode === 200){
                dispatch(toggleLotteryCreateState({
                    isCreated: true
                }));
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.success,
                    message: data.errorMsg
                }));
            } else {
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.error,
                    message: data.errorMsg
                }));
            }
        })
        .catch((error) => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "Something went wrong"
            }));
        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
        })
    }
);

interface ToggleLotteryCreate {
    isCreated: boolean
}

const createLotterySlice = createSlice({
    name:'create lottery',
    initialState: createLotteryState,
    reducers:{
        toggleLotteryCreateState: (state, action:PayloadAction<ToggleLotteryCreate>) => {
            return {
                ...state,
                isLotteryCreated: action.payload.isCreated
            }
        }
    }
});

export const {toggleLotteryCreateState} = createLotterySlice.actions;
export default createLotterySlice.reducer