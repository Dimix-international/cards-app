import React from 'react';
import {HashRouter} from "react-router-dom";
import {Sidebar} from "./sidebar/Sidebar";
import {Routes} from "../routes/Routes";
import s from './Main.module.css'


export const Main = () => {
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.row}>
                    <HashRouter>
                        <Sidebar/>
                        <Routes/>
                    </HashRouter>
                </div>
            </div>
        </main>
    );
}
