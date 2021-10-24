import React from "react";
import { NavLink } from "react-router-dom";
import {ROUTES_PATH} from "../../routes/Routes";

import s from './Sidebar.module.css'

export const Sidebar = () => {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to={ROUTES_PATH.LOGIN}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES_PATH.REGISTER}>
                        Registration
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES_PATH.RECOVERY_PASS}>
                        Recovery password
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES_PATH.ENTER_NEW_PASS}>
                        New password
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES_PATH.SHOW_COMPONENTS}>
                        Show components
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}