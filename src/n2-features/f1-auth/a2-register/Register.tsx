import React from "react";
import {Form, Formik, FormikHelpers} from 'formik'
import * as yup from 'yup'
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {InputFormik} from "../../../n1-main/m1-ui/common/InputFormik/InputFormik";
import s from './Register.module.scss'
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hook/redux";
import {
    FinallyErrorResponseType,
    useRegistrationAuthMutation
} from "../../../n1-main/m3-dal/auth-api";
import {setAppStatus} from "../../../n1-main/m2-bll/app-reducer";
import {AxiosError} from "axios";


type InitialValuesType = {
    email: string,
    password: string,
    confirmPassword: string
}


export const Register = () => {

    const initialValues: InitialValuesType = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const dispatch = useAppDispatch();
    //  const error = useAppSelector(state => state.registration.error);
    const navigate = useNavigate();

    const [registrationUser, {error}] = useRegistrationAuthMutation()
    console.log(error)
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid format email').required('Required'),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number').required('Required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords is not match').required('Required')
    })

    const onSubmit = async (values: InitialValuesType, formikHelpers: FormikHelpers<InitialValuesType>) => {

        dispatch(setAppStatus('loading'));
        try {
            await registrationUser({
                email: values.email,
                password: values.password
            }).unwrap()
            dispatch(setAppStatus('succeeded'));
            navigate('/login', {replace: true});
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }

    const returnBack = () => navigate(-1);


    return (
        <div className={s.registration}>
            <h1 className={s.title}>Sign up</h1>
            <div className={s.body}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnMount
                >
                    {
                        (formik) => (
                            <Form className={s.form}>
                                <InputFormik
                                    id={'email'}
                                    type={'email'}
                                    name={'email'}
                                    label={'Email'}
                                />
                                <InputFormik
                                    id={'password'}
                                    type={'password'}
                                    name={'password'}
                                    label={'Password'}
                                />
                                <InputFormik
                                    id={'confirmPassword'}
                                    type={'password'}
                                    name={'confirmPassword'}
                                    label={'Confirm password'}
                                />
                                {
                                    error && <div className={'error'}>
                                        {
                                            (error as FinallyErrorResponseType).data.error || 'Ошибка соединения'
                                        }
                                    </div>
                                }
                                <div className={s.btns}>
                                    <SuperButton
                                        onClick={returnBack}
                                        className={s.btn__cancel}
                                        type={'button'}
                                    >
                                        Отмена
                                    </SuperButton>
                                    <SuperButton
                                        className={s.btn__send}
                                        disabled={!formik.isValid || formik.isSubmitting}
                                        type={'submit'}
                                    >
                                        Отправить
                                    </SuperButton>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}