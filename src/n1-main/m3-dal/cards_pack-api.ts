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
export type ObjectPackType = {
    name: string,
    path:string,
    grade: number,
    shots:number,
    rating: number,
    deckCover: string,
    private: boolean,
    type: string
}

export const cardsApi = createApi({
    reducerPath:'cardsApi',
    baseQuery:axiosBaseQuery({baseUrl:'http://localhost:7542/2.0/'}),
    tagTypes: ['Packs'],
    endpoints:(build) => ({
        getAllPacks: build.query<AllCardsType, QueryParamsGetAllCardsType>({
            query:(arg) => ({
                url: 'cards/pack',
                params: {...arg},
                method: 'GET',
            }),
            providesTags: ['Packs'],
        }),
        createNewPack: build.mutation<ObjectPackType, {name: string}>({
            query: (arg) => ({
                url: 'cards/pack',
                method: 'POST',
                data: arg,
            }),
            invalidatesTags: ['Packs']
        }),
        deletePack: build.mutation<ObjectPackType, number>({
            query: (id) => ({
                url: `cards/pack/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Packs']
        }),
        updatePack:build.mutation<ObjectPackType, {_id: string, name:string}>({
            query: (arg) => ({
                url: `cards/pack/${arg._id}`,
                method: 'POST',
                data: arg,
            }),
            invalidatesTags: ['Packs']
        })
    })
})

export const {useGetAllPacksQuery} = cardsApi;
