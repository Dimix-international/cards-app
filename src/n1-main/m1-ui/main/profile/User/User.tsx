import React, {useCallback} from 'react';
import s from './User.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";
import PersonIcon from '@mui/icons-material/Person';
import {
    ModalTriggerType,
    setIsOpenedModal,
    setTriggerModal
} from "../../../../m2-bll/app-reducer";
import {packInfoType} from "../../packsList/PacksList";

export const User = () => {

    const user = useAppSelector(state => state.loginization.user);
    const dispatch = useAppDispatch();

    const openCloseModalWindow = useCallback((value: boolean, triggerName: ModalTriggerType,
                                              info?: packInfoType) => {
        dispatch(setIsOpenedModal(value));
        if (!value) {

            setTimeout(() => {
                dispatch(setTriggerModal(null));
            }, 400)

        } else {
            dispatch(setTriggerModal(triggerName));
        }
    }, [dispatch]);

    return (
        <>
            <div className={s.container}>
                <div title={'aaa'} className={s.image}>
                    {
                        user.avatar
                            ? <img src={user.avatar} alt=""/>
                            : <PersonIcon className={s.unknown}/>
                    }
                </div>
                <h1 className={s.name}>
                    {user.name}
                </h1>
                <p className={s.text}>
                    Front-end developer
                </p>
                <button type={"button"}
                        className={s.btn}
                        onClick={() => openCloseModalWindow(true, 'editProfile')}
                >
                    Edit profile
                </button>
            </div>
        </>
    );
}
