import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as endpoints from '../networkUtility/endpoints';
import * as localStorageActiontype from '../LocalStorage/ActionTypes';
import {getLocalStorage} from '../LocalStorage/GetLocalStorage';

interface AuctonObj{
    auctionId: number,
      auctionTitle: string,
      auctionDesc: string,
      auctionType: string,
      productType: string,
      productCategory: string,
      auctionPrice: number,
      auctionStartDate: string,
      auctionEndDate: string,
      isActive: boolean,
      isMemberAuction: boolean,
      userName: string,
      noOfUsersJoined: number,
      amountCollected: number,
      auctionStatus: string
}

interface AuctionRequestObj {
    auctionId: number,
      auctionTitle: string,
      auctionDesc: string,
      auctionType: string,
      productType: string,
      productCategory: string,
      auctionPrice: number | null,
      auctionProposedPrice: number,
      auctionImages: null | string[],
      auctionStartDate: string,
      auctionEndDate: string,
      isActive: boolean,
      isMemberAuction: boolean,
      bronzeTicketPrice: null | number,
      silverTicketPrice: null | number,
      goldTicketPrice: null | number,
      platinumTicketPrice: null | number,
      bronzeSubTickets: null |number,
      silverSubTickets: null| number,
      goldSubTickets: null | number,
      platinumSubTickets: null | number,
      userName: string,
      userMobile: string,
      userEmailId: string,
      address: string,
      city: string,
      state: string,
      country: string,
      pincode: string,
      auctionStatus: string,
      winnerTicketNo: null | number,
      winnerUserId: null | number
}

interface ToggleAuctionCreation {
    isAuctionCreated: boolean
}

interface AuctoinInitiaStateProps {
    auctions:[] | AuctonObj[],
    newAuctions:[] | AuctionRequestObj[],
    isAuctionApproved: boolean,
    isNewAuctionCreated: boolean,
    auctionDetail:any 
    page: number,
    isAuctionCreated: boolean
}

const auctionInitialState: AuctoinInitiaStateProps = {
    auctions:[],
    newAuctions:[],
    auctionDetail:{},
    isAuctionApproved:false,
    isNewAuctionCreated: false,
    page:1,
    isAuctionCreated: false
}


interface setAuctionDetail {
    data: any
}

interface SetAuctonsProps {
    result: AuctonObj[] | []
}

interface SetAuctionRequest {
    result: AuctionRequestObj[] | []
}

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
        await fetch (`${endpoints.getApprovedAuctionList}?${queryParams}`,{
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
                    result: response.result
                }))
            } else if (response.statusCode === 504) {
                dispatch(setAuctionList({
                    result: []
                }))
            }
        })
    }
);


export const getAuctionRequest = createAsyncThunk(
    'get auction request list',
    async (payload: string, {dispatch}) => {
        await fetch(`${endpoints.getAuctionRequestList}?${payload}`, {
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
                dispatch(setAuctionRequestList({
                    result: response.result
                }))
            }
        })
    }
);

export const createAuction = createAsyncThunk(
    'Create auction',
    async(payload:any, {dispatch}) => {
        payload["publicUserId"] = getLocalStorage(localStorageActiontype.GET_PUBLIC_USER_ID);
        await fetch(endpoints.areateAuction, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${getLocalStorage(localStorageActiontype.GET_ACCESS_TOKEN)}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(payload)
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.statusCode === 200) {
                dispatch(toggleAuctionCreation({
                    isAuctionCreated: true
                }));
            }
        })
    }
);

export const getAuctionDetailById = createAsyncThunk(
    'get auction detail by auction id',
    async(payload:string,{dispatch}) => {
        await fetch(`${endpoints.getAuctionById}${payload}`,{
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
            console.log(response);
            if (response.statusCode === 200) {
                dispatch(setAuctionDetail({
                    data: response.result
                }))
            }
        })
    }
);

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
        },
        setAuctionDetail: (state, action:PayloadAction<setAuctionDetail>) => {
            return{
                ...state,
                auctionDetail: action.payload.data
            }
        },
        toggleAuctionCreation: (state, action:PayloadAction<ToggleAuctionCreation>) => {
            return{
                ...state,
                isAuctionCreated: action.payload.isAuctionCreated
            }
        }
    }
});

export const {setAuctionList, setAuctionRequestList, toggleAuctionCreation, setAuctionDetail} = auctionSlice.actions
export default auctionSlice.reducer;