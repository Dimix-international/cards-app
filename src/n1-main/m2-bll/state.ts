import {loginReducer} from "./loginization-reducer";
import {combineReducers} from "redux";
import {newPassReducer} from "./newPass-reducer";
import {recoveryPassReducer} from "./recovery-passw-reducer";
import {registerReducer} from "./registration-reducer";
import {componentsReducer} from "./showComponents-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";


export const AppRootReducer = combineReducers({
    loginization: loginReducer,
    newPassword: newPassReducer,
    recoveryPassword: recoveryPassReducer,
    registration: registerReducer,
    showComponents: componentsReducer
});

export type AppRootStateType = ReturnType<typeof AppRootReducer>;
export const store = configureStore({
    reducer: AppRootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().prepend(thunk))
});


//@ts-ignore
window.store = store;