import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

const initialState = {
    templateList: []
}

interface SetGameListProps {
    templateList:[]
}

export const getTemplateList = createAsyncThunk(
    'get games list',
    async (payload, {dispatch}) => {
        await fetch (endpoints.getTemplateList, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.statusCode === 504) {
                dispatch(setTemplateList({
                    templateList:[]
                }))
            } else if (data.statusCode === 200) {
                let resultList = data.result;
                let updatedArray = resultList.map((templateObj) => {
                    return{
                        lotteryId: templateObj.lotteryId,
                        rewardType: templateObj.rewardType,
                        rewardAmount: templateObj.rewardAmount,
                        rewardGiftName: templateObj.rewardGiftName,
                        isRepeat: templateObj.isRepeat,
                        lotteryStartDate: templateObj.lotteryStartDate,
                        lotteryEndDate: templateObj.lotteryEndDate,
                        lotteryStartDay: templateObj.lotteryStartDay,
                        lotteryEndDay: templateObj.lotteryEndDay,
                        lotteryStartTime:templateObj.lotteryStartTime,
                        lotteryEndTime:templateObj.lotteryEndTime,
                        isActive: templateObj.isActive
                    }
                });
                dispatch(setTemplateList({
                    templateList: updatedArray
                }))
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
);

const gamesList = createSlice({
    name: 'games list slice',
    initialState: initialState,
    reducers: {
        setTemplateList: (state, action:PayloadAction<SetGameListProps>) => {
            return {
                ...state,
                templateList: action.payload.templateList
            }
        }
    }
});

export const {setTemplateList} = gamesList.actions;
export default gamesList.reducer;