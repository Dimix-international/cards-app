import React from "react";
import * as yup from "yup";
import s from "../a2-register/Register.module.scss";
import c from "./EnterPassword.module.scss";
import {Form, Formik, FormikHelpers} from "formik";
import {InputFormik} from "../../../n1-main/m1-ui/common/InputFormik/InputFormik";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hook/redux";
import {
    FinallyErrorResponseType,
    useCreateNewPasswordMutation
} from "../../../n1-main/m3-dal/auth-api";
import {setAppStatus} from "../../../n1-main/m2-bll/app-reducer";
import {setEmail} from "../../../n1-main/m2-bll/recovery-passw-reducer";


type InitialValuesType = {
    password: string,
}

export const EnterPassword = () => {

    const initialValues: InitialValuesType = {
        password: '',
    }

    const dispatch = useAppDispatch();
    // const error = useAppSelector(state => state.newPassword.error);
    const [createNewPassword, {error}] = useCreateNewPasswordMutation();

    const {token} = useParams();
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        password: yup.string().required('Required'),
    })

    const onSubmit = async (values: InitialValuesType, formikHelpers: FormikHelpers<InitialValuesType>) => {
        /*if (token) {
            const action = await dispatch(enterNewPassword({password: values.password, token: token}));
            formikHelpers.setSubmitting(false);

            if(!enterNewPassword.rejected.match(action)) {
                navigate('/', {replace: true})
            }
        }*/
        if (token) {
            dispatch(setAppStatus('loading'));
            try {
                await createNewPassword({
                    password: values.password,
                    token,
                }).unwrap()
                dispatch(setAppStatus('succeeded'));
                navigate('/', {replace: true})
            } catch (e) {
                dispatch(setAppStatus('failed'));
            }
        }
    }

    return (
        <div className={s.registration}>
            <h1 className={s.title}>Create new password</h1>
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
                                    type={'password'}
                                    name={'password'}
                                    label={'Password'}
                                />
                                {
                                    error && <div className={'error'}>
                                        {
                                            (error as FinallyErrorResponseType).data.error || 'Ошибка соединения'
                                        }
                                    </div>
                                }
                                <div className={`${s.btns} ${c.btns}`}>
                                    <SuperButton
                                        className={`${s.btn__send} ${c.btn__send}`}
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