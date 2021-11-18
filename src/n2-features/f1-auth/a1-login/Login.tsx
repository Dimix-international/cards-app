import React from "react";
import {useFormik} from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {AppRootStateType} from "../../../n1-main/m2-bll/state";
import {LoginInitStateType, makeAuthTH} from "../../../n1-main/m2-bll/loginization-reducer";

export const Login = () => {
    const validationSchema = yup.object().shape({
        email: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой').min(8, 'Логин должен' +
            ' состоять не менее из 8 символов'),
        password: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой').min(8, 'Пароль' +
            ' должен' +
            ' состоять не менее из 8 символов'),
    })
    const formik = useFormik({
        initialValues: {email: '', password: '', rememberMe: false},
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(makeAuthTH(values))
        }
    })
    const dispatch = useDispatch()
        const data = useSelector<AppRootStateType,LoginInitStateType>(state=>state.loginization)
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div style={{display: "flex", flexDirection: 'column'}}>
                    <SuperInputText placeholder={'Логин'}
                                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}{...formik.getFieldProps('email')}/>
                    <SuperInputText placeholder={'Пароль'} {...formik.getFieldProps('password')} hidden
                                    error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}/>
                    <SuperCheckbox {...formik.getFieldProps('rememberMe')}/>
                    <SuperButton value={'Submit'} type={"submit"}/>
                </div>
            </form>
            <div>{data._id ? JSON.stringify(data) : 'No data yet'}</div>
        </div>
    )
}