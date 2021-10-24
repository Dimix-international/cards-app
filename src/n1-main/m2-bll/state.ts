import {LoginInitStateType, loginReducer} from "./loginization-reducer";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {NewPassActionType, newPassReducer} from "./newPass-reducer";
import {
    RecoverPassActionType,
    recoveryPassReducer
} from "./recovery-passw-reducer";
import {registerReducer, RegistrActionType} from "./registration-reducer";
import {
    ComponentsActionType,
    componentsReducer
} from "./showComponents-reducer";
import thunk, {ThunkAction} from "redux-thunk";


export const AppRootReducer = combineReducers({
    loginization: loginReducer,
    newPassword: newPassReducer,
    recoveryPassword: recoveryPassReducer,
    registration: registerReducer,
    showComponents: componentsReducer
});

export type AppRootStateType = ReturnType<typeof AppRootReducer>;
export const store:Store<AppRootStateType, AppActionsType> = createStore(AppRootReducer, applyMiddleware(thunk));

export type AppActionsType =
    | LoginInitStateType
    | NewPassActionType
    | RecoverPassActionType
    | RegistrActionType
    | ComponentsActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


//@ts-ignore
window.store = store;