import React from "react";
import s from "../LearnPack.module.scss";
import SuperButton from "../../../../common/SuperButton/SuperButton";

type QuestionCardType = {
    question: string | undefined
    finishLearn: () => void
    showAnswer: () => void
}
export const QuestionCard: React.FC<QuestionCardType> = React.memo((props) => {

    const {question, finishLearn, showAnswer} = props;

    const stopLearning = () => {
        finishLearn()
    }

    const showAnswerAndRate = () => {
        showAnswer()
    }
    return (
        <>
            <p className={question ? s.question : s.emptyText}>
                {
                    question
                        ? <><span>Question:</span>{question}</>
                        : 'This pack is empty!'
                }
            </p>
            <div className={s.btns}>
                <SuperButton
                    className={`${s.btn} ${s.cancel}`}
                    onClick={stopLearning}
                >
                    Cancel
                </SuperButton>
                <SuperButton
                    className={`${s.btn} ${s.save}`}
                    onClick={showAnswerAndRate}
                    disabled={!question}
                >
                    Show
                    answer</SuperButton>
            </div>
        </>
    )
})