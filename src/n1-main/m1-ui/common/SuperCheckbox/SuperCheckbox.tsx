import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // сделайте так чтоб работал onChange и onChangeChecked
        /*if(onChangeChecked) {
            onChangeChecked(e.currentTarget.checked)
        }
        if(onChange) {
            onChange(e)
        }*/
        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <label className={finalInputClassName}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={''}
                style={s}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            <span style={s} >{children && <span className={s.spanClassName}>{children}</span>}</span>
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}

export default SuperCheckbox