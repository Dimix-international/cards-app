import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import s from './AddEditCardModal.module.scss'

import SuperButton from "../../../../common/SuperButton/SuperButton";
import {ModalTriggerType} from "../../../../../m2-bll/app-reducer";
import {CardInfoType} from "../CardsOfPack";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {convertBase64} from "../../../../../../utils/convertBase64";
import {ImgVideoAudio} from "./ImgVideoAudio";

const types = ['image/png', 'image/jpeg', 'image/svg+xml', 'video/mp4', 'video/ogg',
    'video/webm'];
//'audio/webm', 'audio/ogg', 'audio/mp4', 'audio/mpeg'

const dataValidationSchema = yup.object({
    question: yup.string().min(1, 'At least 1 symbols'),
    answer: yup.string().min(1, 'At least 1 symbols'),
    fileQuestion: yup.mixed().test('type', "Invalid file's format!", (value) => {

        if (value === '' || typeof value === "string") {
            return true
        }
        const index = types.findIndex(v => v === value[0].type)
        return index > -1;
    }),
    fileAnswer: yup.mixed().test('type', "Invalid file's format!", (value) => {

        if (value === '' || typeof value === "string") {
            return true
        }
        const index = types.findIndex(v => v === value[0].type)
        return index > -1;
    })
})

type AddNewCardModalType = {
    setNewCard: (id: string, question: string, answer: string) => void
    openCloseModalWindow: (value: boolean, trigger: ModalTriggerType) => void
    title: string
    cardInfo?: CardInfoType
    trigger: ModalTriggerType
}

export type FileType = {
    type: string,
    name: string
}
export type FilesType = {
    fileQuestion: FileType,
    fileAnswer: FileType
}

export type TriggerType = 'question' | 'answer';

export const AddEditCardModal: React.FC<AddNewCardModalType> = React.memo(props => {

    const {setNewCard, openCloseModalWindow, title, cardInfo, trigger} = props;

    const [files, setFiles] = useState<FilesType>({
        fileQuestion: {
            type: '',
            name: '',
        },
        fileAnswer: {
            type: '',
            name: '',
        },
    });

    const {
        register, //позволяет регестрировать поля для формы
        handleSubmit,
        formState: {errors},
        reset, //очистка формы
        getValues,
    } = useForm<CardInfoType & { fileQuestion: string, fileAnswer: string }>({
        mode: 'onChange', //режимы валидации
        defaultValues: {
            id: cardInfo?.id || '',
            question: cardInfo?.question || '',
            answer: cardInfo?.answer || '',
            fileQuestion: cardInfo?.questionImg || cardInfo?.questionVideo || '',
            fileAnswer: cardInfo?.answerImg || cardInfo?.answerVideo || '',
        },
        resolver: yupResolver(dataValidationSchema)
    });

    const sendNewValuesCard = (data: CardInfoType & FilesType) => {
        setNewCard(data.id, data.question, data.answer);
    }
    const closeModalWindow = () => {
        openCloseModalWindow(false, trigger)
    }

    const changeFileHandler = async (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {

        const values = getValues();

        if ((e as any)?.target?.dataset?.name) {
            const trigger: string = (e as any)?.target?.dataset?.name;

            if (trigger === 'question') {
                const fileValue = values.fileQuestion[0];
                if (fileValue) {
                    //@ts-ignore
                    const base64 = await convertBase64(fileValue);
                    setFiles({
                        ...files,
                        fileQuestion: {
                            name: base64 as string,
                            //@ts-ignore
                            type: fileValue.type
                        }
                    })
                }
            } else {
                const fileValue = values.fileAnswer[0];
                if (fileValue) {
                    //@ts-ignore
                    const base64 = await convertBase64(fileValue);
                    setFiles({
                        ...files,
                        fileAnswer: {
                            name: base64 as string,
                            //@ts-ignore
                            type: fileValue.type
                        }
                    })
                }
            }
        }
    }

    const clearFileHandler = (trigger: TriggerType) => {

        if (trigger === 'question') {
            reset({...getValues(), fileQuestion: ''})
            setFiles({...files, fileQuestion: {name: '', type: ''}})
        } else {
            reset({...getValues(), fileAnswer: ''})
            setFiles({...files, fileAnswer: {name: '', type: ''}})
        }
    }

    return (
        <div className={s.container}>
            <div className={s.top}>
                <h2>{title}</h2>
                <span onClick={closeModalWindow}>X</span>
            </div>
            <form onSubmit={handleSubmit(sendNewValuesCard)}
                  onChange={changeFileHandler}>
                <div className={s.body}>
                    <p>Question</p>
                    <input
                        {...register('question')}
                    />
                    <ImgVideoAudio file={files.fileQuestion} />
                    <div className={s.containerLabel}>
                        <label className={s.fileLabel} htmlFor="fileQuestion">
                            <p>+ Attach file</p>
                            <input
                                type="file"
                                id={'fileQuestion'}
                                {...register('fileQuestion')}
                                data-name={'question'}
                            />
                        </label>
                        {
                            files.fileQuestion.name && !errors?.fileQuestion &&
                            <span className={s.clearFile}
                                  onClick={() => clearFileHandler('question')}
                            >
                                delete
                            </span>
                        }
                    </div>
                    {
                        errors?.fileQuestion
                        && <div
                            className={'error'}>{errors?.fileQuestion?.message || 'Incorrect file!'}
                        </div>
                    }
                    {/*-----------*/}
                    <p>Answer</p>
                    <input
                        {...register('answer')}
                    />
                    <ImgVideoAudio file={files.fileAnswer} />
                    <div className={s.containerLabel}>
                        <label className={s.fileLabel} htmlFor="fileAnswer">
                            <p>+ Attach file</p>
                            <input
                                type="file"
                                id={'fileAnswer'}
                                {...register('fileAnswer')}
                                data-name={'answer'}
                            />
                        </label>
                        {
                            files.fileAnswer.name && !errors?.fileAnswer &&
                            <span className={s.clearFile}
                                  onClick={() => clearFileHandler('answer')}
                            >delete
                            </span>
                        }
                    </div>
                    {
                        errors?.fileAnswer
                        && <div
                            className={'error'}>{errors?.fileAnswer?.message || 'Incorrect file!'}
                        </div>
                    }
                </div>
                <div className={s.btns}>
                    <SuperButton
                        className={`${s.btn} ${s.cancel}`}
                        onClick={closeModalWindow}
                    >
                        Cancel
                    </SuperButton>
                    <SuperButton
                        className={`${s.btn} ${s.save}`} type={'submit'}
                    >
                        Save
                    </SuperButton>
                </div>
            </form>
        </div>
    )
})
