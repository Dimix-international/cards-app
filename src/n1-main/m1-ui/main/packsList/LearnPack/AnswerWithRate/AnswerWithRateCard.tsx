import React, {ChangeEvent, useState} from "react";
import s from "../LearnPack.module.scss";
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {CardType} from "../../../../../m3-dal/cards-api";


type AnswerWithRateType = {
    card: CardType
    finishLearn: () => void
    nextQuestion: (prevGrade: number) => void
}
type RateType = {
    id: string,
    value: number,
    text: string
}
const ratingValue: Array<RateType> = [
    {
        id: '1',
        value: 1,
        text: 'Did not know'
    },
    {
        id: '2',
        value: 2,
        text: 'Forgot'
    },
    {
        id: '3',
        value: 3,
        text: 'A lot of thought'
    },
    {
        id: '4',
        value: 4,
        text: 'Confused'
    },
    {
        id: '5',
        value: 5,
        text: 'Knew the answer'
    },
]

export const AnswerWithRate: React.FC<AnswerWithRateType> = React.memo((props) => {

    const {card, finishLearn, nextQuestion} = props;

    const [checkedRate, setCheckedRate] = useState(0)

    const stopLearning = () => {
        finishLearn()
    }

    const showNextQuestion = () => {
        nextQuestion(checkedRate)
    }
    const setRateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckedRate(Number(e.currentTarget.value))
    }
    return (
        <>
            <p className={s.question}>
                <span>Question:</span>{card.question}
            </p>
            {
                (card.questionImg || card.questionVideo) &&
                <div className={s.fileLearn}>
                    {
                        card.questionImg
                            ? <img src={card.questionImg} alt=""/>
                            : card.questionVideo
                            ? <video preload="metadata" controls>
                                <source src={card.questionVideo}/>
                            </video>
                            : false
                    }
                </div>
            }
            <p className={s.question}>
                <span>Answer:</span>{card.answer}
            </p>
            {
                (card.answerImg || card.answerVideo) &&
                <div className={s.fileLearn}>
                    {
                        card.answerImg
                            ? <img src={card.answerImg} alt=""/>
                            : card.answerVideo
                            ? <video preload="metadata" controls>
                                <source src={card.answerVideo}/>
                            </video>
                            : false
                    }
                </div>
            }
            <div className={s.rate}>
                <h2 className={s.titleRate}>Rate yourself:</h2>
                {
                    ratingValue.map(item => (
                        <label key={item.id} className={s.label}>
                            <input
                                checked={checkedRate === item.value}
                                className={s.radio}
                                type="radio"
                                name={'rate'}
                                value={item.value}
                                onChange={setRateHandler}
                            />
                            <span className={s.radioText}>{item.text}</span>
                        </label>
                    ))
                }
            </div>
            <div className={s.btns}>
                <SuperButton
                    className={`${s.btn} ${s.cancel}`}
                    onClick={stopLearning}
                >
                    Finish
                </SuperButton>
                <SuperButton
                    className={`${s.btn} ${s.save}`}

                    onClick={showNextQuestion}>Next</SuperButton>
            </div>
        </>
    )
})