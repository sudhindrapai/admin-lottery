import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';

import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';


interface UploaderState{
    images: any
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
            console.log(response);
        })
    }
)

const ImageUploaderSlice = createSlice({
    name: 'Image uploader',
    initialState: imageUploaderInitialState,
    reducers:{
        setImages:(state, action:PayloadAction<any>) => {
            return {
                ...state,
                images: action.payload.data
            }
        }
    }
});

export const {setImages} = ImageUploaderSlice.actions;
export default ImageUploaderSlice.reducer;