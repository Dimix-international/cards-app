import React, {MouseEvent} from "react";
import s from './Modal.module.scss'
import {ModalTriggerType} from "../../main/packsList/PacksList";

type ModalType = {
    isActive: boolean,
    setActive: (value: boolean, trigger: ModalTriggerType | null) => void
    trigger: ModalTriggerType | null
}
export const Modal: React.FC<ModalType> = React.memo(props => {

    const {isActive, setActive,trigger, children} = props;

    const closeModal = () => {
        setActive(false, trigger )
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
                {children}
            </div>
        </div>
    )
})