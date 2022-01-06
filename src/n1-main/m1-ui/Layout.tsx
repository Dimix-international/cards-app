import React from 'react';
import {Main} from "./main/Main";
import {Header} from "./header/Header";
import s from './Layout..module.scss'
import {Footer} from "./footer/Footer";
import {FinallyErrorResponseType} from "../m3-dal/auth-api";
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "../../hook/redux";

type LayoutType = {
    error?: FinallyErrorResponseType
}
export const Layout: React.FC<LayoutType> = React.memo(({error}) => {

    const isAuth = useAppSelector(state => state.app.isAuthUser);

    return (
        <>
            {
                isAuth ?
                    <div className={s.container}>
                        <Header/>
                        <Main/>
                        <Footer/>
                    </div>
                    : error && error.data === undefined
                        ? <div className={'errorNetwork'}>Сервер временно недоступен =(</div>
                        : <div className={s.containerLogin}>
                         <Outlet/>
                        </div>
            }
        </>
    );
})