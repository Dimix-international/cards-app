import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})
//{ _id: string, email: string, name: string, avatar?: string, publicCardPacksCount: number}
export const loginAPI = {
    makeLogin(loginPayload: { email: string, password: string, rememberMe: boolean }) {
        return instance.post<typeof loginPayload, AxiosResponse<{
            _id: string, email: string, name: string, avatar?: string, publicCardPacksCount: number, created: Date,
            updated: Date,
            isAdmin: boolean,
            verified: boolean, // подтвердил ли почту
            rememberMe: boolean,
            error?:string
        }>>('/auth/login', loginPayload)
    },
    getLoginInfo(){
        return instance.post<{
            _id: string, email: string, name: string, avatar?: string, publicCardPacksCount: number, created: Date,
            updated: Date,
            isAdmin: boolean,
            verified: boolean, // подтвердил ли почту
            rememberMe: boolean,
            error?:string
        }>('/auth/me')
    },
    logOut(){
        return instance.delete<{info:string,error?:string }>('/auth/me')
    }
}

export type ResponseType = {}