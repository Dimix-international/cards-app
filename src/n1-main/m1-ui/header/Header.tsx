import React from 'react';
import {Sidebar} from "./sidebar/Sidebar";
import s from './Header.module.scss'
import {Tabs} from "./tabs/Tabs";


export const Header = React.memo( () => {

    return (
        <div className={s.header}>
            <div className={s.container}>
                <Sidebar/>
                <Tabs />
            </div>
        </div>
    );
})