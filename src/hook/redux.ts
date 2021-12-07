import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ApplicationDispatch, AppRootStateType} from "../n1-main/m2-bll/state";

export const useAppDispatch = () => useDispatch<ApplicationDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;