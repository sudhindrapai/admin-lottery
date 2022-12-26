import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

import {handle401Status} from '../Utility/Utility';

interface UploaderState{
    images: string[] | [],
    imageNames: string[] | []
}

interface ImageObj {
documentName: string
fileDownloadUri: string
fileId: string
fileName: string
fileSize: number
fileType: string
}

interface SetImages {
    data: string[] | [],
    names: string[] | []
}

const imageUploaderInitialState: UploaderState = {
    images:[],
    imageNames:[]
}

export const uploadImage = createAsyncThunk(
    'upload image',
    async (payload:any, {dispatch}) => {
        await fetch(endpoints.uploadImage,{
            method: "POST",
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
            },
            body:payload
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let image:ImageObj = response
                let responseArray:string[] = [];
                let names: string[] = [];
                    let imageString = image.fileDownloadUri;
                    let name = image.fileName;
                    responseArray.push(imageString);
                    names.push(name);
                
                dispatch(setImages({
                    data:responseArray,
                    names:names
                }));
        })
        .catch((error) => {
            console.log(error)
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "something went wrong!!!!"
            }));
        })
    }
)

const ImageUploaderSlice = createSlice({
    name: 'Image uploader',
    initialState: imageUploaderInitialState,
    reducers:{
        setImages:(state, action:PayloadAction<SetImages>) => {
            let updatedArray:any = [];
            if (state.images !== null && state.images.length > 0) {
                updatedArray = [...state.images].concat(action.payload.data);
            } 

            if (state.images === null || state.images.length === 0) {
                updatedArray = action.payload.data
            }

            return {
                ...state,
                images: updatedArray,
                imageNames: action.payload.names
            }
        },
        setUpdateImgDetails:(state,action:PayloadAction<any>)=>{
            return{
                ...state,
                images:action.payload.images
            }
        },
        deleteImage:(state,action:PayloadAction<{imgUrl:string}>) => {
            let filteredImages:any = [];
            if (state.images !== null && state.images.length > 0) {
                filteredImages = (state.images).filter((img) => {
                    return img !== action.payload.imgUrl
                })
            }
            return{
                ...state,
                images:filteredImages
            }
        }
    }
});

export const {setImages,setUpdateImgDetails,deleteImage} = ImageUploaderSlice.actions;
export default ImageUploaderSlice.reducer;