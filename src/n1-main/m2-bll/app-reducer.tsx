import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ErrorType = string | null;

const initialAppState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false
}

export type InitialAppStateType = typeof initialAppState;

const slice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setAppError(state, action: PayloadAction<ErrorType>) {
            state.error = action.payload
        },
        setAppIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        }
    }
})

export const appReducer = slice.reducer;

export const {setAppStatus, setAppError, setAppIsInitialized} = slice.actions;
