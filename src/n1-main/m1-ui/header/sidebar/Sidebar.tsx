import React from "react";
import { NavLink } from "react-router-dom";

import s from './Sidebar.module.css'
import SuperButton from "../../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {logOutAuthTH} from "../../../m2-bll/loginization-reducer";
import {AppRootStateType} from "../../../m2-bll/state";

export const Sidebar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType,boolean>(state=>state.loginization.isAuth)
    return (
        <div className={s.sidebar}>
            <ul className={s.list}>
                <li>
                    <NavLink to={'/login'}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/registration'}>
                        Registration
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/recovery-password'}>
                        Recovery password
                    </NavLink>
                </li>
                {isAuth && (<li>
                    <SuperButton onClick={() => {
                        dispatch(logOutAuthTH())
                    }} value={'LogOut'}/>
                </li>)}
            </ul>
        </div>
    )
}