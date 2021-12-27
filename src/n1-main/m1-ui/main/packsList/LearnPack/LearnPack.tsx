import s from './LearnPack.module.scss'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";
import {useGetCardsOfPackQuery} from "../../../../m3-dal/cards-api";
import {Loader} from "../../../common/Loader/Loader";
import React, {useCallback, useEffect, useState} from "react";
import {setLearningCards} from "../../../../m2-bll/a2-learnPack/learnPackReducer";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {useLazyGetAllPacksQuery} from "../../../../m3-dal/pack-list-api";
import {QuestionCard} from "./Question/QuestionCard";
import {AnswerWithRate} from "./AnswerWithRate/AnswerWithRateCard";

export const LearnPack = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const cardId = searchParams.get('cardsPack_id') || ''; //поисковый запрос, || '' -если не найдет
    const isAuth = useAppSelector(state => state.app.isAuthUser);
    const queryParamsPacksList = useAppSelector(state => state.packList);
    const location = useLocation();
    const packName = location.state.packName;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isShowQuestion, setIsShowQuestion] = useState(true);

    const {
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetCardsOfPackQuery({cardsPack_id: cardId}, {
        skip: !isAuth,
    });
    const [updatePacksList, {isFetching: isFetchingUpdatePack}] = useLazyGetAllPacksQuery();


    const finishLearn = useCallback(async () => {
        await updatePacksList({...queryParamsPacksList})
        navigate(-1)
    }, [navigate, queryParamsPacksList, updatePacksList])

    const showAnswer = useCallback(() => {
        setIsShowQuestion(false)
    }, [])

    const showNextQuestion = useCallback(() => {
        setIsShowQuestion(true)
    }, [])

    useEffect(() => {
        if (isSuccess) {
            data?.cards && dispatch(setLearningCards(data.cards))
        }
    }, [data?.cards, dispatch, isSuccess])

    return (
        <>
            {
                isLoading || isFetchingUpdatePack
                    ? <Loader/>
                    : <div className={s.container}>
                        <h1 className={s.title}>{`Learn '${packName}'`}</h1>
                        {
                            isShowQuestion
                                ? <QuestionCard
                                    question={data?.cards.length === 0 ? null : data?.cards[0].question}
                                    finishLearn={finishLearn}
                                    showAnswer={showAnswer}
                                />
                                : <AnswerWithRate
                                    question={data?.cards[0].question}
                                    answer={data?.cards[0].answer}
                                    finishLearn={finishLearn}
                                    nextQuestion={showNextQuestion}
                                />
                        }
                    </div>
            }
        </>
    )
}