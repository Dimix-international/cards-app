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
import {
    SortType,
    useGetAllPacksQuery,
    useLazyGetAllPacksQuery
} from "../../../../m3-dal/pack-list-api";
import {
    ModalTriggerType,
    setAppStatus,
    setIsOpenedModal,
    setTriggerModal
} from "../../../../m2-bll/app-reducer";
import {Modal} from "../../../common/Modal/Modal";
import {AddEditCardModal} from "./AddEditCardModal/AddEditCardModal";

type stateFromTableType = {
    packName: string,
    userIdPack: string
}

export type CardInfoType = {
    id: string,
    question: string,
    answer: string,
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

        const [searchParams, setSearchParams] = useSearchParams();
        const navigate = useNavigate();
        const location = useLocation();
        const packInfo = location.state;
        const dispatch = useAppDispatch();

        const cardId = searchParams.get('cardsPack_id') || ''; //поисковый запрос, || '' -если не найдет

        const isOpenModal = useAppSelector(state => state.app.isOpenedModal);
        const isAuth = useAppSelector(state => state.app.isAuthUser);
        const userId = useAppSelector(state => state.loginization.user._id);
        const triggerModal = useAppSelector(state => state.app.modalTrigger);

        const [queryParams, setQueryParams] = useState<QueryParamsGetCardsOfPackType>({
            cardsPack_id: cardId,
            pageCount: 10,
            cardQuestion: '',
            cardAnswer: '',
            sortCards: '0updated',
            page: 1,
        });
        const [selectedOptionId, setSelectedOptionId] = useState(selectOptions[1].id);

        const [cardInfo, setCardInfo] = useState<CardInfoType>({
            id: '',
            question: '',
            answer: '',
        });

        const {
            data,
            isLoading,
            isFetching,
            isError,
        } = useGetCardsOfPackQuery(queryParams, {
            skip: !isAuth,
        });

        const [createCard] = useCreateNewCardMutation();
        const [updatePacksList] = useLazyGetAllPacksQuery();

        //чтобы обновить пакеты, при добавлении/удалении/редактировании карточки
        const queryParamsPacksList = useAppSelector(state => state.packList);

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

        const createCardHandler = useCallback(async (question: string, answer: string) => {
            dispatch(setAppStatus('loading'));
            try {
                await createCard({
                    cardsPack_id: cardId,
                    question,
                    answer
                });

                await updatePacksList({...queryParamsPacksList}); //обновляем все пакеты

                dispatch(setIsOpenedModal(false));
                dispatch(setAppStatus('succeeded'));


            } catch (e) {
                dispatch(setAppStatus('failed'));
            }
        }, [createCard, dispatch, cardId, updatePacksList, queryParamsPacksList]);

        const openCloseModalWindow = useCallback((value: boolean, triggerName: ModalTriggerType,
                                                  info?: CardInfoType) => {
            dispatch(setIsOpenedModal(value));
            if (!value) {

                setTimeout(() => {
                    setCardInfo({id: '', question: '', answer: ''});
                    dispatch(setTriggerModal(null));
                }, 400)

            } else {
                if (triggerName === 'deleteCard' || triggerName === 'editCard') {
                    info && setCardInfo({...info});
                } else {
                    setCardInfo({id: '', question: '', answer: ''});
                }
                dispatch(setTriggerModal(triggerName));
            }
        }, [dispatch]);

        useEffect(() => {
            const el = selectOptions.find(option => option.id === selectedOptionId);
            if (el) {
                setQueryParams({
                    ...queryParams,
                    pageCount: Number(el.value)
                })
            }
        }, [selectedOptionId]);

        /*        if (!isAuth) {
                    return <Navigate to={'/login'} replace/>
                }*/

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
                                    <button
                                        className={s.button}
                                        onClick={() => openCloseModalWindow(true, 'addCard')}
                                    >
                                        Add new card
                                    </button>
                                }
                            </div>
                            {

                                isError
                                    ? <div className={'error'}>
                                        Ошибка соединения
                                    </div>
                                    : <>
                                        {
                                            data?.cards.length === 0
                                                ?
                                                <p className={s.emptyPackText}>This pack
                                                    is
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
                                        <Modal
                                            isActive={isOpenModal}
                                            setActive={openCloseModalWindow}
                                            trigger={triggerModal}
                                        >
                                            <AddEditCardModal
                                                setNewCard={createCardHandler}
                                                openCloseModalWindow={openCloseModalWindow}
                                                title={'Add new card'}
                                                trigger={'addCard'}
                                            />
                                        </Modal>
                                    </>
                            }

                        </div>
                }
            </>
        )
    }
)