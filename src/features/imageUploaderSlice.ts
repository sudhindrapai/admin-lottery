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
            // if (response.statusCode === 200) {
                let responseArray:string[] = [];
                let names: string[] = [];
                    let imageString = image.fileDownloadUri;
                    let name = image.fileName;
                    responseArray.push(imageString);
                    names.push(name);
                
                dispatch(setImages({
                    data:responseArray,
                    names:names
                }))
            // }
        })
        .catch(() => {
            dispatch(toggleNotificationVisibility({
                isVisible: true,
                status: NotificationType.error,
                message: "something went wrong!"
            }));
        })
    }
)

const ImageUploaderSlice = createSlice({
    name: 'Image uploader',
    initialState: imageUploaderInitialState,
    reducers:{
        setImages:(state, action:PayloadAction<SetImages>) => {
            let updatedArray = [...state.images].concat(action.payload.data)
            return {
                ...state,
                images: updatedArray,
                imageNames: action.payload.names
            }
        }
    }
});

export const {setImages} = ImageUploaderSlice.actions;
export default ImageUploaderSlice.reducer;