import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {AllCardsType, axiosBaseQuery} from "./auth-api";

export type SortType = '0updated' | '1updated'
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
    path: string,
    grade: number,
    shots: number,
    rating: number,
    deckCover: string,
    private: boolean,
    type: string
}
export type CreatePackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
    token: string
    tokenDeathTime: number
}


export const packListApi = createApi({
    reducerPath: 'packListApi',
    baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:7542/2.0/'}),
    tagTypes: ['Packs'],
    endpoints: (build) => ({
        getAllPacks: build.query<AllCardsType, QueryParamsGetAllCardsType>({
            query: (arg) => ({
                url: 'cards/pack',
                params: {...arg},
                method: 'GET',
            }),
            providesTags: ['Packs'],
        }),
        createNewPack: build.mutation<CreatePackType, { name: string }>({
            query: (arg) => ({
                url: 'cards/pack',
                method: 'POST',
                data: {cardsPack: arg},
            }),
            transformResponse: (result: { newCardsPack: CreatePackType }) => ({
                ...result.newCardsPack
            }),
            invalidatesTags: ['Packs']
        }),
        deletePack: build.mutation<ObjectPackType, { id: string }>({
            query: (arg) => ({
                url: `cards/pack`,
                method: 'DELETE',
                params: arg
            }),
            invalidatesTags: ['Packs']
        }),
        updatePack: build.mutation<ObjectPackType, { _id: string, name: string }>({
            query: ({_id, ...rest}) => ({
                url: `cards/pack/${_id}`,
                method: 'POST',
                data: {_id, rest},
            }),
            invalidatesTags: (result, args: any) => [
                {type: 'Packs', id: args._id}
            ]
        })
    })
})

export const {
    useGetAllPacksQuery,
    useCreateNewPackMutation,
    useDeletePackMutation,
} = packListApi;
