import React, {MouseEvent} from "react";
import s from './Modal.module.scss'

type ModalType = {
    isActive:boolean,
    setActive: (value:boolean) => void
}
export const Modal:React.FC<ModalType> = React.memo(props => {

    const {isActive, setActive, children} = props;

    const closeModal = () => {
        setActive(false)
    }
    const clickContent = (e:MouseEvent<HTMLDivElement>) => {
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