import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useRef,
} from "react";
import {FastField} from 'formik';
import {TextError} from "../TextError/TextError";
import s from './InputFormik.module.scss';
import eyePassword from '../../../../assets/eye.png';
import closeEyePassword from '../../../../assets/noEye.png'
import {FormikValues} from "formik/dist/types";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    label?: string
    name: string
    addClassInput?: string
}


export const InputFormik = React.memo((props: InputPropsType) => {

    const {label, name, addClassInput, ...restProps} = props;


    const finalInputClass = `${s.input} ${addClassInput}`;


    const inputRef = useRef<HTMLInputElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const showPassword = () => {
        if (inputRef.current?.name === 'password' || inputRef.current?.name === 'confirmPassword') {
            inputRef.current.type = 'text';
            if (imgRef.current) {
                imgRef.current.src = eyePassword
            }
            document.addEventListener('mouseup', hidePassword)
        } else {
            return
        }
    }
    const hidePassword = () => {
        if (inputRef.current?.name === 'password' || inputRef.current?.name === 'confirmPassword') {
            inputRef.current.type = 'password';

            if (imgRef.current) {
                imgRef.current.src = closeEyePassword
            }

            document.removeEventListener('mouseup', hidePassword);

        } else {
            return
        }
    }

    return (
        <FastField name={name}>
            {
                (props: FormikValues) => {

                    const {field, form} = props;

                    return (
                        <div className={s.item}>
                            <label htmlFor={restProps.id}
                                   className={s.label}>{label}</label>
                            <input
                                className={finalInputClass}
                                ref={inputRef}
                                {...restProps}
                                {...field}
                            />
                            {
                                name !== 'email' &&
                                <img
                                    ref={imgRef}
                                    draggable={false}
                                    onMouseDown={showPassword}
                                    className={s.img} src={closeEyePassword}
                                    alt=""
                                />
                            }
                            {
                                form.errors[name] && form.touched[name] && form.dirty &&
                                <TextError>{form.errors[name]}</TextError>
                            }
                        </div>
                    )
                }
            }
        </FastField>
    )
})

