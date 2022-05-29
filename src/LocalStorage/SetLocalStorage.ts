import * as localStorageActionTypes from './ActionTypes';

interface LoginResponse {
    accessToken: string,
    refreshToken: string
}

const setAccessToken = (obj: LoginResponse) => {
    if (typeof Storage !== "undefined"){
        localStorage.setItem("ACCESS_TOKEN",obj.accessToken);
        localStorage.setItem("REFRESH_TOKEN", obj.refreshToken);
    }
};

const setPublicUserId = (id: string) => {
    if (typeof Storage !== undefined) {
        localStorage.setItem("PUBLIC_USER_ID",id);
    }
}

const clearLoginDetails = () => {
    if (typeof Storage !== undefined){
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("PUBLIC_USER_ID");
    }
};

const setUserDetail = (value:any) => {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("USER_DETAIL",JSON.stringify(value));
    }
}

export const setLocalStorage = (type:string, value:any) => {
    switch(type){
        case localStorageActionTypes.SET_ACCESS_REFRESH_TOKEN:
            setAccessToken(value);
            break;
        case localStorageActionTypes.SET_PUBLIC_USER_ID:
            setPublicUserId(value);
            break;
        case localStorageActionTypes.CLEAR_LOGIN_USER_DETAIL:
            clearLoginDetails();
            break;
            case localStorageActionTypes.SET_USER_DETAILS:
            setUserDetail(value);
            break
        default: 
        return null;
    }
}