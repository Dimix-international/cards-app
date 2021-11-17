import React from "react";
import { NavLink } from "react-router-dom";

import s from './Sidebar.module.css'

export const Sidebar = () => {
    return (
        <div>
            <ul>
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
                <li>
                    <NavLink to={'/new-password'}>
                        New password
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/showing-components'}>
                        Show components
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}