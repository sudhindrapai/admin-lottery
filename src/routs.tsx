import {FC} from 'react';
import {Routes, Route} from 'react-router-dom';

import * as localStorageActionType from './LocalStorage/ActionTypes';
import {getLocalStorage} from './LocalStorage/GetLocalStorage';

// import of views
import Dashboard from './containers/Dashboard/Dashboard';
import LotteryList from './containers/Lottery/LotteryList/LotteryList';
import CreateRepeatedLottery from './containers/Lottery/CreateLottery/RepeatedLottery/CreateLottery';
import CreateOneTimeLottery from './containers/Lottery/CreateLottery/OneTimeLottery/CreateOneTimeLottery';
import ViewLottery from './containers/Lottery/ViewLottery/ViewLottery';
import GamesList from './containers/Lottery/TemplateList/LotteryTemplateList';
import LoginForm from './containers/Login/Login';
import UpdateLottery from './containers/Lottery/UpdateLottery/UpdateLottery';
import UpdateLotteryTemplate from './containers/Lottery/UpdateTemplate/UpdateTemplate';
import UpdateOneTimeLotteryTemplate from './containers/Lottery/UpdateTemplate/UpdateOneTimeTemplate';
import AuctionList from './containers/Auction/AuctionsList/AuctionList';
import AuctionRequests from './containers/Auction/NewAuctionsList/NewAuctionList';
import CreateAuction from './containers/Auction/CreateAuction/CreateAuction';
import AuctionDetail from './containers/Auction/AuctionDetail/AuctionDetail';
import ApproveAuction from './containers/Auction/ApproveAuction/AuctionDetail';
import MasterValues from './containers/Settings/MasterValueSetting/Settings';
import UsersList from './containers/Users/UsersList/UserList';
import EmailNotificationList from './containers/Notifications/EmailNotifications/EmailNotifications';
import PushNotificationList from './containers/Notifications/PushNotifications/PushNotifications';
import UserSettings from './containers/Settings/UserSettings/UserSettings';
import CreateNotification from './containers/Notifications/CreateNotification/CreateNotification';
import Promotions from './containers/Promotions/Promotions';
import EmailNotificationDetail from './containers/Notifications/EmailNotificationDetails/NotificationDetails';
import Profile from './containers/Profile/Profile';
import TwoFa from './containers/2FA/TwoFa';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import ResetPassword from './containers/ResetPassword/ResetPassword'

let accessToken = getLocalStorage(localStorageActionType.GET_ACCESS_TOKEN);

let rootView = accessToken ? <Dashboard /> : <LoginForm />

const routeToAuctionDetail = (id:number | null) => {
    if (id === null) {
        return "/admin/auction/auction-detail/:auctionId"
    } else {
        return `/admin/auction/auction-detail/${id}`
    }
}

const routeToGetAuctionApproveDetail = (id:number | null) => {
    if (id === null) {
        return "/admin/auction/request-for-approve/auction-detail/:auctionId"
    } else {
        return `/admin/auction/request-for-approve/auction-detail/${id}`
    }
};

const routeToGetEmailNotificationDetail = (id:number | null) => {
    if (id === null) {
        return "/admin/notification/email/detail/:notificationId"
    } else {
        return `/admin/notification/email/detail/${id}`
    }
}

export const adminRouts = {
    rootPath: "/",
    forgotPassword:"/admin/forgot-password",
    resetPassword:"/admin/reset-password",
    dashboard: "/admin/dashboard",
    lotteryList: "/admin/lottery/list",
    createRepeatedLottery:"/admin/lottery/create/repeated-lottery",
    createOneTimeLottery:"/admin/lottery/create/one-time-lottery",
    viewLottery:"/admin/lottery/view/:lotteryId",
    modifyLottery:"/admin/lottery/update",
    auctionList:"/admin/auction/list",
    auctionRequestList:"/admin/auction/request-list",
    createAuction:"/admin/auction/create",
    viewAuction:"/admin/auction/view",
    modifyAuction:"/admin/auction/update",
    usersList:"/admin/users",
    viewUser:"/admin/users/view",
    masterValue:"/admin/settings/masterValue",
    userSettings:"/admin/settings/user-details",
    gamesList:"/admin/games/list",
    login:"/admin/login",
    twoFa:"/admin/twoFa",
    updateLottery: "/admin/lottery/update-lottery",
    updateTemplate: "/admin/lottery/update-template/:lotteryId",
    updateOneTimeTemplate: "/admin/lottery/update-onetime-template/:lotteryId",
    emailNotificationList:"/admin/notifications/email-notifications/list",
    pushNotificationList:"/admin/notifications/push-notifications/list",
    createNotification:"/admin/notification/create-notification",
    promotions:"/admin/promotions",
    profile:"/admin/profile",
    updateAuction:routeToAuctionDetail,
    approveAuction:routeToGetAuctionApproveDetail,
    emailNotificationDetail: routeToGetEmailNotificationDetail
}

const AppRoute:FC = () => {
    return(
        accessToken ? <Routes>
            <Route path={adminRouts.rootPath} element={rootView} />
            <Route path={adminRouts.dashboard} element={<Dashboard />} />
            <Route path={adminRouts.lotteryList} element={<LotteryList />} />
            <Route path={adminRouts.gamesList} element={<GamesList />} />
            <Route path={adminRouts.viewLottery} element={<ViewLottery />} />
            <Route path={adminRouts.createRepeatedLottery} element={<CreateRepeatedLottery />} />
            <Route path={adminRouts.createOneTimeLottery} element={<CreateOneTimeLottery />} />
            <Route path={adminRouts.updateLottery} element={<UpdateLottery />} />
            <Route path={adminRouts.updateTemplate} element={<UpdateLotteryTemplate />} />
            <Route path={adminRouts.updateOneTimeTemplate} element={<UpdateOneTimeLotteryTemplate />} />
            <Route path={adminRouts.login} element={<LoginForm />} />
            <Route path={adminRouts.auctionList} element={<AuctionList />} />
            <Route path={adminRouts.auctionRequestList} element={<AuctionRequests />} />
            <Route path={adminRouts.createAuction} element={<CreateAuction />} />
            <Route path={adminRouts.updateAuction(null)} element={<AuctionDetail />} />
            <Route path={adminRouts.approveAuction(null)} element={<ApproveAuction />} />
            <Route path={adminRouts.masterValue} element={<MasterValues />} />
            <Route path={adminRouts.userSettings} element={<UserSettings />} />
            <Route path={adminRouts.usersList} element={<UsersList />} />
            <Route path={adminRouts.emailNotificationList} element={<EmailNotificationList />} />
            <Route path={adminRouts.pushNotificationList} element={<PushNotificationList />} />
            <Route path={adminRouts.createNotification} element={<CreateNotification />} />
            <Route path={adminRouts.promotions} element={<Promotions />} />
            <Route path={adminRouts.profile} element={<Profile />} />
            <Route path={adminRouts.twoFa} element={<TwoFa />} />
            <Route path={adminRouts.forgotPassword} element={<ForgotPassword />} />
            <Route path={adminRouts.emailNotificationDetail(null)} element={<EmailNotificationDetail />} />
            <Route path={"*"} element={<h3>404</h3>} />
        </Routes> : <Routes>
        <Route path={adminRouts.login} element={<LoginForm />} />
        <Route path={adminRouts.twoFa} element={<TwoFa />} />
        <Route path={adminRouts.resetPassword} element={<ResetPassword />} />
            <Route path={adminRouts.forgotPassword} element={<ForgotPassword />} />
        <Route path={"*"} element={<h3>404</h3>} />
        </Routes>
    )
}

export default AppRoute