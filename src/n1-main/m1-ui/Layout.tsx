import React from 'react';
import {Main} from "./main/Main";
import {Header} from "./header/Header";
import s from './Layout..module.scss'
import {Footer} from "./footer/Footer";
import {FinallyErrorResponseType} from "../m3-dal/auth-api";
import {Outlet} from 'react-router-dom';

type LayoutType = {
    error: FinallyErrorResponseType
}
export const Layout: React.FC<LayoutType> = ({error}) => {

    return (
        <>
            {
                error.data === undefined
                    ? <div className={'errorNetwork'}>Сервер временно недоступен =(</div>
                    : error?.data?.error
                        ? <div className={s.containerLogin}>
                             <Outlet/>
                             <div className={'error'}>{error.data.error}</div>
                        </div>
                        : <div className={s.container}>
                                <Header/>
                                <Main/>
                                <Footer/>
                            </div>
            }
        </>
    );
}