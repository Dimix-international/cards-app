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
    __v: number,
    _id: string
    answerImg?: null | string
    answerVideo?: null | string
    questionImg?: null | string
    questionVideo?: null | string
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
    cardQuestion?: string,
    cardsPack_id: string,
    min?: number,
    max?: number,
    sortCards?: SortType,
    page?: number,
    pageCount?: number,
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
            }),
            providesTags: ['Cards']
        }),
        createNewCard: build.mutation<{ newCard: CardType }, { cardsPack_id: string, question: string, answer: string }>({
            query: (arg) => ({
                url: 'cards/card',
                method: 'POST',
                data: {card: arg},
            }),
            invalidatesTags: ['Cards']
        }),
        deleteCard: build.mutation<{ deletedCard: CardType }, { id: string }>({
            query: (arg) => ({
                url: 'cards/card',
                method: 'DELETE',
                params: {...arg}
            }),
            invalidatesTags: ['Cards']
        }),
        editCard: build.mutation<void, { _id: string, question: string, answer: string }>({
            query: (arg) => ({
                url: 'cards/card',
                method: 'PUT',
                data: {card: arg},
            }),
            invalidatesTags: ['Cards'],
        }),
        setCardGrade: build.mutation<void, {grade: number, card_id: string}>({
            query:(arg) => ({
                url: 'cards/grade',
                method: 'PUT',
                data: {...arg}
            }),
            invalidatesTags: ['Cards'],
        })
    })
});

export const {
    useGetCardsOfPackQuery,
    useCreateNewCardMutation,
    useDeleteCardMutation,
    useEditCardMutation,
    useSetCardGradeMutation,
} = cardsApi;