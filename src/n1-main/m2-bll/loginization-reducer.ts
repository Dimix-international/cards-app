import {Dispatch} from "redux";
import {loginAPI} from "../../n2-features/auth-api/local-api";

const loginInitState = {
    isAuth: false
};

export type LoginInitStateType = {
    isAuth: boolean
};
export type LoginActionType = ReturnType<typeof makeAuth>;

export const loginReducer = (state: LoginInitStateType = loginInitState, action: LoginActionType): LoginInitStateType => {
    switch (action.type) {
        case "MAKE_AUTH":
            return {...state, isAuth: action.auth}
        default:
            return state
    }
}

export const makeAuth = (auth: boolean) => {
    return {type: 'MAKE_AUTH', auth} as const
}
//(loginPayload: {login: string, password: string, rememberMe: boolean})
export const makeAuthTH = (loginPayload: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    alert('Trying to get access')
    loginAPI.makeLogin(loginPayload).then((res) => {
        if (res.data.error) {
            alert(res.data.error)
        } else {
            dispatch(makeAuth(true))
        }
        alert('Access granted')
    }).catch(() => {
        alert('Access denied')
    })

}

export const getAuthTH = () => (dispatch: Dispatch) => {
    loginAPI.getLoginInfo().then((res) => {
        if (res.data.data._id) {
            debugger
            dispatch(makeAuth(true))
        }

    }).catch((e) => {
        console.log(e)
        debugger
        dispatch(makeAuth(true))
    })

}

