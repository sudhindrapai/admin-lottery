import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

const promotionInitialState = {
    isLoading:false,
    home:[],
    lottery:[],
    auction:[]
}


export const getPromotionList = createAsyncThunk(
    'get promotion list',
    async(payload:string,{dispatch}) => {
        await fetch(`${endpoints.getPromotionList}?promotionPage=${payload}`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
           if (response.statusCode === 200) {
               dispatch(setDesktopBanners({
                   response:response.result,
                   responseType:payload
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
)

const promotionReducer = createSlice({
    name:'Promotion reducer',
    initialState:promotionInitialState,
    reducers:{
        setDesktopBanners: (state, action:PayloadAction<{
            responseType:string,
            response:any
        }>) => {
            if (action.payload.responseType === "HOME") {
                return {
                    ...state,
                    home:action.payload.response
                }
            } else if (action.payload.responseType === "LOTTERY") {
                return {
                    ...state,
                    lottery:action.payload.response
                }
            } else if (action.payload.responseType === "AUCTION"){
                return{
                    ...state,
                    auction:action.payload.response
                }
            }
        }
    }
})

export const {setDesktopBanners} = promotionReducer.actions;
export default promotionReducer.reducer;