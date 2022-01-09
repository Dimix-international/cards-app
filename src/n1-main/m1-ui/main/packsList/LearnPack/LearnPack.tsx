import s from './LearnPack.module.scss'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";
import {
    CardType,
    useGetCardsOfPackQuery,
    useLazyGetCardsOfPackQuery,
    useSetCardGradeMutation
} from "../../../../m3-dal/cards-api";
import {Loader} from "../../../common/Loader/Loader";
import React, {useCallback, useEffect, useState} from "react";
import {
    setGradeOfCard,
    setLearningCards
} from "../../../../m2-bll/a2-learnPack/learnPackReducer";
import {QuestionCard} from "./Question/QuestionCard";
import {AnswerWithRate} from "./AnswerWithRate/AnswerWithRateCard";
import {getCard} from "../../../../../utils/GetRandomCard";


type LocationState = {
    packName: string;
}
export const LearnPack = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const cardId = searchParams.get('cardsPack_id') || ''; //поисковый запрос, || '' -если не найдет
    const isAuth = useAppSelector(state => state.app.isAuthUser);
    const location = useLocation();

    const {packName} = location.state as LocationState;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

   /* const queryPackParams = useAppSelector(state => state.packList);*/
    const learningCardsOfPack = useAppSelector(state => state.learningPack.cards)

    const [isShowQuestion, setIsShowQuestion] = useState(true);

    const {
        data,
        isLoading,
        isSuccess,
        isFetching,
    } = useGetCardsOfPackQuery({cardsPack_id: cardId, pageCount: 10}, {
        skip: !isAuth,
    });

    const [updateGradesOfCards, {
        isLoading: isLoadingUpdateCardGrade,
        isSuccess: isSuccessUpdateCardGrade,
    }] = useSetCardGradeMutation();

   /* const [updatePacks] = useLazyGetAllPacksQuery();*/
    const [updateCards] = useLazyGetCardsOfPackQuery();

    const [card, setCard] = useState<CardType>({
        answer: '',
        cardsPack_id: '',
        comments: '',
        created: '',
        grade: 0,
        more_id: '',
        question: '',
        rating: 0,
        shots: 0,
        type: '',
        updated: '',
        user_id: '',
        __v: 0,
        _id: '',
        answerImg: null,
        answerVideo: null,
        questionImg: null,
        questionVideo: null,
    });

    const finishLearn = useCallback(async () => {

        if(learningCardsOfPack.length === 0) {
            navigate('/', {replace: true})
            return
        }
        for (let i = 0; i < learningCardsOfPack.length; i++) {
            if (learningCardsOfPack[i].grade > 0 ) {
                await updateGradesOfCards({grade: learningCardsOfPack[i].grade, card_id: learningCardsOfPack[i]._id})
            }
        }
        dispatch(setLearningCards([]))

    }, [learningCardsOfPack, updateGradesOfCards,navigate, dispatch])

    const showAnswer = useCallback(() => {
        setIsShowQuestion(false)
    }, [])

    const showNextQuestion = useCallback((prevGrade: number) => {
        dispatch(setGradeOfCard({cardId: card._id, grade: prevGrade}))
        setIsShowQuestion(true)

    }, [dispatch, card]);

    useEffect(() => {
        if (isSuccess) {
            data?.cards && dispatch(setLearningCards(data.cards))
        }
    }, [data?.cards, dispatch, isSuccess])

    useEffect(() => {
        if (learningCardsOfPack.length && isSuccess) {
            setCard(getCard(learningCardsOfPack))
        }
    }, [learningCardsOfPack, isSuccess])

    useEffect(() => {
        isSuccessUpdateCardGrade && navigate('/', {replace: true})
    },[isSuccessUpdateCardGrade, navigate ])


    return (
        <>
            {
                isLoading || isLoadingUpdateCardGrade || isFetching
                    ? <Loader />
                    : <div className={s.container}>
                        <h1 className={s.title}>{`Learn '${packName}'`}</h1>
                        {
                            isShowQuestion
                                ? <QuestionCard
                                    card={card}
                                    finishLearn={finishLearn}
                                    showAnswer={showAnswer}
                                />
                                : <AnswerWithRate
                                    card={card}
                                    finishLearn={finishLearn}
                                    nextQuestion={showNextQuestion}
                                />
                        }
                    </div>
            }
        </>
    )
}