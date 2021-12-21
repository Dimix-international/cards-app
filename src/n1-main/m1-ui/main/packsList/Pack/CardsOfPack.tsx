import React, {useCallback, useEffect, useState} from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import {
    QueryParamsGetCardsOfPackType,
    useCreateNewCardMutation,
    useGetCardsOfPackQuery
} from "../../../../m3-dal/cards-api";
import {TableCard} from "./tableCard/TableCard";
import s from './CardsOfPack.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppDispatch, useAppSelector} from "../../../../../hook/redux";
import {InputSearch} from "../searchInput/SearchInput";
import {Loader} from "../../../common/Loader/Loader";
import {OptionsSelectType} from "../PacksList";
import {Select} from "../../../common/Select/Select";
import {Pagination} from "../../../common/Pagination/Pagination";
import {SortType} from "../../../../m3-dal/pack-list-api";
import {setAppStatus, setIsOpenedModal} from "../../../../m2-bll/app-reducer";
import {StarsRating} from "../../../common/StarsRating/StarsRating";

type stateFromTableType = {
    packName: string,
    userIdPack: string
}
type PackType = {}
export const CardsOfPack: React.FC<PackType> = React.memo(props => {

        const selectOptions: Array<OptionsSelectType> = [
            {
                id: '1',
                value: '5'
            },
            {
                id: '2',
                value: '10'
            },
            {
                id: '3',
                value: '20'
            },
        ]

        const isAuth = useAppSelector(state => state.app.isAuthUser);
        console.log(isAuth)
        const [searchParams, setSearchParams] = useSearchParams();
        const navigate = useNavigate();
        const location = useLocation();
        const packInfo: stateFromTableType = location.state;
        const dispatch = useAppDispatch();

        const cardId = searchParams.get('cardsPack_id') || ''; //поисковый запрос, || '' -если не найдет
        const userId = useAppSelector(state => state.loginization.user._id);

        const [queryParams, setQueryParams] = useState<QueryParamsGetCardsOfPackType>({
            cardsPack_id: cardId,
            pageCount: 10,
            cardQuestion: '',
            cardAnswer: '',
            sortCards: '0updated',
            page: 1,
        });
        const [selectedOptionId, setSelectedOptionId] = useState(selectOptions[1].id);
        const {
            data,
            isLoading,
            isFetching,
            isError,
        } = useGetCardsOfPackQuery(queryParams, {
            skip: !isAuth,
        });

        const [createCard] = useCreateNewCardMutation();

        const[starsRating, setStarsRating] = useState(2.6)

        const sortData = useCallback(() => {
            const sort: SortType = queryParams.sortCards === '0updated' ? '1updated' : '0updated';
            setQueryParams({...queryParams, sortCards: sort})
        }, [queryParams]);

        const goBack = () => navigate(-1);


        const searchCardName = useCallback((searchValue: string) => {
            setQueryParams({...queryParams, cardQuestion: searchValue})
        }, [queryParams]);

        const setCurrentPageHandler = useCallback((page: number) => {
            setQueryParams({...queryParams, page})
        }, [queryParams]);

        const createUpdateCardHandler = useCallback(async (question: string, answer: string) => {
            dispatch(setAppStatus('loading'));
            try {

                /* if (triggerModal === 'edit') {
                     await updatePack({_id: packInfo.id, name});
                     dispatch(setIsOpenedModal(false));
                     dispatch(setAppStatus('succeeded'));
                 } else {
                     const response = await createCard({name});
                     dispatch(setIsOpenedModal(false));
                     dispatch(setAppStatus('succeeded'));
                 }*/
                await createCard({
                    cardsPack_id: packInfo.userIdPack,
                    question,
                    answer
                });
                dispatch(setIsOpenedModal(false));
                dispatch(setAppStatus('succeeded'));


            } catch (e) {
                dispatch(setAppStatus('failed'));
            }
        }, [createCard, dispatch, packInfo.userIdPack]);

        useEffect(() => {
            const el = selectOptions.find(option => option.id === selectedOptionId);
            if (el) {
                setQueryParams({
                    ...queryParams,
                    pageCount: Number(el.value)
                })
            }
        }, [selectedOptionId]);

    if (!isAuth) {
        return <Navigate to={'/login'} replace/>
    }

    return (
            <>
                {
                    isLoading || isFetching
                        ? <Loader/>
                        : <div className={s.container}>
                            <div className={s.header}>
                                <ArrowBackIcon className={s.arrow} onClick={goBack}/>
                                <h1 className={s.title}>{packInfo.packName}</h1>
                            </div>
                            <div className={s.search}>
                                <InputSearch
                                    valueSearch={queryParams.cardQuestion || ''}
                                    callback={searchCardName}
                                    addClass={s.input}
                                />
                                {
                                    packInfo.userIdPack === String(userId) &&
                                    <button className={s.button}>
                                        Add new card
                                    </button>
                                }
                            </div>
                            {

                                isError
                                    ? <div className={'error'}>
                                        Ошибка соединения
                                    </div>
                                    :
                                    data?.cards.length === 0
                                        ? <p className={s.emptyPackText}>This pack is
                                            empty!</p>
                                        : <>
                                            <TableCard
                                                data={data?.cards || []}
                                                sortData={sortData}
                                                isOwnerCard={packInfo.userIdPack === String(userId)}
                                                updateSort={queryParams.sortCards}
                                            />
                                            <div className={s.selectCard}>
                                                <Pagination
                                                    totalCards={data?.cardsTotalCount || 0}
                                                    pageSize={queryParams.pageCount || 10}
                                                    pageCurrent={queryParams.page || 1}
                                                    setCurrentPage={setCurrentPageHandler}
                                                />
                                                <div className={s.selectBody}>
                                                    <span>Show</span>
                                                    <Select
                                                        value={selectedOptionId}
                                                        tasks={selectOptions}
                                                        setValue={setSelectedOptionId}
                                                    />
                                                    <span>Cards per Page</span>
                                                </div>
                                            </div>
                                        </>
                            }

                        </div>
                }
            </>
        )
    }
)