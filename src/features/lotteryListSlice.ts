import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {LotteryDetail} from '../Utility/InterFacesAndEnum';
import * as endpoint from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

interface getLotteriesInitialState {
    lotteryList:LotteryDetail[],
    page: number,
    limit: number
}

const lotteryListInitialStatae:getLotteriesInitialState = {
    lotteryList:[],
    page: 1,
    limit: 10
}

interface getLotteryListResponse {
    lotteryList:LotteryDetail[]
}

export const getLotteryList = createAsyncThunk(
    'lottery/get',
    async (queryParams, {dispatch}) => {
        await fetch(endpoint.getLotteryList, {
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
            dispatch(setLotteryList({
                lotteryList:response.result
            }))
        })
    }
);


const LotteryListSlice = createSlice({
    name: 'lotteryList',
    initialState: lotteryListInitialStatae,
    reducers:{
        setLotteryList: (state, action:PayloadAction<getLotteryListResponse>) => {
            return {
                ...state,
                lotteryList:action.payload.lotteryList
            }
        }
    }
});

export const {setLotteryList} = LotteryListSlice.actions;
export default LotteryListSlice.reducer;