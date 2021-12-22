import React, {ChangeEvent, useState} from "react";
import s from './AddEditCardModal.module.scss'

import SuperButton from "../../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../../../../m2-bll/app-reducer";


type CardTemInfoType = {
    question: string,
    answer: string
}
type AddNewCardModalType = {
    setNewCard: (question: string, answer: string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    title: string
    cardInfo?: CardTemInfoType
    trigger: ModalTriggerType
}

export const AddEditCardModal: React.FC<AddNewCardModalType> = React.memo(props => {

    const {setNewCard, openCloseModalWindow, title, cardInfo, trigger} = props;
    const [tempValue, setTempValue] = useState<CardTemInfoType>(cardInfo || {
        question: '',
        answer: '',
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.dataset.name && e.currentTarget.dataset.name === 'question'
            ? setTempValue ({...tempValue, question: e.currentTarget.value} )
            : setTempValue ({...tempValue, answer: e.currentTarget.value} )
    }

    const sendNewTitlePack = () => {
        setNewCard(tempValue.question, tempValue.answer);
        setTempValue({
            question: '',
            answer: '',
        });
    }
    const closeModalWindow = () => {
        openCloseModalWindow(false, trigger)
    }
    return (
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
                    value={tempValue.question}
                    data-name={'question'}
                />
                <p>Answer</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue.answer}
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
                <SuperButton className={`${s.btn} ${s.save}`}
                             onClick={sendNewTitlePack}>Save</SuperButton>
            </div>
        </div>
    )
})