import {loginReducer} from "./loginization-reducer";
import {combineReducers} from "redux";
import {recoveryPassReducer} from "./recovery-passw-reducer";

import {ThunkDispatch} from "redux-thunk";
import {AnyAction, configureStore} from "@reduxjs/toolkit";

import {_authApi} from "../m3-dal/auth-api";
import {packListApi} from "../m3-dal/pack-list-api";
import {cardsApi} from "../m3-dal/cards-api";
import {packListReducer} from "./a1-pakcList/packListReducer";
import {appReducer} from "./app-reducer";
import {learnPackReducer} from "./a2-learnPack/learnPackReducer";
import {fileApi} from "../m3-dal/file-api";


export const AppRootReducer = combineReducers({
    loginization: loginReducer,
    recoveryPassword: recoveryPassReducer,
    app: appReducer,
    packList: packListReducer,
    learningPack: learnPackReducer,
    [_authApi.reducerPath] : _authApi.reducer,
    [packListApi.reducerPath] : packListApi.reducer,
    [cardsApi.reducerPath] : cardsApi.reducer,
    [fileApi.reducerPath] : fileApi.reducer,
});

export type AppRootStateType = ReturnType<typeof AppRootReducer>;

export const store = configureStore({
    reducer: AppRootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        _authApi.middleware,
        packListApi.middleware,
        cardsApi.middleware,
        fileApi.middleware
    )
})

export type ApplicationDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>

//@ts-ignore
window.store = store;