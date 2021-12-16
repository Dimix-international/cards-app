import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "./auth-api";

export const cardsApi = createApi({
    reducerPath:'cardsApi',
    baseQuery:axiosBaseQuery({baseUrl: 'http://localhost:7542/2.0/'}),
    tagTypes:['Cards'],
    endpoints:(build) =>({
        getCardsOfPack: build.query<any, {cardsPack_id:string}>({
            query:(arg) =>({
                url:'cards/card',
                params: {
                    ...arg
                },
                method: 'GET'
            })
        })
    })
});

export const {useGetCardsOfPackQuery} = cardsApi;