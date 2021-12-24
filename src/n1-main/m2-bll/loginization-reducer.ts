import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseRegistrationType} from "../m3-dal/auth-api";

const initialState = {
    user: {} as ResponseRegistrationType,
};

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<ResponseRegistrationType>) {
            state.user = action.payload
        }
    }
})

export const {setUser} = slice.actions
export const loginReducer = slice.reducer


