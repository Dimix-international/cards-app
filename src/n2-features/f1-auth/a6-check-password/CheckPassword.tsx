import React from "react";
import s from "../a2-register/Register.module.scss";
import c from "./CheckPassword.module.scss";
import letter from '../../../assets/letter.png';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/state";

export const CheckPassword = () => {

    const email = useSelector<AppRootStateType, string>(state => state.recoveryPassword.email)

    return (
        <div className={s.registration}>
            <div className={c.image}>
                <img src={letter} alt=""/>
            </div>
            <h1 className={`${s.title} ${c.title}`}>
                Check Email
            </h1>
            <p className={c.text}>
                We've sent an Email with instructions to {email}
            </p>
        </div>
    )
}