import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';
import {toggleLoader} from './loader'
import {handle401Status} from '../Utility/Utility';

interface UsersStateType {
    users:any
}

interface SetUserListProps {
    data:any[]
}

const usersInitialState:UsersStateType = {
    users:[]
}


export const getUserList = createAsyncThunk(
    'get users list',
    async (payload:string, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(`${endpoints.getUserList}`,{
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

            dispatch(setUserList({
                data:response.result
            }));
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

const usersSlice = createSlice({
    name: 'users slice',
    initialState: usersInitialState,
    reducers:{
        setUserList: (state, action:PayloadAction<SetUserListProps>) => {
            return{
                ...state,
                users:action.payload.data
            }
        }
    }
});

export const {setUserList} = usersSlice.actions;
export default usersSlice.reducer