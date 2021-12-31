import React, {ChangeEvent, useState} from "react";
import s from '../Pack/AddEditCardModal/AddEditCardModal.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../../../m2-bll/app-reducer";
import PersonIcon from "@mui/icons-material/Person";
import s2 from './EditProfileModal.module.scss'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {convertBase64} from "../../../../../utils/convertBase64";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";

import {useForm} from "react-hook-form";

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'
import {
    useCreateNewPackMutation,
    useLazyGetAllPacksQuery
} from "../../../../m3-dal/pack-list-api";
import {
    useCheckAuthUserMutation,
    useUpdateProfileUserMutation
} from "../../../../m3-dal/auth-api";


type InfoProfileType = {
    nickName: string,
    email: string
    avatar: string | undefined
}
type EditProfileModalType = {
    updateProfileInfo: (nickName: string, avatar:string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    infoProfile: InfoProfileType
    trigger: ModalTriggerType

}

type TempValueStateType = {
    nickName: string,
    avatar: string
}

const types = ['image/png', 'image/jpeg']
const dataValidationSchema = yup.object({
    nickName: yup.string().min(3, 'At least 3 symbol!').max(20, 'Max 20 symbol!'),
    avatar: yup.mixed().test('type', 'only jpeg', (value) => {
        if (value === '' || typeof value === "string") {
            return true
        }
        const index = types.findIndex(v => v === value[0].type)
        return index > -1;
    })
})

export const EditProfileModal: React.FC<EditProfileModalType> = React.memo(props => {

    const {openCloseModalWindow, infoProfile, trigger, updateProfileInfo} = props;

    const [tempValue, setTempValue] = useState<TempValueStateType>({
        nickName: infoProfile.nickName,
        avatar: infoProfile.avatar || '',
    });

    const {
        register, //позволяет регестрировать поля для формы
        handleSubmit,
        formState: {errors},
        reset, //очистка формы
        getValues,
    } = useForm<TempValueStateType>({
        mode: 'onSubmit', //режимы валидации
        defaultValues: {
            nickName: infoProfile.nickName,
            avatar: infoProfile.avatar || '',
        },
        resolver: yupResolver(dataValidationSchema)
    });

    const sendNewValuesCard = async (data: any) => {

        try {
            if (typeof data.avatar === 'string') {
                await updateProfileInfo( data.nickName,data.avatar);
            } else {
                if (data.avatar[0]) {
                    const base64 = await convertBase64(data.avatar[0]);
                    await updateProfileInfo( data.nickName,base64 as string);
                } else {
                    await updateProfileInfo( data.nickName,'');
                }
            }
        } catch (e) {

        }
    }

    const closeModalWindow = () => {
        openCloseModalWindow(false, trigger)
        /*        setTempValue({
                    nickName: '',
                    avatar: '',
                });*/
    }

    const changeFileHandler = async () => {
        const values = getValues();
        const avatarValue = values.avatar[0];
        if (avatarValue) {
            try {
                //@ts-ignore
                const base64 = await convertBase64(avatarValue);
                setTempValue({...tempValue, avatar: base64 as string})
            } catch (e) {
                /*  handleServerNetworkAppError(dispatch)*/
            }
        }
    }

    return (
        <div className={s.container}>
            <div className={s.top}>
                <h2>Personal information</h2>
                <span onClick={closeModalWindow}>X</span>
            </div>
            <form
                onSubmit={handleSubmit(sendNewValuesCard)}
                onChange={changeFileHandler}> {/*// handleSubmit передает данные из формы, sendNewValuesCard обработается, если в форме нету ошибок*/}
                <div className={s.body}>
                    <div className={s2.avatar}>
                        <div className={s2.avatar__container}>
                            {
                                tempValue.avatar
                                    ? <img src={tempValue.avatar} alt=""/>
                                    : <PersonIcon className={s2.unknown}/>
                            }
                            <label htmlFor={'file'} className={s2.addPhoto}>
                                <input
                                    id={'file'}
                                    type="file"
                                    {...register('avatar')}
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
                    {
                        errors?.avatar
                        && <div
                            className={'error'}>{errors?.avatar?.message || 'Incorrect file!'}</div>
                    }
                    <p>Nickname</p>
                    <input
                        {...register('nickName')}
                    />
                    {
                        errors?.nickName
                        && <div
                            className={'error'}>{errors?.nickName?.message || 'Error!'}</div>
                    }
                    <p>Email</p>
                    <input
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
                    <SuperButton
                        type={'submit'}
                        className={`${s.btn} ${s.save}`}
                    >
                        Save
                    </SuperButton>
                </div>
            </form>
        </div>
    )
})