import React, {ChangeEvent, useState} from "react";
import s from '../Pack/AddEditCardModal/AddEditCardModal.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../../../m2-bll/app-reducer";
import PersonIcon from "@mui/icons-material/Person";
import s2 from './EditProfileModal.module.scss'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

type InfoProfileType = {
    nickName: string,
    email: string
    avatar:string | undefined
}
type EditProfileModalType = {
    setNewTitlePack?: (name: string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    infoProfile: InfoProfileType
    trigger: ModalTriggerType

}
type TempValueStateType = {
    nickName: string,
    avatar:string
}
export const EditProfileModal: React.FC<EditProfileModalType> = React.memo(props => {

    const {openCloseModalWindow, infoProfile, trigger} = props;
    const [tempValue, setTempValue] = useState<TempValueStateType>({
        nickName: infoProfile.nickName,
        avatar: infoProfile.avatar || '',
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
            avatar: '',
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
                <div className={s2.avatar}>
                    <div className={s2.avatar__container}>
                        {
                        infoProfile.avatar
                            ? <img src={infoProfile.avatar} alt=""/>
                            : <PersonIcon className={s2.unknown}/>
                    }
                        <label htmlFor={'file'} className={s2.addPhoto}>
                            <input
                                id={'file'}
                                type="file"
                                name={'file'}
                                className={s2.btnFile}
                            />
                            <AddAPhotoIcon style={{
                                fontSize: '40px',
                                color: '#020252',
                                cursor: 'pointer'
                            }}/>
                        </label>
                    </div>
                </div>
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
                    value={infoProfile.email}
                    disabled
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