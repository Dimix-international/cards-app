import {loginReducer} from "./loginization-reducer";
import {combineReducers} from "redux";
import {recoveryPassReducer} from "./recovery-passw-reducer";

import {ThunkDispatch} from "redux-thunk";
import {AnyAction, configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";
import {_authApi} from "../m3-dal/auth-api";
import {cardsApi} from "../m3-dal/cards_pack-api";
import {setupListeners} from "@reduxjs/toolkit/query";


export const AppRootReducer = combineReducers({
    loginization: loginReducer,
    recoveryPassword: recoveryPassReducer,
    app: appReducer,
    [_authApi.reducerPath] : _authApi.reducer,
    [cardsApi.reducerPath] : cardsApi.reducer,
});

export type AppRootStateType = ReturnType<typeof AppRootReducer>;

export const store = configureStore({
    reducer: AppRootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        _authApi.middleware,
        cardsApi.middleware
    )
})

export type ApplicationDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>

//@ts-ignore
window.store = store;