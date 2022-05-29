import * as localStorageActionTypes from "./ActionTypes";

const getAccessToken = () => {
    if (typeof Storage !== "undefined"){
        return localStorage.getItem("ACCESS_TOKEN");
    }
}

const getRefreshToken = () => {
    if (typeof Storage !== "undefined"){
        return localStorage.getItem("REFRESH_TOKEN");
    }
};

const getPublicUserId = () => {
    if (typeof Storage !== "undefined") {
        return localStorage.getItem("PUBLIC_USER_ID");
    }
}

const getUserDetail = () => {
    if (typeof Storage !== "undefined") {
        let userDetailObj = localStorage.getItem("USER_DETAIL");
        return JSON.parse(userDetailObj?userDetailObj:"{}");
    }
};

export const getLocalStorage = (type: string) => {
    switch(type){
        case localStorageActionTypes.GET_ACCESS_TOKEN:
            return getAccessToken();
        case localStorageActionTypes.GET_REFRESH_TOKEN:
            return getRefreshToken();
        case localStorageActionTypes.GET_PUBLIC_USER_ID:
            return getPublicUserId();
        case localStorageActionTypes.GET_USER_DETAILS:
            return getUserDetail(); 
        default: 
        return null;
    }
}