import {FC} from 'react';
import {Wrapper, ProfielWapper, DropdownContainer, DropdownOption} from './StyledAppTopBar';

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

    return (<Wrapper>
        <ProfielWapper>
            Profile
        <DropdownContainer>
            <DropdownOption onClick={clearLocalStorage} >
                Logout
            </DropdownOption>
        </DropdownContainer>
        </ProfielWapper>
    </Wrapper>)
};

export default AppTopBar