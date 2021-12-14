import React from 'react';

import s from './Tabs.module.scss'
import {TabComponent} from "./tab/TabComponent";


export const Tabs = () => {

    return (
        <div className={s.container}>
            <TabComponent to={'/packs-list'} name={'Packs list'}/>
            <TabComponent to={'/profile'} name={'Profile'}/>
        </div>
    );
}