import React from "react";
import { useFormik} from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import * as yup from 'yup'
import {useDispatch} from "react-redux";

export const Login = () => {
    const validationSchema = yup.object().shape({
        login: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой').min(8,'Логин должен' +
            ' состоять не менее из 8 символов'),
        password: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой').min(8,'Пароль' +
            ' должен' +
            ' состоять не менее из 8 символов'),
    })
    const formik = useFormik({
        initialValues: {login: '', password: ''},
        validationSchema:validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values) )
        }
    })
    const dispatch = useDispatch()

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                    <div style={{display: "flex", flexDirection: 'column'}}>
                        <SuperInputText placeholder={'Логин'} error={formik.touched.login && formik.errors.login ? formik.errors.login : ''}{...formik.getFieldProps('login')}/>
                        <SuperInputText placeholder={'Пароль'} {...formik.getFieldProps('password')} hidden error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}/>
                        <SuperButton value={'Submit'} type={"submit"}/>
                    </div>
            </form>
        </div>
    )
}