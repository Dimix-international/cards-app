import React, {FC, useEffect} from "react";
import {Formik} from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {checkAuthTH, makeAuthTH} from "../../../n1-main/m2-bll/loginization-reducer";
import {loginValidation} from "./utils/validationSettings";
import {NavLink} from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/state";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'

export const Login: FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.loginization.isAuth)

    useEffect(() => {
        dispatch(checkAuthTH())
    }, [])
    if (isAuth) {
        return <Navigate to={'/showing-components'} replace/>
    }
    return (
        <div className={s.container}>
            <span className={s.spanLogo}>Login</span>
            <Formik validationSchema={loginValidation} initialValues={{email: '', password: '', rememberMe: false}}
                    onSubmit={(values) => {
                        dispatch(makeAuthTH(values))
                    }}>
                {(formik) => {
                    return (<form onSubmit={formik.handleSubmit}>
                        <SuperInputText error={formik.touched.email && formik.errors.email ? 'Обязательное поле' : ''}
                                        required placeholder={'Email'}
                                        {...formik.getFieldProps('email')}/>
                        <SuperInputText error={formik.touched.password && formik.errors.password ? 'Обязательное' +
                            ' поле' : ''} required placeholder={'Password'} {...formik.getFieldProps('password')}
                                        hidden/>
                        <div className={s.actionsContainer}><SuperCheckbox
                            children={'Remember Me'} {...formik.getFieldProps('rememberMe')}/>
                            <SuperButton value={'Submit'} type={"submit"}/></div>
                    </form>)
                }}

            </Formik>
            <div className={s.links}>
                <NavLink to="/about">Forgot the password ?</NavLink>
                <NavLink to="/about">Create an account</NavLink>
            </div>
        </div>
    )
}