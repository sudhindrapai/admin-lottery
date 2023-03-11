import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';
import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';
import {handle401Status} from '../Utility/Utility';
import {toggleLoader} from './loader';

interface DashboardData {
        totalUsers: number,
        goldUsers: number,
        regularUsers: number,
        totalLotteries: number,
        upcomingLotteres: number,
        currentLotteries: number,
        executedLotteries: number,
        deletedLotteries: number,
        executedLotteriesTotalRewardPrice: number,
        executedLotteriesTotalTicketsPrice: number,
        executedLotteriesTotalTicketsSold: number,
        executedLotteriesPlatinumTicketsPrice: number,
        executedLotteriesPlatinumTicketsSold: number,
        executedLotteriesGoldTicketsPrice: number,
        executedLotteriesGoldTicketsSold: number,
        executedLotteriesSilverTicketsPrice: number,
        executedLotteriesSilverTicketsSold: number,
        executedLotteriesBronzeTicketsPrice: number,
        executedLotteriesBronzeTicketsSold: number,
        currentLotteriesTotalRewardPrice: number,
        currentLotteriesTotalTicketsPrice: number,
        currentLotteriesTotalTicketsSold: number,
        currentLotteriesPlatinumTicketsPrice: number,
        currentLotteriesPlatinumTicketsSold: number,
        currentLotteriesGoldTicketsPrice: number,
        currentLotteriesGoldTicketsSold: number,
        currentLotteriesSilverTicketsPrice: number,
        currentLotteriesSilverTicketsSold: number,
        currentLotteriesBronzeTicketsPrice: number,
        currentLotteriesBronzeTicketsSold: number
}

interface DashboardInitialState {
    data: DashboardData | {}
}

const dashboardInitialState:DashboardInitialState = {
    data: {}
}

export const getDashboardData = createAsyncThunk(
    'get dashboard data',
    async(payload,{dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(endpoints.getDashboardData,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {

            if (response.status === 401) {
                handle401Status();
            }

            if (response.statusCode === 200) {
                dispatch(setDashboardData({
                    data:response.result
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
        .catch((error) => {
            console.log(error,"dashboard error")
        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
        });
    })

const dashboardSlice = createSlice({
    name: 'Dashboard Slice',
    initialState:dashboardInitialState,
    reducers:{
        setDashboardData: (state, action:PayloadAction<{data:DashboardData}>) => {
            return {
                ...state,
                data:action.payload.data
            }
        }
    }
});

export const {setDashboardData} = dashboardSlice.actions;
export default dashboardSlice.reducer;