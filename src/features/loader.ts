import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

interface LoaderState {
    isLoading:boolean
}

const initialState:LoaderState = {
    isLoading: false
}

interface ToggleLoaderPayloader{
    isLoading:boolean
}

const loaderSlice = createSlice({
    name:'loader slice',
    initialState: initialState,
    reducers:{
        toggleLoader:(state,action:PayloadAction<ToggleLoaderPayloader>)=>{
            return{
                ...state,
                isLoading: action.payload.isLoading
            }
        }
    }
});

export const {toggleLoader} = loaderSlice.actions
export default loaderSlice.reducer;