import React from "react";
import {Formik} from 'formik';
import SuperInputText from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import * as yup from 'yup'
export const Login = () => {
    const validationSchema = yup.object().shape({
        name:yup.string().required('Обязательное поле').typeError('Поле должно быть строкой')
    })
    return (
        <div>
            <Formik validationSchema={validationSchema} initialValues={{login: '', password: ''}} validateOnBlur onSubmit={(values => console.log(values))}>
                {({values,errors,touched,handleChange,handleBlur,isValid,dirty})=>(
                    <div>
                        <SuperInputText error={touched.login && errors.login ? errors.login : ''} placeholder={'Login'} name={'login'} onChange={handleChange} onBlur={handleBlur} value={values.login}/>
                        <SuperInputText type={'password'} error={touched.password && errors.password ? errors.password : ''} placeholder={'Password'} name={'password'} onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                        <SuperButton onClick={()=>{
                            console.log(values)}} value={'Submit'} disabled={!isValid && !dirty} type={"submit"}/>
                    </div>
                )}
            </Formik>
        </div>
    )
}