import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {BaseQueryFn, createApi} from "@reduxjs/toolkit/dist/query/react";


export type FinallyErrorResponseType = {
    status: number
    data: ErrorResponseType
}

export type ErrorResponseType = {
    email?: string
    body?: { password: string, token: string }
    error: string
    in: string
}

export type ResponseRegistrationType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: number
}
export type ResponseLoginizationType = {
    Avatar?: string,
    Created: string,
    deviceTokens: Array<{ _id: string, device: string, token: string, tokenDeathTime: string }>,
    Email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    token: string,
    tokenDeathTime: string,
    Updated: string,
    verified: boolean,
    __v: number,
    _id: string
    emailRegExp: object,
    error: string,
    in: string,
    isEmailValid: boolean,
    isPassValid: true,
    passwordRegExp: string
}


export type CardPackType = {
    cardsCount: number
    created: number
    deckCover: null | string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: Date,
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type AllCardsType = {
    cardPacks: Array<CardPackType>,
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number,
}
type QueryParamsGetAllCardsType = {
    packNme?: string,
    min?: number,
    max?: number,
    sortPacks?: '0' | '1',
    page?: number,
    pageCount?: number,
    user_id?: string
}

export const axiosBaseQuery =
    (
        {baseUrl}: { baseUrl: string, } = {baseUrl: ''}
    ): BaseQueryFn<{
        url: string
        method: AxiosRequestConfig['method'],
        data?: AxiosRequestConfig['data'],
        params?: AxiosRequestConfig['params']
    },
        unknown,
        unknown> =>
        async ({url, method, data, params}) => {
            try {
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    withCredentials: true
                })
                return {data: result.data}
            } catch (axiosError) {
                let err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data
                    },
                }
            }
        }

export const _authApi = createApi({
    reducerPath: 'authApi',
    /*baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:7542/2.0/', credentials:'include'}), //include, omit, same-origin*/
    baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:7542/2.0/'}),
    endpoints: (build) => ({
        registrationAuth: build.mutation<void, { email: string, password: string }>({
            query: (arg,) => ({
                url: 'auth/register',
                method: 'POST',
                data: arg
            }),
        }),
        createNewPassword: build.mutation<void, { password: string, token: string }>({
            query: (arg,) => ({
                url: 'auth/set-new-password',
                method: 'POST',
                data: arg
            })
        }),
        forgotPassword: build.mutation<void, { email: string }>({
            query: (arg) => ({
                url: 'https://neko-back.herokuapp.com/2.0/auth/forgot',
                method: 'POST',
                data: {
                    email: arg.email,
                    from: 'test-front-admin <dima.dimix94@mail.ru>',
                    message: `<div>
                            <p>Для установки нового пароля, перейдите по ссылке</p>
                            <a href="https://Dimix-international.github.io/cards-app/new-password/$token$">
                                Восстановление пароля
                              </a>
                        </div>`
                }
            })
        }),
        checkAuthUser: build.mutation<ResponseRegistrationType, {}>({
            query: (arg) => ({
                url: 'auth/me',
                method: 'POST',
                data: arg
            }),
        }),
        makeLoginUser: build.mutation<ResponseLoginizationType, {
            email: string, password: string, rememberMe: boolean
        }>({
            query: (arg) => ({
                url: 'auth/login',
                method: 'POST',
                data: arg
            }),
        }),
        logOutUser: build.mutation<{ info: string }, void>({
            query: () => ({
                url: 'auth/me',
                method: 'DELETE',
            })
        }),
    })
});
export const {
    useRegistrationAuthMutation,
    useCreateNewPasswordMutation,
    useForgotPasswordMutation,
    useCheckAuthUserMutation,
    useMakeLoginUserMutation,
    useLogOutUserMutation,
} = _authApi;

