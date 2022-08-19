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
import PromotinsReducer from '../features/promotions';
import DashboardReducer from '../features/dashboard';
import Settings from '../features/settingsSlice';
import emailNotifications from '../features/emailNotifications';

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
       networkNotification:NetworkNotification,
       promotions:PromotinsReducer,
       dashboard:DashboardReducer,
       settings: Settings,
       emailNotifications:emailNotifications
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;