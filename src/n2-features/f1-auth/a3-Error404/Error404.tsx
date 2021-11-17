import React from "react";
import {Link } from "react-router-dom";
import s from './Error404.module.css'

export const Error404 = () => {
    return (
        <div className={s.body}>
            <div className={s.errorPage}>
                <div className={s.content}>
                    <h1 data-text={"404"}>404</h1>
                    <h4 data-text={"Oops! Page not found!"}>Oops! Page not found!</h4>
                    <p>Sorry, the page you are looking for doesn't exist</p>
                    <div className={s.btn}>
                        <Link to={'login'}>
                            <button>return</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}