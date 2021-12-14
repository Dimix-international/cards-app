import React, {ChangeEvent, useState} from "react";
import s from './AddNewModal.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../PacksList";
type AddNewPackModalType = {
    setNewTitlePack:(name:string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
}
export const AddNewPackModal :React.FC<AddNewPackModalType> = React.memo(props => {

    const {setNewTitlePack, openCloseModalWindow} = props;
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
                <h2>Add new pack</h2>
                <span onClick={closeModalWindow}>X</span>
            </div>
            <div className={s.body}>
                <p>Name pack</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue}
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