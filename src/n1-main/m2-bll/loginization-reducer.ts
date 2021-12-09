import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseRegistrationType} from "../m3-dal/auth-api";

const initialState = {
    isAuth: false,
    user: {} as ResponseRegistrationType,
};

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        makeAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUser(state, action: PayloadAction<ResponseRegistrationType>) {
            state.user = action.payload
        }
    }
})

export const {makeAuth, setUser} = slice.actions
export const loginReducer = slice.reducer


