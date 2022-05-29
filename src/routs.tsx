import {FC} from 'react';
import {Routes, Route} from 'react-router-dom';

// import of views
import Dashboard from './containers/Dashboard/Dashboard';
import LotteryList from './containers/Lottery/LotteryList/LotteryList';
import CreateRepeatedLottery from './containers/Lottery/CreateLottery/RepeatedLottery/CreateLottery';
import CreateOneTimeLottery from './containers/Lottery/CreateLottery/OneTimeLottery/CreateOneTimeLottery';
import ViewLottery from './containers/Lottery/ViewLottery/ViewLottery';
import LoginForm from './containers/Login/Login';

export const adminRouts = {
    rootPath: "/",
    dashboard: "/admin/dashboard",
    lotteryList: "/admin/lottery/list",
    createRepeatedLottery:"/admin/lottery/create/repeated-lottery",
    createOneTimeLottery:"/admin/lottery/create/one-time-lottery",
    viewLottery:"/admin/lottery/view/:lotteryId",
    modifyLottery:"/admin/lottery/update",
    auctionList:"/admin/auction/list",
    createAuction:"/admin/auction/create",
    viewAuction:"/admin/auction/view",
    modifyAuction:"/admin/auction/update",
    usersList:"/admin/users",
    viewUser:"/admin/users/view",
    settings:"/admin/settings",
    login:"/admin/login"
}

const AppRoute:FC = () => {
    return(
        <Routes>
            <Route path={adminRouts.rootPath} element={<Dashboard />} />
            <Route path={adminRouts.dashboard} element={<Dashboard />} />
            <Route path={adminRouts.lotteryList} element={<LotteryList />} />
            <Route path={adminRouts.viewLottery} element={<ViewLottery />} />
            <Route path={adminRouts.createRepeatedLottery} element={<CreateRepeatedLottery />} />
            <Route path={adminRouts.createOneTimeLottery} element={<CreateOneTimeLottery />} />
            <Route path={adminRouts.login} element={<LoginForm />} />
            <Route path={"*"} element={<h3>404</h3>} />
        </Routes>
    )
}

export default AppRoute