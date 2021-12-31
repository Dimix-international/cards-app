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

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'
import {useForm} from "react-hook-form";


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

const dataValidationSchema = yup.object({
    nickName: yup.string().required().min(3),
    avatar: yup.mixed().test('type', 'only jpeg', (value) => {
        return value && value[0].type === 'image/jpeg'
    })
})

export const EditProfileModal: React.FC<EditProfileModalType> = React.memo(props => {

    const {openCloseModalWindow, infoProfile, trigger} = props;

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
        resolver: yupResolver(dataValidationSchema),
    });

    const dispatch = useAppDispatch();
    const statusLoading = useAppSelector(state => state.app.status)

    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        /*setTempValue({...tempValue, nickName: e.currentTarget.value})*/
    }

    const sendNewValuesCard = async (data: any) => {
        console.log(data)

        if (data.avatar[0]) {
            const base64 = await convertBase64(data.avatar[0]);
            setTempValue({...tempValue, avatar: base64 as string})
        }


        /*setNewCard(tempValue.id, tempValue.question, tempValue.answer);*/
        /*        setTempValue({
                    nickName: '',
                    avatar: '',
                });*/
    }
    const closeModalWindow = () => {
        openCloseModalWindow(false, trigger)
        /*        setTempValue({
                    nickName: '',
                    avatar: '',
                });*/
    }

    const changeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.files) {

            //   dispatch(setAppStatus('loading'));
            const file = e.currentTarget.files[0];

            try {

                const base64 = await convertBase64(file);
                setTempValue({...tempValue, avatar: base64 as string})
                dispatch(setAppStatus('succeeded'));
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
                onSubmit={handleSubmit(sendNewValuesCard)}> {/*// handleSubmit передает данные из формы, sendNewValuesCard обработается, если в форме нету ошибок*/}
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
                                    {...register('avatar', {
                                        validate: {
                                            type: value => value && value === 'image/jpeg'
                                        }
                                    })}
                                    onChange={changeFileHandler}
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
                        {...register('nickName', {
                            minLength: {
                                value: 5,
                                message: 'At least three symbol!'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Max 20 symbol!'
                            },
                        })}
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