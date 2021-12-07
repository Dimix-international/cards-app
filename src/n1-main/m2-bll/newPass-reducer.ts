import {AxiosError} from "axios";
import {ErrorResponseType} from "../m3-dal/auth-api";
import {setAppStatus} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

/*export const enterNewPassword = createAsyncThunk<undefined, { password: string, token: string }, {
    rejectValue: { error: string }
}>('auth/newPassword',
    async (param: { password: string, token: string }, {
        dispatch,
        rejectWithValue
    }) => {

        dispatch(setAppStatus('loading'));

        try {

            await authApi.createNewPassword(param.password, param.token);
            dispatch(setAppStatus('succeeded'));
            return

        } catch (error) {

            const isAxiosError = (something: any): something is AxiosError => {
                return something.isAxiosError === true;
            }

            setTimeout(() => {
                dispatch(setErrorNewPassword({error: null}));
            }, 4000)

            if (isAxiosError(error)) {
                if (error.response?.data) {
                    dispatch(setAppStatus('failed'));
                    return rejectWithValue({error: (error.response.data as ErrorResponseType).error})

                } else {
                    dispatch(setAppStatus('failed'));
                    return rejectWithValue({error: error.message})
                }
            }

        }

    })
export type ErrorType = {
    error: string | null
}*/

/*
const slice = createSlice({
    name: 'newPassword',
    initialState: {error: null} as ErrorType,
    reducers: {
        setErrorNewPassword(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(enterNewPassword.rejected, (state, action) => {

            state.error = action.payload?.error || null

        })
    }
})

export const {setErrorNewPassword} = slice.actions;
export const newPassReducer = slice.reducer;*/
