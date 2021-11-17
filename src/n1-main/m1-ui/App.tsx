import React from 'react';
import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "../../n2-features/f1-auth/a1-login/Login";
import {Register} from "../../n2-features/f1-auth/a2-register/Register";
import {RecoverPassword} from "../../n2-features/f1-auth/a4-recovery-pass/RecoverPasswor";
import {EnterPassword} from "../../n2-features/f1-auth/a5-enter-new-pass/EnterPassword";
import {ShowComponents} from "../../n2-features/f1-auth/a6-show-components/ShowComponents";
import {Error404} from "../../n2-features/f1-auth/a3-Error404/Error404";
import {Layout} from "./Layout";


export const App = () => {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Login/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'registration'} element={<Register/>}/>
                    <Route path={'recovery-password'}
                           element={<RecoverPassword/>}/>
                    <Route path={'new-password'}
                           element={<EnterPassword/>}/>
                    <Route path={'showing-components'}
                           element={<ShowComponents/>}/>
                    <Route path={'*'} element={<Error404/>}/>
                </Route>
            </Routes>
        </div>
    );
}

