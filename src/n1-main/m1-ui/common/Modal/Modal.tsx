import React, {MouseEvent} from "react";
import s from './Modal.module.scss'
import {ModalTriggerType} from "../../../m2-bll/app-reducer";
import ReactDOM from "react-dom";


type ModalType = {
    isActive: boolean,
    setActive: (value: boolean, trigger: ModalTriggerType) => void
    trigger: ModalTriggerType
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
        ReactDOM.createPortal(<div className={finallyClassModal} onClick={closeModal}>
            <div
                className={finallyClassContent}
                onClick={clickContent}
            >
                {children}
            </div>
        </div>, document.body)
    )
})