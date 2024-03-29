import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';
import {toggleLoader} from './loader'
import {handle401Status} from '../Utility/Utility';

const promotionInitialState = {
    isLoading:false,
    home:[],
    lottery:[],
    auction:[],
    desktopImagUrl:"",
    desktopFileName:"",
    mobileImgUrl:"",
    mobileFileName:"",
    homeBannerRedirectionUrl:"https://www.google.com"
}

interface ImageObj {
    documentName: string
    fileDownloadUri: string
    fileId: string
    fileName: string
    fileSize: number
    fileType: string
    }

interface SetImgDetails {
    fileName:string,
    imgUrl:string
}

export const getPromotionList = createAsyncThunk(
    'get promotion list',
    async(payload:string,{dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(`${endpoints.getPromotionList}?promotionPage=${payload}`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {

            if (response.statusCode === 401) {
                handle401Status();
            }

           if (response.statusCode === 200) {
               dispatch(setDesktopBanners({
                   response:response.result,
                   responseType:payload
               }))
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.success,
                message: response.errorMsg
            }));
           } else {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: response.errorMsg
            }));
           }
        })
        .catch(() => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "Something went wrong"
            }));
        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
        });
    }
);

export const uploadPromotionImages = createAsyncThunk(
    'upload image',
    async (payload:any, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(endpoints.uploadImage,{
            method: "POST",
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
            },
            body:payload.formObj
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let image:ImageObj = response
                    let imageUrl = image.fileDownloadUri;
                    let fileName = image.fileName;
                    // console.log(payload.id,"payloadId")
                    if (payload.isForDesktop){
                        dispatch(setDesktopImgDetails(
                            {
                                fileName:fileName,
                                imgUrl:imageUrl
                            }
                        ))
                    } else {
                        dispatch(setMobileImgDetails(
                            {
                                fileName:fileName,
                                imgUrl:imageUrl
                            }
                        ))
                    }
        })
        .catch(() => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "something went wrong!"
            }));
        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
        })
    }
);

export const updatePromotion = createAsyncThunk(
    'update promotion section',
    async (payload:any, {dispatch}) => {
        dispatch(toggleLoader({
            isLoading: true
        }));
        await fetch(endpoints.updatePromotionSection,{
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body:JSON.stringify(payload)
        })
        .then((response) => {
            return response.json()
        })
        .then((response) =>{
            if (response.statusCode === 401) {
                handle401Status();
            }

        })
        .finally(() => {
            dispatch(toggleLoader({
                isLoading: false
            }));
        })
    }
)

const promotionReducer = createSlice({
    name:'Promotion reducer',
    initialState:promotionInitialState,
    reducers:{
        setDesktopBanners: (state, action:PayloadAction<{
            responseType:string,
            response:any
        }>) => {
            if (action.payload.responseType === "HOME") {
                return {
                    ...state,
                    home:action.payload.response
                }
            } else if (action.payload.responseType === "LOTTERY") {
                return {
                    ...state,
                    lottery:action.payload.response
                }
            } else if (action.payload.responseType === "AUCTION"){
                return{
                    ...state,
                    auction:action.payload.response
                }
            }
        },
        setDesktopImgDetails:(state, action:PayloadAction<SetImgDetails>) => {
            return {
                ...state,
                desktopImagUrl:action.payload.imgUrl,
                desktopFileName:action.payload.fileName
            }
        },
        setMobileImgDetails:(state, action:PayloadAction<SetImgDetails>) => {
            return {
                ...state,
                mobileImgUrl: action.payload.imgUrl,
                mobileFileName:action.payload.fileName
            }
        },
        resetPromotion:(state) => {
            return{
                ...state,
            }
        }
    }
})

export const {setDesktopBanners,setDesktopImgDetails,setMobileImgDetails} = promotionReducer.actions;
export default promotionReducer.reducer;