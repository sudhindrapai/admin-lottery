import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints'

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

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
            console.log(data);
            if (data.statusCode === 200){
                dispatch(toggleLotteryCreateState({
                    isCreated: true
                }));
            }
        })
    }
);

interface ToggleLotteryCreate {
    isCreated: boolean
}

const createLotterySlide = createSlice({
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

export const {toggleLotteryCreateState} = createLotterySlide.actions;
export default createLotterySlide.reducer