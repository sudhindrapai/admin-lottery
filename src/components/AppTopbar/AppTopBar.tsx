import {FC} from 'react';
import {Wrapper, ProfielWapper, DropdownContainer, DropdownOption,
     ProfileImage, ActiveUsers, RefreshIcon, RefreshSection} from './StyledAppTopBar';
import ProfileImageSrc from '../../assets/images/profileavtar.webp';

import * as localStorageActionType from '../../LocalStorage/ActionTypes';
import {setLocalStorage} from '../../LocalStorage/SetLocalStorage';

import {adminRouts} from '../../routs';
import {useNavigate} from 'react-router-dom';

import {RootState} from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';
import {getActiveUserCount} from '../../features/loginSlice';


const AppTopBar:FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeUserCount = useSelector((state:RootState) => state.login.activeUserCount);

    const clearLocalStorage = () => {
        setLocalStorage(localStorageActionType.CLEAR_LOGIN_USER_DETAIL,"");
        navigate(adminRouts.login);
    };

    const redirectToProfile = () => {
        navigate(adminRouts.profile);
    }

    const updatedActiveUserCount = () => {
        dispatch(getActiveUserCount());
    }

    return (<Wrapper>
        <ActiveUsers>
            Active Users: <span>{activeUserCount}</span> 
            <RefreshSection onClick={updatedActiveUserCount}>
                <RefreshIcon />
            </RefreshSection>
        </ActiveUsers>
        <ProfielWapper>
            <ProfileImage src={ProfileImageSrc} />
        <DropdownContainer>
            <DropdownOption onClick={clearLocalStorage} >
                Logout
            </DropdownOption>
            <DropdownOption onClick={redirectToProfile} >
                Profile
            </DropdownOption>
        </DropdownContainer>
        </ProfielWapper>
    </Wrapper>)
};

export default AppTopBar