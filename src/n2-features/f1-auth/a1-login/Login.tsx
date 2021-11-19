import React, {FC, useEffect} from "react";
import { Formik } from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {getAuthTH, makeAuthTH} from "../../../n1-main/m2-bll/loginization-reducer";
import {loginValidation} from "./utils/validationSettings";
import {Link} from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/state";

export const Login :FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType,boolean>(state=>state.loginization.isAuth)

    useEffect(()=>{
        dispatch(getAuthTH())
    },[])
    if (isAuth) {
        return <div>You're already logged</div>
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection:'column',
            borderRadius: '5px',
            border: '1px solid',
            height: '400px',
            width: '500px',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        }}>
            <Formik validationSchema={loginValidation} initialValues={{email: '', password: '', rememberMe: false}} onSubmit={(values)=> {
                dispatch(makeAuthTH(values))
            }}>
                {(formik)=>{
                    return (<form onSubmit={formik.handleSubmit}>
                        <SuperInputText error={formik.touched.email && formik.errors.email ? 'Обязательное поле' : ''}
                            required placeholder={'Email'}
                                        {...formik.getFieldProps('email')}/>
                        <SuperInputText error={formik.touched.password && formik.errors.password ? 'Обязательное' +
                            ' поле' : ''} required placeholder={'Password'} {...formik.getFieldProps('password')} hidden/>
                        <div style={{display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'}}><SuperCheckbox children={'Remember Me'} {...formik.getFieldProps('rememberMe')}/>
                            <SuperButton value={'Submit'} type={"submit"}/></div>
                    </form>)
                }}

            </Formik>
            <Link to="/about">Forgot the password ?</Link>
        </div>
    )
}