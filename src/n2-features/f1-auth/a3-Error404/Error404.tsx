import React from "react";
import { NavLink } from "react-router-dom";
import s from './Error404.module.css'
import {ROUTES_PATH} from "../../../n1-main/m1-ui/routes/Routes";
export const Error404 = () => {
    return (
        <div className={s.body}>
            <div className={s.errorPage}>
                <div className={s.content}>
                    <h1 data-text={"404"}>404</h1>
                    <h4 data-text={"Oops! Page not found!"}>Oops! Page not found!</h4>
                    <p>Sorry, the page you are looking for doesn't exist</p>
                    <div className={s.btn}>
                        <NavLink to={ROUTES_PATH.LOGIN}>
                            <button>return</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}