import {configureStore} from '@reduxjs/toolkit';

import LotteryListSlice from '../features/lotteryListSlice';

const store = configureStore({
    reducer:{
       lotteryList: LotteryListSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;