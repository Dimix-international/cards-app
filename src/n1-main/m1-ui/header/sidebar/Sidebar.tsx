import React from "react";
import {useNavigate} from "react-router-dom";

import s from './Sidebar.module.css'
import SuperButton from "../../common/SuperButton/SuperButton";
import {useAppDispatch} from "../../../../hook/redux";
import {useLogOutUserMutation} from "../../../m3-dal/auth-api";
import {setAppIsAuth, setAppStatus} from "../../../m2-bll/app-reducer";

export const Sidebar = () => {
    const dispatch = useAppDispatch()

    const [logOutUser] = useLogOutUserMutation();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        dispatch(setAppStatus('loading'));
        try {
            await logOutUser();
            dispatch(setAppIsAuth(false))
            dispatch(setAppStatus('succeeded'));
            navigate('/login', {replace: true})
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }


    return (
        <div className={s.sidebar}>
            <ul className={s.list}>
                <li>
                    <SuperButton onClick={logOutHandler} value={'LogOut'}>LogOut</SuperButton>
                </li>
            </ul>
        </div>
    )
}