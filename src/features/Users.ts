import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

interface UsersStateType {
    users:any
}

interface SetUserListProps {
    data:any[]
}

const usersInitialState:UsersStateType = {
    users:[]
}

const usersList = [
    {
        userId: "1212121",
        userName: "Sudhindra",
        joinedDate: new Date(),
        totalPurchase: 100000,
        joinedLotteries:3,
        joinedAuction:4,
        isGoldMember:false
    },
    {
        userId: "1212123",
        userName: "Ganesh",
        joinedDate: new Date(),
        totalPurchase: 100000,
        joinedLotteries:3,
        joinedAuction:4,
        isGoldMember:true
    },
    {
        userId: "1212124",
        userName: "Kiran",
        joinedDate: new Date(),
        totalPurchase: 100000,
        joinedLotteries:3,
        joinedAuction:4,
        isGoldMember:false
    },
    {
        userId: "1212125",
        userName: "Kalyan",
        joinedDate: new Date(),
        totalPurchase: 100000,
        joinedLotteries:3,
        joinedAuction:4,
        isGoldMember:true
    }
];


export const getUserList = createAsyncThunk(
    'get users list',
    async (payload:string, {dispatch}) => {
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
            dispatch(setUserList({
                data:usersList
            }));
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