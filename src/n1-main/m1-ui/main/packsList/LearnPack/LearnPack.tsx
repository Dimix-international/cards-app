import s from './LearnPack.module.scss'
import {
    Navigate,
    useLocation,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";
import {
    CardType,
    useGetCardsOfPackQuery,
    useSetCardGradeMutation
} from "../../../../m3-dal/cards-api";
import {Loader} from "../../../common/Loader/Loader";
import React, {useCallback, useEffect, useState} from "react";
import {
    setGradeOfCard,
    setLearningCards
} from "../../../../m2-bll/a2-learnPack/learnPackReducer";
import {useLazyGetAllPacksQuery} from "../../../../m3-dal/pack-list-api";
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
    const queryParamsPacksList = useAppSelector(state => state.packList);
    const location = useLocation();

    const {packName} = location.state as LocationState;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const learningCardsOfPack = useAppSelector(state => state.learningPack.cards)

    const [isShowQuestion, setIsShowQuestion] = useState(true);

    const {
        data,
        isLoading,
        isSuccess,
    } = useGetCardsOfPackQuery({cardsPack_id: cardId, pageCount: 10}, {
        skip: !isAuth,
    });

    const [updatePacksList, {
        isLoading: isLoadingUpdatePack,
        isFetching: isFetchingUpdatePack,
        isSuccess: isSuccessUpdatePack,
    }] = useLazyGetAllPacksQuery();

    const [updateGradesOfCards, {
        isLoading: isLoadingUpdateCardGrade,
        isSuccess: isSuccessUpdateCardGrade,
    }] = useSetCardGradeMutation();

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
        await learningCardsOfPack.forEach(card => {
            card.grade > 0 && updateGradesOfCards({grade: card.grade, card_id: card._id})
        })
        await updatePacksList({...queryParamsPacksList});
    }, [
        queryParamsPacksList, updatePacksList,
        learningCardsOfPack, updateGradesOfCards
    ])

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
        (isSuccessUpdateCardGrade || isSuccessUpdatePack) && navigate(-1)
    },[isSuccessUpdateCardGrade,isSuccessUpdatePack, navigate ])


    return (
        <>
            {
                isLoading || isLoadingUpdateCardGrade || isFetchingUpdatePack || isLoadingUpdatePack
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