import React, {useEffect, useMemo, useState} from 'react';
import './App.css'
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import {Login} from "../../n2-features/f1-auth/a1-login/Login";
import {Register} from "../../n2-features/f1-auth/a2-register/Register";
import {RecoverPassword} from "../../n2-features/f1-auth/a4-recovery-pass/RecoverPasswor";
import {EnterPassword} from "../../n2-features/f1-auth/a5-enter-new-pass/EnterPassword";
import {CheckPassword} from "../../n2-features/f1-auth/a6-check-password/CheckPassword";
import {Error404} from "../../n2-features/f1-auth/a3-Error404/Error404";
import {Layout} from "./Layout";
import {PacksList} from "./main/packsList/PacksList";
import {Profile} from "./main/profile/Profile";
import {
    FinallyErrorResponseType,
    useCheckAuthUserMutation
} from "../m3-dal/auth-api";
import {Loader} from "./common/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {setAppIsAuth} from "../m2-bll/app-reducer";
import {setUser} from "../m2-bll/loginization-reducer";
import {CardsOfPack} from "./main/packsList/Pack/CardsOfPack";
import {LearnPack} from "./main/packsList/LearnPack/LearnPack";


export const App = () => {

    const [checkAuthUser, {
        error: errorAuthUser,
        isLoading,
    }] = useCheckAuthUserMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthUser().unwrap()
            .then(res => {
                dispatch(setAppIsAuth(true));
                dispatch(setUser(res))
            })
            .catch(error => {
                navigate('/login', {replace: true});
            })
    }, [checkAuthUser, dispatch])

    const finallyError = useMemo(() => {
        return errorAuthUser
    }, [errorAuthUser])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout
                    error={finallyError as FinallyErrorResponseType}/>}>
                    <Route path="/" element={<Navigate to={'packs-list'}/>}/>
                    <Route path={'packs-list'} element={<PacksList triggerPage={'packList'}/>}/>
                    <Route path={'packs-list/learnPack'} element={<LearnPack />}/>
                    <Route path={'packs-list/cards/card'} element={<CardsOfPack/>}/>
                    <Route path={'profile/cards/card'} element={<CardsOfPack/>}/>
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'registration'} element={<Register/>}/>
                    <Route path={'recovery-password'}
                           element={<RecoverPassword/>}/>
                    <Route path={'new-password/:token'}
                           element={<EnterPassword/>}/>
                    <Route path={'check-password'}
                           element={<CheckPassword/>}/>
                    <Route path={'*'} element={<Error404/>}/>
                </Route>
            </Routes>
        </div>
    );
}

