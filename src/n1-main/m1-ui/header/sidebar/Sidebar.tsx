import React from "react";
import { NavLink } from "react-router-dom";

import s from './Sidebar.module.css'

export const Sidebar = () => {
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
            </ul>
        </div>
    )
}