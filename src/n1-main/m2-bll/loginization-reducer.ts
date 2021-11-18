import {Dispatch} from "redux";

const loginInitState = {
    email:'',
    password:'',
    rememberMe: false
};

export type LoginInitStateType = typeof loginInitState;
export type LoginActionType = ReturnType<typeof makeAuth>;

export const loginReducer = (state: LoginInitStateType = loginInitState, action: LoginActionType): LoginInitStateType => {
    switch (action.type) {
        case "MAKE_AUTH":
            alert(JSON.stringify(action.payload))
            return state
        default:
            return state
    }
}

export const makeAuth = (payload: LoginInitStateType) => {
    return {type: 'MAKE_AUTH', payload} as const
}

export const makeAuthTH = (dispatch: Dispatch) => (payload: LoginInitStateType) => {
    dispatch(makeAuth(payload))
}