import * as endPoint from '../networkUtility/endpoints';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import * as localStorageActionType from '../LocalStorage/ActionTypes';
import {setLocalStorage} from '../LocalStorage/SetLocalStorage';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage'

import {toggleNotificationVisibility} from './networkNotification';
import {toggleLoader} from './loader'
import {NotificationType} from '../Utility/InterFacesAndEnum';

import {handle401Status} from '../Utility/Utility';

interface LoginState {
    isLoading: boolean,
    isLoggedin: boolean,
    isAuthenticated: boolean,
    activeUserCount:number
}

interface Loading {
    isLoading: boolean
}

interface Login {
    isLoggedin: boolean,
    isAuthenticated: boolean
}

const loginInitialState:LoginState = {
    isLoading: false,
    isLoggedin: false,
    isAuthenticated: false,
    activeUserCount: 0
}

interface SigninAccount {
    emailId: string,
    password: string
}

export const createLogin = createAsyncThunk(
    'auth/login',
    async (loginObj:SigninAccount, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        const response = await fetch(endPoint.login,
        {
            method: 'POST',
            body: JSON.stringify(loginObj),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json() 
        })
        .then((data) => {

            if (data.statusCode === 401) {
                handle401Status();
            }

            if (data.statusCode === 200) { 
            
            dispatch(toggleLogin({
                isLoggedin:true,
                isAuthenticated: false
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
                message: "something went wrong!"
            }));
            dispatch(toggleLoading({
                isLoading: false
            }));
        })
        .finally(() => {
            dispatch(toggleLoading({
                isLoading: false
            }));
        })
    }
);

export const verify2FA = createAsyncThunk(
    'verify 2FA OTP',
    async (payload:string,{dispatch}) => {
        await fetch (endPoint.verifyOtp, {
            method: 'POST',
            body: payload,
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActionType.GET_ACCESS_TOKEN)}`,
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

            if (data.statusCode === 200) {

            let responseObj = data.result;
            let publicUserId = responseObj.publicUserId;
            let tokenObj = {
                accessToken: responseObj.accessToken,
                refreshToken: responseObj.refreshToken
            }
            
             setLocalStorage(localStorageActionType.SET_ACCESS_REFRESH_TOKEN, tokenObj);
             setLocalStorage(localStorageActionType.SET_PUBLIC_USER_ID, publicUserId);
            
            dispatch(toggleLogin({
                isLoggedin:true,
                isAuthenticated: responseObj.authenticated
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
    }
);

export const getActiveUserCount = createAsyncThunk(
    'get active user count',
    async (payload:void,{dispatch}) => {
        dispatch(toggleLoading({
            isLoading: true
        }));
        await fetch(endPoint.getUserCount,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActionType.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            dispatch(setActiveUserCount({
                count:data.result
            }))
        })
        .finally(() => {
            dispatch(toggleLoading({
                isLoading: false
            }));
        });
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState: loginInitialState,
    reducers:{
        resetLoginState : () => {
            return loginInitialState
        },
        toggleLoading : (state, action:PayloadAction<Loading>) => {
            return{
                ...state,
                isLoading: action.payload.isLoading
            }
        },
        toggleLogin : (state, action: PayloadAction<Login>) => {
            return {
                ...state,
                isLoggedin: action.payload.isLoggedin,
                isAuthenticated: action.payload.isAuthenticated
            }
        },
        setActiveUserCount: (state, action: PayloadAction<{count:number}>) => {
            return {
                ...state,
                activeUserCount:action.payload.count
            }
        }
    }
});

export const {resetLoginState, toggleLoading, toggleLogin, setActiveUserCount} = loginSlice.actions;
export default loginSlice.reducer;