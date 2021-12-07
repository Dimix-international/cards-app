import React from "react";
import * as yup from "yup";
import s from "../a2-register/Register.module.scss";
import {Form, Formik, FormikHelpers} from "formik";
import {InputFormik} from "../../../n1-main/m1-ui/common/InputFormik/InputFormik";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import c from './RecoverPasswor.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {setEmail} from "../../../n1-main/m2-bll/recovery-passw-reducer";
import {useAppDispatch, useAppSelector} from "../../../hook/redux";
import {
    FinallyErrorResponseType, useForgotPasswordMutation
} from "../../../n1-main/m3-dal/auth-api";
import {setAppStatus} from "../../../n1-main/m2-bll/app-reducer";


type InitialValuesType = {
    email: string,
}
export type OnSubmitType = {
    setSubmitting: (value: boolean) => void
}

export const RecoverPassword = () => {

    const dispatch = useAppDispatch();
   // const error = useAppSelector(state => state.recoveryPassword.error);
    const navigate = useNavigate();

    const [forgotPassword, {error}] = useForgotPasswordMutation();


    const initialValues: InitialValuesType = {
        email: '',
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid format email').required('Required'),
    })

    const onSubmit = async (values: InitialValuesType, formikHelpers:FormikHelpers<InitialValuesType>) => {

        dispatch(setAppStatus('loading'));
        try {
            await forgotPassword({email:values.email}).unwrap()
            dispatch(setEmail(values.email));
            dispatch(setAppStatus('succeeded'));
            navigate('/check-password', {replace: true});
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
        formikHelpers.setSubmitting(false);

    }

    return (
        <div className={s.registration}>
            <h1 className={s.title}>Forgot your password</h1>
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
                                <p className={c.text}>
                                    Enter your email address adn we will send
                                    you
                                    further instructions
                                </p>
                               {/* {
                                    error && <div className={'error'}>
                                        {error }
                                    </div>
                                }*/}
                                {
                                    error && <div className={'error'}>
                                        {
                                            (error as FinallyErrorResponseType).data.error || 'Ошибка соединения'
                                        }
                                    </div>
                                }
                                <SuperButton
                                    className={c.btn}
                                    disabled={!formik.isValid || formik.isSubmitting}
                                    type={'submit'}
                                >
                                    Send instructions
                                </SuperButton>
                                <p className={c.text__sub}>
                                    Did you remember your password?
                                </p>
                                <div className={c.link}>
                                    <Link to={'/login'}>Try loggin in</Link>
                                </div>

                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}