import React from "react";
import {Redirect, Route, Switch } from "react-router-dom";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {Register} from "../../../n2-features/f1-auth/a2-register/Register";
import {RecoverPassword} from "../../../n2-features/f1-auth/a4-recovery-pass/RecoverPasswor";
import {EnterPassword} from "../../../n2-features/f1-auth/a5-enter-new-pass/EnterPassword";
import {ShowComponents} from "../../../n2-features/f1-auth/a6-show-components/ShowComponents";
import {Error404} from "../../../n2-features/f1-auth/a3-Error404/Error404";

export enum ROUTES_PATH {
    LOGIN = '/login',
    REGISTER = '/registration',
    RECOVERY_PASS = '/recovery-password',
    ENTER_NEW_PASS = '/new-password',
    SHOW_COMPONENTS = '/showing-components',
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={ROUTES_PATH.LOGIN}/>}/>

                <Route path={ROUTES_PATH.LOGIN} render={() => <Login />}/>
                <Route path={ROUTES_PATH.REGISTER} render={() => <Register />}/>
                <Route path={ROUTES_PATH.RECOVERY_PASS} render={() => <RecoverPassword />}/>
                <Route path={ROUTES_PATH.ENTER_NEW_PASS} render={() => <EnterPassword />}/>
                <Route path={ROUTES_PATH.SHOW_COMPONENTS} render={() => <ShowComponents />}/>

                <Route path={'*'} render={() => <Error404 />}/>
            </Switch>
        </div>
    )
}