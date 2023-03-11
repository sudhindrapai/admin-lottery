import {FC} from 'react';
import {useLocation} from 'react-router-dom';
import {StyledAppWrapper, LeftMenuSection, ContentWrapper, Content} from './StyledWrapper';
import LeftMenu from '../LeftMenu/Leftmenu';
import TopBar from '../../components/AppTopbar/AppTopBar';
import {RootState} from '../../app/Store';
import {toggleLoader} from '../../features/loader'
import {useSelector, useDispatch} from 'react-redux'
import {adminRouts} from '../../routs';
import Loader from '../../components/Loader/Loader'
import NetworkErrorNotifier from '../NetworkNotification/NetworkNotification'

let excludeLeftMenusPath = [adminRouts.login, adminRouts];

interface AppWrapper {
    children: any
}

const Wrapper:FC<AppWrapper> = ({children}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const isLoading = useSelector((state:RootState) => state.loaderslice.isLoading)

    let pathName = location.pathname;
    return <StyledAppWrapper>
        <Loader isLoading={isLoading} />
        <NetworkErrorNotifier />
            {pathName !== "/admin/login" && pathName !== "/admin/twoFa" && pathName !== "/admin/forgot-password" && pathName !== "/admin/reset-password" &&<LeftMenuSection>
                <LeftMenu />
            </LeftMenuSection>}
            <ContentWrapper>
               { pathName !== "/admin/login" && pathName !== "/admin/twoFa" && pathName !== "/admin/forgot-password" && pathName !== "/admin/reset-password" && <TopBar />}
                <Content>
                    {children}
                </Content>
            </ContentWrapper>
    </StyledAppWrapper>
};

export default Wrapper