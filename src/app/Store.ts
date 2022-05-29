import {configureStore} from '@reduxjs/toolkit';

import LoginSlice from '../features/loginSlice';
import LotteryListSlice from '../features/lotteryListSlice';
import CreateLottery from '../features/createLotterySlide';

const store = configureStore({
    reducer:{
        login: LoginSlice,
       lotteryList: LotteryListSlice,
       createLottery: CreateLottery
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;