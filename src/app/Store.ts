import {configureStore} from '@reduxjs/toolkit';

import LoginSlice from '../features/loginSlice';
import LotteryListSlice from '../features/lotteryListSlice';
import CreateLottery from '../features/createLotterySlide';
import TemplateList from '../features/templateListslice';
import UpdateTemplate from '../features/updateTemplateSlice';
import Auction from '../features/auctionList';
import ImageUploader from '../features/imageUploaderSlice';
import UsersSlice from '../features/Users';
import NetworkNotification from '../features/networkNotification';

const store = configureStore({
    reducer:{
        login: LoginSlice,
       lotteryList: LotteryListSlice,
       createLottery: CreateLottery,
       templateList: TemplateList,
       updateTemplate: UpdateTemplate,
       auction:Auction,
       images:ImageUploader,
       users: UsersSlice,
       networkNotification:NetworkNotification
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;