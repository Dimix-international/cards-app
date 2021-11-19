import React, {FC} from "react";
import {useFormik} from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import { makeAuthTH} from "../../../n1-main/m2-bll/loginization-reducer";
import {loginValidation} from "./utils/validationSettings";

export const Login :FC = () => {
    const loginValues = {
        email: '', password: '', rememberMe: false
    }
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: loginValues,
        validationSchema: loginValidation,
        onSubmit: (values) => {
            dispatch(makeAuthTH(values))
        }
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                    <SuperInputText placeholder={'Логин'}
                                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}{...formik.getFieldProps('email')}/>
                    <SuperInputText placeholder={'Пароль'} {...formik.getFieldProps('password')} hidden
                                    error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}/>
                    <SuperCheckbox {...formik.getFieldProps('rememberMe')}/>
                    <SuperButton value={'Submit'} type={"submit"}/>
            </form>
        </div>
    )
}