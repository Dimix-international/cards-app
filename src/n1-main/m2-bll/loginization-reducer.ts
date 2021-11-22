import {Dispatch} from "redux";
import {loginAPI} from "../../n2-features/auth-api/local-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false
};

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        makeAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    }
})

export const {makeAuth} = slice.actions
export const loginReducer = slice.reducer


export const makeAuthTH = (loginPayload: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    loginAPI.makeLogin(loginPayload).then((res) => {
        if (res.data.error) {
            console.log(res.data.error)
        } else {
            dispatch(makeAuth(true))
        }
    }).catch((e) => {
        console.log(e)
    })

}

export const checkAuthTH = () => (dispatch: Dispatch) => {
    loginAPI.getLoginInfo().then((res) => {
        if (res.data._id) {
            dispatch(makeAuth(true))
        }

    }).catch((e) => {
        console.log(e)
    })

}

export const logOutAuthTH = () => (dispatch: Dispatch) => {
    loginAPI.logOut().then((res) => {
        if (res.data.info) {
            console.log(res.data.info)
            dispatch(makeAuth(false))
        }
    }).catch((e) => {
        console.log(e)
    })

}

