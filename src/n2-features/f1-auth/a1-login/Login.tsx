import React, {FC} from "react";
import { Formik } from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import { makeAuthTH} from "../../../n1-main/m2-bll/loginization-reducer";
import {loginValidation} from "./utils/validationSettings";
import {Link} from "react-router-dom";

export const Login :FC = () => {
    const dispatch = useDispatch()

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