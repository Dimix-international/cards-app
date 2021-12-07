import {setAppStatus} from "./app-reducer";
import {AxiosError} from "axios";

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
//import {ErrorType} from "./newPass-reducer";



/*export const registertUser = createAsyncThunk<undefined, {
    email: string, password: string
}, { rejectValue: { error: string } }>('auth/register', async (param: {
    email: string, password: string
}, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatus('loading'));


    try {
        await authApi.registration(param.email, param.password);
        dispatch(setAppStatus('succeeded'));
        return

    } catch (error) {

        const isAxiosError = (something: any): something is AxiosError => {
            return something.isAxiosError === true;
        }

        setTimeout(() => {
            dispatch(setErrorRegistration({error: null}));
        }, 4000)

        if (isAxiosError(error)) {

            if (error.response?.data) {
                dispatch(setAppStatus('failed'));
                return rejectWithValue({error: (error.response.data as ErrorResponseType).error});

            } else {
                dispatch(setAppStatus('failed'));
                return rejectWithValue({error: error.message});
            }


        } else {
            return rejectWithValue({error: ''});
        }

    }
})*/

/*const slice = createSlice({
    name: 'registration',
    initialState: {error: null} as ErrorType,
    reducers: {
        /!*setErrorRegistration(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }*!/
    },
/!*    extraReducers: builder => {
        builder.addCase(registertUser.rejected, (state, action) => {
            state.error = action.payload?.error || null
        });
    }*!/
})
//export const {setErrorRegistration} = slice.actions;
export const registrationReducer = slice.reducer;*/
