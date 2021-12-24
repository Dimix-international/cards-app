import React from 'react';
import {PacksList} from "../packsList/PacksList";
import {useAppSelector} from "../../../../hook/redux";


export const Profile = () => {
    /*const isAuth = useAppSelector(state => state.app.isAuthUser);
    console.log(isAuth)*/
    return (
        <PacksList triggerPage={'profilePage'} />
    );
}
