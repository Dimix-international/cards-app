import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "./auth-api";
import {SortType} from "./pack-list-api";

export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
type ResponseGetCard = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: number
    page: number
    pageCount: number
    token: number
    tokenDeathTime: number
}
export type QueryParamsGetCardsOfPackType = {
    cardAnswer?: string,
    cardQuestion?:string,
    cardsPack_id: string,
    min?: number,
    max?:number,
    sortCards?:SortType,
    page?:number,
    pageCount?:number,
}
export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:7542/2.0/'}),
    tagTypes: ['Cards'],
    endpoints: (build) => ({
        getCardsOfPack: build.query<ResponseGetCard, QueryParamsGetCardsOfPackType>({
            query: (arg) => ({
                url: 'cards/card',
                params: {
                    ...arg
                },
                method: 'GET'
            })
        })
    })
});

export const {useGetCardsOfPackQuery} = cardsApi;