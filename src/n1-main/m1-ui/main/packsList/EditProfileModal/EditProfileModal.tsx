import React, {ChangeEvent, useState} from "react";
import s from '../Pack/AddEditCardModal/AddEditCardModal.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalTriggerType, setAppStatus} from "../../../../m2-bll/app-reducer";
import PersonIcon from "@mui/icons-material/Person";
import s2 from './EditProfileModal.module.scss'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {convertBase64} from "../../../../../utils/convertBase64";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";
import {
    handleServerNetworkAppError
} from "../../../../../utils/error_utils";

type InfoProfileType = {
    nickName: string,
    email: string
    avatar: string | undefined
}
type EditProfileModalType = {
    setNewTitlePack?: (name: string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    infoProfile: InfoProfileType
    trigger: ModalTriggerType

}
type TempValueStateType = {
    nickName: string,
    avatar: string
}
export const EditProfileModal: React.FC<EditProfileModalType> = React.memo(props => {

    const {openCloseModalWindow, infoProfile, trigger} = props;
    const [tempValue, setTempValue] = useState<TempValueStateType>({
        nickName: infoProfile.nickName,
        avatar: infoProfile.avatar || '',
    });

    const dispatch = useAppDispatch();
    const statusLoading = useAppSelector(state => state.app.status)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTempValue({...tempValue, nickName: e.currentTarget.value})
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
        setTempValue({
            nickName: '',
            avatar: '',
        });
    }

    const changeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {

            dispatch(setAppStatus('loading'));
            const file = e.currentTarget.files[0];

            try {
                const base64 = await convertBase64(file);
                setTempValue({...tempValue, avatar: base64 as string})
                dispatch(setAppStatus('succeeded'));
            } catch (e) {
                handleServerNetworkAppError(dispatch)
            }
        }
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
                            statusLoading === 'loading' &&
                            <CircularProgress className={s2.loadingImg}/>
                        }
                        {
                            tempValue.avatar
                                ? <img src={tempValue.avatar} alt=""/>
                                : <PersonIcon className={s2.unknown}/>
                        }
                        <label htmlFor={'file'} className={s2.addPhoto}>
                            <input
                                id={'file'}
                                type="file"
                                name={'file'}
                                className={s2.btnFile}
                                onChange={changeFileHandler}
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