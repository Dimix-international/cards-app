import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {AllCardsType, axiosBaseQuery} from "./auth-api";

export type SortType = '0' | '1'
export type QueryParamsGetAllCardsType = {
    packName?: string | null,
    min?: number,
    max?: number,
    sortPacks?: SortType,
    page?: number,
    pageCount?: number,
    user_id?: string | null
}

export const cardsApi = createApi({
    reducerPath:'cardsApi',
    baseQuery:axiosBaseQuery({baseUrl:'http://localhost:7542/2.0/'}),
    endpoints:(build) => ({
        getAllCards: build.query<AllCardsType, QueryParamsGetAllCardsType>({
            query:(arg) => ({
                url: 'cards/pack',
                params: {...arg},
                method: 'GET',
            })
        })
    })
})

export const {useGetAllCardsQuery} = cardsApi;
