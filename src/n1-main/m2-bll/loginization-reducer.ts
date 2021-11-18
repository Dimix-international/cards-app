import {Dispatch} from "redux";
import {loginAPI} from "../../n2-features/auth-api/local-api";

const loginInitState = {
    _id:'',
    email:'',
    avatar:'',
    publicCardPacksCount: 0
};

export type LoginInitStateType = {
    _id:string,
    email:string,
    avatar?:string,
    publicCardPacksCount: number
};
export type LoginActionType = ReturnType<typeof makeAuth>;

export const loginReducer = (state: LoginInitStateType = loginInitState, action: LoginActionType): LoginInitStateType => {
    switch (action.type) {
        case "MAKE_AUTH":
            return {...state,...action.payload}
        default:
            return state
    }
}

export const makeAuth = (payload: LoginInitStateType) => {
    return {type: 'MAKE_AUTH', payload} as const
}
//(loginPayload: {login: string, password: string, rememberMe: boolean})
export const makeAuthTH = (loginPayload: {email: string, password: string, rememberMe: boolean}) => (dispatch: Dispatch) => {
    alert('Trying to get access')
    loginAPI.makeLogin(loginPayload).then((res)=>{
    if(res.data.avatar){
        dispatch(makeAuth(res.data))
    }else {
        dispatch(makeAuth({...res.data,avatar: ''}))
    }
        alert('Access granted')
    }).catch((err)=>{
        alert(err.message)
    })

}