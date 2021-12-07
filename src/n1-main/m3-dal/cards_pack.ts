import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "./auth-api";


export const cardsApi = createApi({
    reducerPath:'cardsApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:7542/2.0/'}),
    endpoints:(build) => ({
        getAllCards: build.query({
            query:() => ({
                url: 'cards/pack'
            })
        })
    })
})

export const {useGetAllCardsQuery} = cardsApi;