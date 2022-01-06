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
type UpdateGradeCardType = {
    token: string
    tokenDeathTime: number
    updatedGrade: CardType
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
export type RequestCreateCard = {
    cardsPack_id: string,
    question: string,
    answer: string,
    answerImg?: null | string
    answerVideo?: null | string
    questionImg?: null | string
    questionVideo?: null | string
}
export type RequestEditCard = {
    _id: string,
    question: string,
    answer: string,
    answerImg?: null | string
    answerVideo?: null | string
    questionImg?: null | string
    questionVideo?: null | string
}

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: axiosBaseQuery({baseUrl: 'https://neko-back.herokuapp.com/2.0/'}),
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
        createNewCard: build.mutation<{ newCard: CardType }, { card: RequestCreateCard }>({
            query: (arg) => ({
                url: 'cards/card',
                method: 'POST',
                data: {...arg},
            }),
        }),
        deleteCard: build.mutation<{ deletedCard: CardType }, { id: string }>({
            query: (arg) => ({
                url: 'cards/card',
                method: 'DELETE',
                params: {...arg}
            }),
            invalidatesTags: ['Cards']
        }),
        editCard: build.mutation<void, { card: RequestEditCard }>({
            query: (arg) => ({
                url: 'cards/card',
                method: 'PUT',
                data: {...arg},
            }),
            invalidatesTags: ['Cards'],
        }),
        setCardGrade: build.mutation<UpdateGradeCardType, {grade: number, card_id: string}>({
            query:(arg) => ({
                url: 'cards/grade',
                method: 'PUT',
                data: {...arg}
            }),
        })
    })
});

export const {
    useGetCardsOfPackQuery,
    useLazyGetCardsOfPackQuery,
    useCreateNewCardMutation,
    useDeleteCardMutation,
    useEditCardMutation,
    useSetCardGradeMutation,
} = cardsApi;