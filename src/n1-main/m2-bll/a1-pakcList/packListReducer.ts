import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {QueryParamsGetAllCardsType} from "../../m3-dal/pack-list-api";


const slice = createSlice({
    name: 'PackList',
    initialState: {
        packName: null,
        min: 0,
        max: 50,
        sortPacks: '0updated',
        page: 1,
        pageCount: 10,
        user_id: null
    } as QueryParamsGetAllCardsType,
    reducers: {
        setPackListParams(state, action:PayloadAction<QueryParamsGetAllCardsType>) {
            return {...action.payload}
        }
    }
})

export const packListReducer = slice.reducer;
export const {setPackListParams} = slice.actions;