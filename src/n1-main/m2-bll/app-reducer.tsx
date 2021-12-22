import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ModalTriggerType =
    'addPack'
    | 'deletePack'
    | 'editPack'
    | 'addCard'
    | 'deleteCard'
    | 'editCard'
    | null;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ErrorType = string | null;

const initialAppState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isAuthUser: false,
    isOpenedModal: false,
    modalTrigger: null as ModalTriggerType
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
        setAppIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuthUser = action.payload
        },
        setIsOpenedModal(state, action: PayloadAction<boolean>) {
            state.isOpenedModal = action.payload
        },
        setTriggerModal(state, action: PayloadAction<ModalTriggerType>) {
            state.modalTrigger = action.payload
        },
    },
})

export const appReducer = slice.reducer;

export const {
    setAppStatus,
    setAppError,
    setIsOpenedModal,
    setAppIsAuth,
    setTriggerModal,
} = slice.actions;
