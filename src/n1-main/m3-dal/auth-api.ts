import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})
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

type ResponseRegistrationType = {
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
export const axiosBaseQuery =
    (
        {baseUrl}: { baseUrl: string } = {baseUrl: ''}
    ): BaseQueryFn<{
        url: string
        method: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
    },
        unknown,
        unknown> =>
        async ({url, method, data}) => {
            try {
                const result = await axios({url: baseUrl + url, method, data})
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
    //baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:7542/2.0/'}),
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
        forgotPassword: build.mutation<void, {email:string}>({
            query: (arg) => ({
                url: 'https://neko-back.herokuapp.com/2.0/auth/forgot',
                method: 'POST',
                data: {
                    email :arg.email,
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
        checkAuthUser: build.mutation<void, {}>({
            query: (arg)=> ({
                url: 'auth/me',
                method: 'POST',
                data: arg
            })
        })
    })
});
export const {
    useRegistrationAuthMutation,
    useCreateNewPasswordMutation,
    useForgotPasswordMutation,
    useCheckAuthUserMutation,
} = _authApi;

/*export const authApi = {
    registration(email: string, password: string) {
        return instance.post<{ email: string, password: string }, AxiosResponse<ResponseRegistrationType >>('auth/register', {
            email,
            password,
        })
    },
    createNewPassword(password: string, token: string) {
        return instance.post<{ password: string, token: string }, AxiosResponse>('auth/set-new-password', {
            password,
            token
        })
    },
    forgotPassword(email: string) {
        return axios.post<{ email: string }, AxiosResponse>('https://neko-back.herokuapp.com/2.0/auth/forgot', {
            email,
            from: 'test-front-admin <dima.dimix94@mail.ru>',
            message: `<div>
                            <p>Для установки нового пароля, перейдите по ссылке</p>
                            <a href="https://Dimix-international.github.io/cards-app/new-password/$token$">
                                Восстановление пароля
                              </a>
                        </div>`
        })
    }
}*/
