import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints'

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';
import {toggleLoader} from './loader'
import {handle401Status} from '../Utility/Utility';

let updateTemplateInitialState = {
    templateObj:{}
};


export const getUpdateTemplateDetail = createAsyncThunk(
        'get template detail',
        async (payload:string, {dispatch}) => {
            dispatch(toggleLoader({
                isLoading: true
            }));
            await fetch (`${endpoints.getSingleTemplateDetail}${payload}`,{
                method: "GET",
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
    
                dispatch(setUpdateTemplate({
                    templateObj: data.result
                }));
            })
            .catch(() => {
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

const updateTemplateSlice = createSlice({
    name: 'Update Template Slice',
    initialState: updateTemplateInitialState,
    reducers: {
        setUpdateTemplate: (state, action:PayloadAction<any>) => {
            return {
                ...state,
                templateObj: action.payload.templateObj
            }
        }
    }
});

export const {setUpdateTemplate} = updateTemplateSlice.actions;
export default updateTemplateSlice.reducer;