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

export type ResponseType = {
    Avatar?:string,
    Created:string,
    deviceTokens:Array<{_id:string, device:string, token:string,tokenDeathTime:string}>,
    Email:string,
    isAdmin:boolean,
    name:string,
    publicCardPacksCount:number,
    rememberMe:boolean,
    token:string,
    tokenDeathTime:string,
    Updated:string,
    verified:boolean,
    __v:number,
    _id:string
    emailRegExp:object,
    error:string,
    in:string,
    isEmailValid:boolean,
    isPassValid:true,
    passwordRegExp:string
}