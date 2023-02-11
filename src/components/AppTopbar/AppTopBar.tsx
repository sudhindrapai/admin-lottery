import {FC} from 'react';
import {Wrapper, ProfielWapper, DropdownContainer, DropdownOption, ProfileImage} from './StyledAppTopBar';
import ProfileImageSrc from '../../assets/images/profileavtar.webp';

import * as localStorageActionType from '../../LocalStorage/ActionTypes';
import {setLocalStorage} from '../../LocalStorage/SetLocalStorage';

import {adminRouts} from '../../routs';
import {useNavigate} from 'react-router-dom';


const AppTopBar:FC = () => {

    const navigate = useNavigate();

    const clearLocalStorage = () => {
        setLocalStorage(localStorageActionType.CLEAR_LOGIN_USER_DETAIL,"");
        navigate(adminRouts.login);
    };

    const redirectToProfile = () => {
        navigate(adminRouts.profile);
    }

    return (<Wrapper>
        23
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