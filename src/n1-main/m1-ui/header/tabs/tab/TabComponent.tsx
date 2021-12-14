import React from 'react';
import s from './Tab.module.scss'
import {Link, useMatch} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';

type TabType = {
    name: string,
    to: string
}
export const TabComponent: React.FC<TabType> = React.memo(({name, to}) => {

    const match = useMatch({
        path: to, //главная страница
        //если главная страница - то берем полный путь т.е. состоит только из /
        end: to.length === 1
    });
    const finallyClass = match ? `${s.tab} ${s.active} ` : `${s.tab}`
    return (
        <Link to={to} className={finallyClass}>
            {
                name === 'Packs list'
                    ? <ListAltIcon/>
                    : <PersonIcon/>
            }
            <h2>{name}</h2>
        </Link>
    );
})