import React from "react";
import s from "../LearnPack.module.scss";
import SuperButton from "../../../../common/SuperButton/SuperButton";

type AnswerWithRateType = {
    question: string | null | undefined
    answer: string | undefined
    finishLearn: () => void
    nextQuestion: () => void
}
type RateType = {
    id: string,
    value:string,
    text:string
}
const ratingValue:Array<RateType> = [
    {
        id: '1',
        value: '1',
        text: 'aaa'
    },
    {
        id: '2',
        value: '2',
        text: 'aaa'
    },
    {
        id: '3',
        value: '3',
        text: 'aaa'
    },
    {
        id: '4',
        value: '4',
        text: 'aaa'
    },
    {
        id: '5',
        value: '5',
        text: 'aaa'
    },
]

export const AnswerWithRate: React.FC<AnswerWithRateType> = React.memo((props) => {

    const {question, answer, finishLearn, nextQuestion} = props;

    const stopLearning = () => {
        finishLearn()
    }

    const showNextQuestion = () => {
        nextQuestion()
    }
    return (
        <>
            <p className={s.question}>
                <span>Question:</span>{question}
            </p>
            <p className={s.question}>
                <span>Answer:</span>{answer}
            </p>
            <div className={s.rate}>
                {
                    ratingValue.map(item => (
                        <label key={item.id} className={s.label}>
                            <input className={s.radio} type="radio" name={'rate'} value={item.value}/>
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
                    Cancel
                </SuperButton>
                <SuperButton className={`${s.btn} ${s.save}`}
                             onClick={showNextQuestion}>Next</SuperButton>
            </div>
        </>
    )
})