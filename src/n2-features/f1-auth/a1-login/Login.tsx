import React, {FC} from "react";
import {Formik, FormikHelpers} from 'formik';
import SuperInputText
    from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperCheckbox
    from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {loginValidation} from "./utils/validationSettings";
import {NavLink, useNavigate} from "react-router-dom";
import s from './Login.module.css'
import {
    FinallyErrorResponseType, useCheckAuthUserMutation,
    useMakeLoginUserMutation
} from "../../../n1-main/m3-dal/auth-api";
import {useAppDispatch} from "../../../hook/redux";
import {setAppIsAuth, setAppStatus} from "../../../n1-main/m2-bll/app-reducer";
import {setUser} from "../../../n1-main/m2-bll/loginization-reducer";

type InitialValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export const Login: FC = () => {

    const [makeLogin, {error: errorLoginization}] = useMakeLoginUserMutation();
    const [checkAuthUser] = useCheckAuthUserMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmitHandler = async (values: InitialValuesType) => {
        dispatch(setAppStatus('loading'));
        try {
            await makeLogin(values).unwrap();
            const user = await checkAuthUser().unwrap();
            dispatch(setUser(user))
            dispatch(setAppIsAuth(true))
            dispatch(setAppStatus('succeeded'));
            navigate('/packs-list', {replace: true})
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }

    return (
        <div className={s.container}>
            <span className={s.spanLogo}>Login</span>
            <Formik validationSchema={loginValidation}
                    initialValues={{email: '', password: '', rememberMe: false}}
                    onSubmit={(values, formikHelpers: FormikHelpers<InitialValuesType>) => {
                        onSubmitHandler(values)
                            .then(res => {
                                formikHelpers.setSubmitting(false)
                            })
                    }}
                    validateOnMount
            >
                {(formik) => {
                    return (<form onSubmit={formik.handleSubmit}>
                        <SuperInputText
                            required placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                            error={formik.errors.email && formik.dirty ? 'Обязательное' +
                                ' поле' : ''}/>
                        <SuperInputText required
                                        placeholder={'Password'}{...formik.getFieldProps('password')}
                                        error={formik.errors.password && formik.dirty ? 'Обязательное' +
                                            ' поле' : ''} hidden/>
                        <div className={s.actionsContainer}><SuperCheckbox
                            children={'Remember Me'} {...formik.getFieldProps('rememberMe')}/>
                            <SuperButton
                                className={s.btn__send}
                                disabled={!formik.isValid || formik.isSubmitting}
                                value={'Submit'}
                                type={"submit"}>
                                Send
                            </SuperButton>
                        </div>
                    </form>)
                }}
            </Formik>
            {
                errorLoginization && <div className={'error'}>
                    {
                        (errorLoginization as FinallyErrorResponseType).data?.error || 'Ошибка соединения'
                    }
                </div>
            }
            <div className={s.links}>
                <NavLink to="/recovery-password">Forgot the password ?</NavLink>
                <NavLink to="/registration">Create an account</NavLink>
            </div>
        </div>
    )
}