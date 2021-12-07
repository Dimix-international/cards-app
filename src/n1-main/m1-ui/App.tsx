import React, {useEffect, useState} from 'react';
import './App.css'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
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


export const App = () => {

    const [isInitialized, setIsInitialized] = useState(false);

    const [checkAuthUser, {error: errorAuthUser}] = useCheckAuthUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthUser({}).unwrap()
            .then(res => {
                setIsInitialized(true)
            })
            .catch(error => {
                setIsInitialized(true)
                navigate('/login', {replace: true})
            })
    }, [])

    if (!isInitialized) {
        return <Loader/>
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout
                    error={errorAuthUser as FinallyErrorResponseType}/>}>
                    <Route index element={<PacksList/>}/>
                    <Route path={'packs-list'} element={<Navigate to="/"/>}/>
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

