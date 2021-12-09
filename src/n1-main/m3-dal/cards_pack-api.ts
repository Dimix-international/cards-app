import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AllCardsType, axiosBaseQuery} from "./auth-api";

type QueryParamsGetAllCardsType = {
    packNme?: string,
    min?: number,
    max?: number,
    sortPacks?: '0' | '1',
    page?: number,
    pageCount?: number,
    user_id?: string
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
