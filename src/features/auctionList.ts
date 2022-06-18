import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

interface AuctonObj{
        auctionId:number,
        auctionPrice: number,
        startDate: Date | null,
        endDate: Date | null,
        receivedAmount: number,
        userJoined: number,
        auctionType: string
}

interface AuctionRequestObj {
    auctionId: number,
    auctionPrice: number,
    requestedDate: Date | null,
    category: string,
    name: string,
    email: string
}


interface AuctoinInitiaStateProps {
    auctions:[] | AuctonObj[],
    newAuctions:[] | AuctionRequestObj[],
    isAuctionApproved: boolean,
    isNewAuctionCreated: boolean,
    page: number
}

const auctionInitialState: AuctoinInitiaStateProps = {
    auctions:[],
    newAuctions:[],
    isAuctionApproved:false,
    isNewAuctionCreated: false,
    page:1
}

interface SetAuctonsProps {
    result: AuctonObj[] | []
}

interface SetAuctionRequest {
    result: AuctionRequestObj[] | []
}

let auctionListData = [
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "C"
    },
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "W"
    },
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "U"
    },
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "U"
    },
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "U"
    },
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "U"
    },
    {
        auctionId:1,
        auctionPrice:1000,
        startDate:new Date(),
        endDate: new Date(),
        receivedAmount: 10000,
        userJoined:10,
        auctionType: "D"
    }
]

let auctionRequestData = [
    {
    auctionId: 1,
    auctionPrice: 1000,
    requestedDate: new Date(),
    category: "CAR",
    name: "Sudhindra",
    email: "name@domain.com"
    },
    {
        auctionId: 1,
        auctionPrice: 1000,
        requestedDate: new Date(),
        category: "CAR",
        name: "Sudhindra",
        email: "name@domain.com"
        },
        {
            auctionId: 1,
            auctionPrice: 1000,
            requestedDate: new Date(),
            category: "CAR",
            name: "Sudhindra",
            email: "name@domain.com"
            }
]

export const getAuctions = createAsyncThunk(
    'get all auctions',
    async (queryParams:string, {dispatch}) => {
        await fetch (`${endpoints.getLotteryList}?lotteryType=${queryParams}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.statusCode === 200) {
                dispatch(setAuctionList({
                    result: auctionListData
                }))
            } else if (response.statusCode === 504) {
                dispatch(setAuctionList({
                    result: []
                }))
            }
        })
    }
);


export const getNewAuctions = createAsyncThunk(
    'get new auctions list',
    async (queryParams: string, {dispatch}) => {
        await fetch(`${endpoints.getLotteryList}?lotteryType=${queryParams}`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.statusCode === 200) {
                dispatch(setAuctionRequestList({
                    result: auctionRequestData
                }))
            }
        })
    }
    )

const auctionSlice = createSlice({
    name: 'Auction Slice',
    initialState: auctionInitialState,
    reducers:{
        setAuctionList: (state, action:PayloadAction<SetAuctonsProps>) => {
            return {
                ...state,
                auctions:action.payload.result
            }
        },
        setAuctionRequestList: (state, action:PayloadAction<SetAuctionRequest>) => {
            return{
                ...state,
                newAuctions: action.payload.result
            }
        }
    }
});

export const {setAuctionList, setAuctionRequestList} = auctionSlice.actions
export default auctionSlice.reducer;