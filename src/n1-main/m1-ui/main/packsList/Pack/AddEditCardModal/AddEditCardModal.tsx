import React, {ChangeEvent, useState} from "react";
import s from './AddEditCardModal.module.scss'

import SuperButton from "../../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../PacksList";

type AddNewPackModalType = {
    setNewTitlePack:(name:string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    title:string
}

export const AddEditCardModal :React.FC<AddNewPackModalType> = React.memo(props => {

    const {setNewTitlePack, openCloseModalWindow, title} = props;
    const[tempValue, setTempValue] = useState('');

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.currentTarget.value)
    }

    const sendNewTitlePack = () => {
        setNewTitlePack(tempValue);
        setTempValue('');
    }
    const closeModalWindow = () => {
        openCloseModalWindow(false, 'add')
    }
    return(
        <div className={s.container}>
            <div className={s.top}>
                <h2>{title}</h2>
                <span onClick={closeModalWindow}>X</span>
            </div>
            <div className={s.body}>
                <p>Question</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue}
                    data-name={'question'}
                />
                <p>Answer</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue}
                    data-name={'answer'}
                />
            </div>
            <div className={s.btns}>
                <SuperButton
                    className={`${s.btn} ${s.cancel}`}
                    onClick={closeModalWindow}
                >
                    Cancel
                </SuperButton>
                <SuperButton className={`${s.btn} ${s.save}`} onClick={sendNewTitlePack}>Save</SuperButton>
            </div>
        </div>
    )
})