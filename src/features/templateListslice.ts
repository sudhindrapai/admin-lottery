import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';
import {toggleLoader} from './loader'
import {handle401Status} from '../Utility/Utility';

const initialState = {
    templateList: [],
    isTemplateDeleted:false
}

interface SetGameListProps {
    templateList:[]
}

interface PublishRequestProps {
    templateId:number
}

interface RemoveTemplateProps {
    templateId: number
}

interface UpdateStatus {
    status: boolean
}

export const getTemplateList = createAsyncThunk(
    'get games list',
    async (payload, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
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

            if (data.statusCode === 401) {
                handle401Status();
            }

            if (data.statusCode === 504) {
                dispatch(setTemplateList({
                    templateList:[]
                }))
                dispatch(toggleNotificationVisibility({
                    isVisible: true,
                    status: NotificationType.error,
                    message: data.errorMsg
                }));
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
        });
    }
);

export const publishLottery = createAsyncThunk(
    'publish lottery',
    async (payload:PublishRequestProps, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(`${endpoints.publishLottery}${payload.templateId}`, {
            method: 'POST',
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
            } else if (data.statusCode === 200) {
                dispatch(getTemplateList())
            }

        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
        })
    }
);

export const removeTemplate = createAsyncThunk(
    'remove template',
    async (payload: RemoveTemplateProps, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(`${endpoints.removeLotteryTemplate}?lotteryId=${payload.templateId}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            dispatch(setTemplateRemoveStatus({status:true}))
        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
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
        },
        setTemplateRemoveStatus: (state, action:PayloadAction<UpdateStatus>) => {
            return {
                ...state,
                isTemplateDeleted: action.payload.status
            }
        }
    }
});

export const {setTemplateList,setTemplateRemoveStatus} = gamesList.actions;
export default gamesList.reducer;