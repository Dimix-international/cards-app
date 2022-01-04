import React from "react";
import s from "../LearnPack.module.scss";
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {CardType} from "../../../../../m3-dal/cards-api";

type QuestionCardType = {
    card: CardType
    finishLearn: () => void
    showAnswer: () => void
}
export const QuestionCard: React.FC<QuestionCardType> = React.memo((props) => {

    const {card, finishLearn, showAnswer} = props;

    const stopLearning = () => {
        finishLearn()
    }

    const showAnswerAndRate = () => {
        showAnswer()
    }
    return (
        <>
            <p className={card.question ? s.question : s.emptyText}>
                {
                    card.question
                        ? <><span>Question:</span>{card.question}</>
                        : 'This pack is empty!'
                }
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
            <div className={s.btns}>
                <SuperButton
                    className={`${s.btn} ${s.cancel}`}
                    onClick={stopLearning}
                >
                    Finish
                </SuperButton>
                <SuperButton
                    className={`${s.btn} ${s.save}`}
                    onClick={showAnswerAndRate}
                    disabled={!card.question}
                >
                    Show
                    answer</SuperButton>
            </div>
        </>
    )
})