import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

interface CreateLottery{
    errorMessage: string,
    isLotteryCreated: boolean
}

const createLotteryState:CreateLottery = {
    errorMessage:"",
    isLotteryCreated: false
};

export const createOneTimeLottery = createAsyncThunk(
    'oneTimeLottery',
    async () => {
        
    }
) 

const createLotterySlide = createSlice({
    name:'create lottery',
    initialState: createLotteryState,
    reducers:{

    }
});

export const {} = createLotterySlide.actions;
export default createLotterySlide.reducer