import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "./app-reducer";
import {AxiosError} from "axios";


/*export const recoverPassword = createAsyncThunk<{ email: string, error: null }, { email: string },
    { rejectValue: { error: string } }>('auth/recoveryPass',
    async (param: { email: string },  {dispatch, rejectWithValue}) => {

        dispatch(setAppStatus('loading'));

        try {
            await authApi.forgotPassword(param.email);
            dispatch(setAppStatus('succeeded'));

            return {email: param.email, error:null}

        } catch (error) {

            const isAxiosError = (something: any): something is AxiosError => {
                return something.isAxiosError === true;
            }

            setTimeout(() => {
                dispatch(setRecoverPasswordError({error: null}));
            }, 4000)

            if (isAxiosError(error)) {
                dispatch(setAppStatus('failed'));
                return rejectWithValue({error: error.message});

            } else {
                dispatch(setAppStatus('failed'));
                return rejectWithValue({error: 'Some error is occurred!'});
            }
        }
    })*/

type InitialStateType = {
    email:string,
    error:string | null
}
const slice = createSlice({
    name: 'recoveryPass',
    initialState: {email: '', error: null} as InitialStateType,
    reducers: {
/*        setRecoverPasswordError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },*/
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        }
    },
/*    extraReducers: builder => {
        builder.addCase(recoverPassword.fulfilled, (state, action) => {
            state.email = action.payload.email
            state.error = action.payload.error
        })
        builder.addCase(recoverPassword.rejected, (state, action) => {
            state.error = action.payload?.error || null
        })
    }*/
})
export const {setEmail} = slice.actions
export const recoveryPassReducer = slice.reducer;

