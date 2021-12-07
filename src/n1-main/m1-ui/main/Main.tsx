import React from 'react';
import {Outlet} from "react-router-dom";
import s from './Main.module.css'
import {Loader} from "../common/Loader/Loader";
import {useAppSelector} from "../../../hook/redux";


export const Main = () => {

    const loadingStatus = useAppSelector(state => state.app.status);

    return (
        <main className={s.main}>
            <div className={s.container}>
                {loadingStatus === 'loading' && <Loader /> }
                <Outlet/>
            </div>
        </main>
    );
}
