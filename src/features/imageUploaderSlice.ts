import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

interface ImageObj{
    url:string,
    id:number
}

interface UploaderState{
    images: [] | ImageObj[]
}

interface SetImagesProps {
    data: [] | ImageObj[]
}

const imageUploaderInitialState: UploaderState = {
    images:[]
}

const ImageUploaderSlice = createSlice({
    name: 'Image uploader',
    initialState: imageUploaderInitialState,
    reducers:{
        setImages:(state, action:PayloadAction<SetImagesProps>) => {
            return {
                ...state,
                images: action.payload.data
            }
        }
    }
});

export const {setImages} = ImageUploaderSlice.actions;
export default ImageUploaderSlice.reducer;