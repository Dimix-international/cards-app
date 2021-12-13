import React, {MouseEvent} from "react";
import s from './Modal.module.scss'
import {ModalTriggerType} from "../../main/packsList/PacksList";
import {AddNewPackModal} from "./AddNew/AddNewModal";
import {DeletePackModal} from "./DeletePack/DeletePackModal";

type ModalType = {
    isActive: boolean,
    setActive: (value: boolean) => void
    triggerName: ModalTriggerType
    callback: (name: string) => void
}
export const Modal: React.FC<ModalType> = React.memo(props => {

    const {isActive, setActive, triggerName, callback} = props;

    const closeModal = () => {
        setActive(false)
    }
    const clickContent = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }
    const finallyClassModal = isActive ? `${s.modal} ${s.active}` : s.modal;
    const finallyClassContent = isActive ? `${s.content} ${s.active}` : s.content;


    return (
        <div className={finallyClassModal} onClick={closeModal}>
            <div
                className={finallyClassContent}
                onClick={clickContent}
            >
                {
                    triggerName === 'add'
                        ? <AddNewPackModal
                            setNewTitlePack={callback}
                        />
                        : <DeletePackModal/>
                }
            </div>
        </div>
    )
})