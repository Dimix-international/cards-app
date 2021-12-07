import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../n1-main/m2-bll/app-reducer";
import {ErrorResponseType} from "../n1-main/m3-dal/auth-api";

export const handleServerAppError = (data: ErrorResponseType , dispatch: Dispatch) => {
    dispatch(setAppError(data.error));
    dispatch(setAppStatus('failed'));
}

export const handleServerNetworkAppError = (dispatch: Dispatch) => {
    dispatch(setAppError('Some error is occurred! Check your internet connection'));
    dispatch(setAppStatus('failed'));
}