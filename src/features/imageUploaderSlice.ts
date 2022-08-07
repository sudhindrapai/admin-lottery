import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

import {toggleNotificationVisibility} from './networkNotification';
import {NotificationType} from '../Utility/InterFacesAndEnum';

interface UploaderState{
    images: any
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
    data: string[]
}

const imageUploaderInitialState: UploaderState = {
    images:[]
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
                
                    let imageString = image.fileDownloadUri
                    responseArray.push(imageString)
                
                dispatch(setImages({
                    data:responseArray
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
            return {
                ...state,
                images: state.images.concat(action.payload.data)
            }
        }
    }
});

export const {setImages} = ImageUploaderSlice.actions;
export default ImageUploaderSlice.reducer;