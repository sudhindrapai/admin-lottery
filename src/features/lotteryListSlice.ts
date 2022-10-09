import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {LotteryDetail} from '../Utility/InterFacesAndEnum';
import * as endpoint from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

import {handle401Status} from '../Utility/Utility';

interface getLotteriesInitialState {
    lotteryList:LotteryDetail[],
    page: number,
    limit: number,
    lotteryGameDetail: any
}

const lotteryListInitialStatae:getLotteriesInitialState = {
    lotteryList:[],
    page: 1,
    limit: 10,
    lotteryGameDetail:{}
}

interface getLotteryListResponse {
    lotteryList:LotteryDetail[]
}

export const getLotteryList = createAsyncThunk(
    'lottery/get',
    async (queryParams:string, {dispatch}) => {
        await fetch(`${endpoint.getLotteryList}?lotteryType=${queryParams}`, {
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

            if (response.statusCode === 401) {
                handle401Status();
            }

            if (response.statusCode === 200) {
                dispatch(setLotteryList({
                    lotteryList:response.result
                }));
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.success,
                    message: response.errorMsg
                }));
            } else if (response.statusCode === 504) {
                dispatch(setLotteryList({
                    lotteryList:[]
                }));
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.error,
                    message: response.errorMsg
                }));
            } else {
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.error,
                    message: "Something went wrong"
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
    }
);


export const getLotteryGameDetail = createAsyncThunk(
    'get lottery game detail',
    async(payload:string,{dispatch}) => {
        await(fetch(`${endpoint.getLotteryGameById}${payload}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        }))
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.statusCode === 401) {
                handle401Status();
            }

            if (response.statusCode === 200) {
                dispatch(setLotteryGameDetail({
                    data:response.result
                }));
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.success,
                    message: response.errorMsg
                }));
            } else if (response.statusCode === 504) {
                dispatch(setLotteryGameDetail({
                    data:[]
                }));
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.error,
                    message: response.errorMsg
                }));
            } else {
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.error,
                    message: "Something went wrong"
                }));
            }
        })
    }
)

const LotteryListSlice = createSlice({
    name: 'lotteryList',
    initialState: lotteryListInitialStatae,
    reducers:{
        setLotteryList: (state, action:PayloadAction<getLotteryListResponse>) => {
            return {
                ...state,
                lotteryList:action.payload.lotteryList
            }
        },
        setLotteryGameDetail: (state,action:PayloadAction<any>) => {
            return {
                ...state,
                lotteryGameDetail:action.payload.data
            }
        }
    }
});

export const {setLotteryList,setLotteryGameDetail} = LotteryListSlice.actions;
export default LotteryListSlice.reducer;