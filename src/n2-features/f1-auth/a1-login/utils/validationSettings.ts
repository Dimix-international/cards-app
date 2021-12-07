import * as yup from "yup";

export const loginValidation = yup.object().shape({
    email: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой'),
    password: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой')
})

