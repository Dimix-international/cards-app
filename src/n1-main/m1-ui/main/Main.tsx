import React from 'react';
import {Outlet} from "react-router-dom";
import {Sidebar} from "./sidebar/Sidebar";
import s from './Main.module.css'


export const Main = () => {
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.row}>
                    <Sidebar/>
                    <Outlet/>
                </div>
            </div>
        </main>
    );
}
