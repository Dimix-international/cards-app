import * as yup from "yup";

export const loginValidation = yup.object().shape({
    email: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой').min(8, 'Логин должен' +
        ' состоять не менее из 8 символов'),
    password: yup.string().required('Обязательное поле').typeError('Поле должно быть строкой').min(8, 'Пароль' +
        ' долженсостоять не менее из 8 символов')
})

