import axios, {AxiosResponse} from "axios";
import {LoginInitStateType} from "../../n1-main/m2-bll/loginization-reducer";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})
//{ _id: string, email: string, name: string, avatar?: string, publicCardPacksCount: number}
export const loginAPI = {
    makeLogin(loginPayload: LoginInitStateType) {
        return instance.post<LoginInitStateType,AxiosResponse<{ _id: string, email: string, name: string, avatar?: string, publicCardPacksCount: number}>>('/auth/login',loginPayload)
    }
}
