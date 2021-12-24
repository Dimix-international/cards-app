import React, {ChangeEvent, useState} from "react";
import s from '../Pack/AddEditCardModal/AddEditCardModal.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../../../m2-bll/app-reducer";


type InfoProfileType = {
    nickName: string,
    email: string
}
type EditProfileModalType = {
    setNewTitlePack?: (name: string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    infoProfile: InfoProfileType
    trigger: ModalTriggerType

}
export const EditProfileModal: React.FC<EditProfileModalType> = React.memo(props => {

    const {openCloseModalWindow, infoProfile, trigger} = props;
    const [tempValue, setTempValue] = useState<InfoProfileType>(infoProfile || {
        nickName: '',
        email: '',
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       /* e.currentTarget.dataset.name && e.currentTarget.dataset.name === 'nickName'
            ? setTempValue({...tempValue, question: e.currentTarget.value})
            : setTempValue({...tempValue, answer: e.currentTarget.value})*/
    }

    const sendNewValuesCard = () => {
        /*setNewCard(tempValue.id, tempValue.question, tempValue.answer);*/
        setTempValue({
            nickName: '',
            email: '',
        });
    }
    const closeModalWindow = () => {
        openCloseModalWindow(false, trigger)
    }
    return (
        <div className={s.container}>
            <div className={s.top}>
                <h2>Personal information</h2>
                <span onClick={closeModalWindow}>X</span>
            </div>
            <div className={s.body}>
                <p>Nickname</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue.nickName}
                    data-name={'nickName'}
                />
                <p>Email</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue.email}
                    data-name={'email'}
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
                             onClick={sendNewValuesCard}>Save</SuperButton>
            </div>
        </div>
    )
})