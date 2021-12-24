import React from "react";
import s from '../AddEditPackModal/AddEditPackModal.module.scss'
import s2 from './DeleteModal.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../../../m2-bll/app-reducer";

type TriggerDeleteType = 'deletePack' | 'deleteCard'

type DeletePackModalType = {
    nameValue: string
    deletePack: () => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void,
    triggerDelete: TriggerDeleteType
}
export const DeleteModalWindow: React.FC<DeletePackModalType> = React.memo(props => {

    const {deletePack, nameValue, openCloseModalWindow, triggerDelete} = props;

    const deletePackHandler = () => {
        deletePack();
    }
    const closeModalWindow = () => {
        openCloseModalWindow(false, null)
    }
    return (
        <div className={s.container}>
            <div className={s.top}>
                <h2>{
                    triggerDelete === 'deletePack'
                        ? `Delete pack`
                        : `Delete card`
                }</h2>
                <span onClick={closeModalWindow}>X</span>
            </div>
            <div className={`${s.body} ${s2.body}`}>
                <p>Do you really want to remove <span className={s2.text}>
                    {
                        triggerDelete === 'deletePack'
                            ? `Pack Name - ${nameValue}?`
                            : `Card with question - ${nameValue}`
                    }
                </span></p>
                <p>
                    {
                        triggerDelete === 'deletePack'
                            ? `All cards will be excluded from this course.`
                            : `Card will be excluded from this pack`
                    }</p>
            </div>
            <div className={s.btns}>
                <SuperButton
                    className={`${s.btn} ${s.cancel}`}
                    onClick={closeModalWindow}
                >
                    Cancel
                </SuperButton>
                <SuperButton className={`${s.btn} ${s2.delete}`}
                             onClick={deletePackHandler}>Delete</SuperButton>
            </div>
        </div>
    )
})