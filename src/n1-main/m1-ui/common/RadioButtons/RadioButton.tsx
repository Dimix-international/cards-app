import React from "react";
import s from './Radio.module.scss'

type RadioButtonsType = {
    name: string
    text: string
    activeBtn: boolean
    callback:(name: string) => void
    value:string
}
export const RadioButton: React.FC<RadioButtonsType> = React.memo((props) => {

    const {name, text, activeBtn, callback,value} = props;


    const setValueBtn = () => {
        callback(value)
    }
    const finallyClassText = activeBtn ? `${s.label} ${s.active}` : s.label
    return (
        <label className={finallyClassText}>
            <input
                className={`${s.radio}`}
                type="radio" name={name}
                value={value}
                onClick={setValueBtn}
            />
            <span className={s.text}>{text}</span>
        </label>

    )
})