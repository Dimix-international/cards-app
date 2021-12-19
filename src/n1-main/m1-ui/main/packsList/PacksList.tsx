import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {Table} from "./table/Table";
import {useAppDispatch, useAppSelector} from "../../../../hook/redux";
import {
    SortType,
    useCreateNewPackMutation,
    useDeletePackMutation,
    useGetAllPacksQuery,
} from "../../../m3-dal/pack-list-api";
import {Loader} from "../../common/Loader/Loader";
import s from './packList.module.scss'
import {Pagination} from "../../common/Pagination/Pagination";
import {InputSearch} from "./searchInput/SearchInput";
import {Select} from "../../common/Select/Select";
import {RadioButton} from "../../common/RadioButtons/RadioButton";
import {Range} from "./range/Range";
import {setAppStatus, setIsOpenedModal} from "../../../m2-bll/app-reducer";
import {Modal} from "../../common/Modal/Modal";
import {AddNewPackModal} from "./AddNew/AddNewModal";
import {DeletePackModal} from "./DeletePack/DeletePackModal";
import {FinallyErrorResponseType} from "../../../m3-dal/auth-api";
import {AxiosResponse} from "axios";
import {setPackListParams} from "../../../m2-bll/a1-pakcList/packListReducer";


type OptionsSelectType = {
    id: string,
    value: string
}
const selectOptions: Array<OptionsSelectType> = [
    {
        id: '1',
        value: '10'
    },
    {
        id: '2',
        value: '25'
    },
    {
        id: '3',
        value: '50'
    },
]
export type ModalTriggerType = 'add' | 'delete';

export type packInfoType = {
    id: string,
    name: string
}
export const PacksList = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedOptionId, setSelectedOptionId] = useState(selectOptions[0].id);
    const [triggerModal, setTriggerModal] = useState<ModalTriggerType>('add');
    const [packInfo, setPackInfo] = useState<packInfoType>({
        id: '',
        name: ''
    });

    const isAuth = useAppSelector(state => state.app.isAuthUser);
    const userId = useAppSelector(state => state.loginization.user._id);
    const isOpenModal = useAppSelector(state => state.app.isOpenedModal);
    const queryParams = useAppSelector(state => state.packList);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const {
        data: allCards,
        isLoading,
        error: errorGettingPacks
    } = useGetAllPacksQuery({
        ...queryParams
    }, {
        skip: !isAuth,
    });

    const [createPack] = useCreateNewPackMutation();
    const [deletePack] = useDeletePackMutation();


    const data = useMemo(() => allCards ? allCards.cardPacks : [], [allCards]);

    const setCurrentPageHandler = useCallback((page: number) => {
        dispatch(setPackListParams({...queryParams, page}))
    }, [queryParams, dispatch]);

    const searchPackName = useCallback((packName: string) => {
        dispatch(setPackListParams({...queryParams, packName}))
    }, [queryParams, dispatch])

    const setRadioButtonsValue = useCallback((name: string) => {
        if (name === 'my') {
            dispatch(setPackListParams({...queryParams, user_id: String(userId)}))
        } else {
            dispatch(setPackListParams({...queryParams, user_id: null}))
        }
    }, [queryParams, userId, dispatch]);

    const sortData = useCallback(() => {
        const sort: SortType = queryParams.sortPacks === '0' ? '1' : '0';
        dispatch(setPackListParams({...queryParams, sortPacks: sort}))
    }, [queryParams, dispatch]);

    const setMinMaxRange = useCallback((values: Array<number>) => {
        dispatch(setPackListParams({...queryParams, min: values[0], max: values[1]}))
    }, [queryParams, dispatch]);

    const openCloseModalWindow = useCallback((value: boolean, triggerName: ModalTriggerType,
                                              info?: packInfoType) => {
        dispatch(setIsOpenedModal(value));
        if (triggerName === 'delete') {
            info && setPackInfo({...info});
        }
        setTriggerModal(triggerName);
    }, [dispatch]);


    const createNewPack = useCallback(async (name: string) => {
        dispatch(setAppStatus('loading'));
        try {
            const response = await createPack({name});
            dispatch(setIsOpenedModal(false));
            dispatch(setAppStatus('succeeded'));

            navigate(`/packs-list/cards/card?cardsPack_id=${(response as AxiosResponse).data._id} `,
                {replace: true, state: {packName: packInfo.name}}
                )
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }, [createPack, dispatch, navigate, packInfo.name]);

    const deletePackHandler = useCallback(async () => {
        dispatch(setAppStatus('loading'));
        try {
            await deletePack({id: packInfo.id});
            dispatch(setIsOpenedModal(false));
            dispatch(setAppStatus('succeeded'));
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }, [dispatch, deletePack, packInfo])

    //установка query параметров в url
    useEffect(() => {

        setSearchParams({...Object.entries(searchParams), ...queryParams})
    }, [allCards, queryParams, searchParams, setSearchParams]);

    //установка значения select
    useEffect(() => {
        const el = selectOptions.find(option => option.id === selectedOptionId);
        if (el) {
            dispatch(setPackListParams({...queryParams, pageCount: Number(el.value)}))
        }
    }, [selectedOptionId, dispatch]);

    //блокируем скролл всей страницы, когда открыто модальное окно
    /*    useEffect(() => {
            if (isOpenModal) {
                document.body.classList.add(s.body_lock)
            } else {
                document.body.className = ''
            }
        }, [isOpenModal])*/

    if (!isAuth) {
        return <Navigate to={'/login'} replace/>
    }

    return (
        <>
            {isLoading
                ? <Loader/>
                : <>
                    <div className={s.packList}>
                        <div className={s.panelCards}>
                            <h3 className={s.title}>Show pack cards</h3>
                            <div className={s.radioButtons}>
                                <RadioButton
                                    activeBtn={queryParams.user_id !== null}
                                    name={'cardsRadio'} text={'My'}
                                    value={'my'}
                                    callback={(name: string) => setRadioButtonsValue(name)}/>
                                <RadioButton
                                    activeBtn={queryParams.user_id === null}
                                    value={'all'}
                                    name={'cardsRadio'} text={'All'}
                                    callback={(name: string) => setRadioButtonsValue(name)}/>
                            </div>
                            <Range
                                minValue={queryParams.min || 0}
                                maxValue={queryParams.max || 100}
                                setMinMaxRange={setMinMaxRange}
                            />
                        </div>
                        <div className={s.bodyCards}>
                            <h2 className={s.title}>Packs List</h2>
                            <div className={s.search}>
                                <InputSearch
                                    valueSearch={queryParams.packName || ''}
                                    callback={searchPackName}
                                    addClass={s.input}
                                />
                                <button
                                    onClick={() => openCloseModalWindow(true, 'add')}
                                    className={s.button}>Add new
                                </button>
                            </div>
                            <Table
                                data={data}
                                sortData={sortData}
                                openModalWindow={openCloseModalWindow}
                            />
                            <div className={s.selectCard}>
                                <Pagination
                                    totalCards={allCards?.cardPacksTotalCount || 0}
                                    pageSize={queryParams.pageCount || 10}
                                    pageCurrent={queryParams.page || 1}
                                    setCurrentPage={setCurrentPageHandler}
                                />
                                <div className={s.selectBody}>
                                    <span>Show</span>
                                    <Select
                                        value={selectedOptionId}
                                        tasks={selectOptions}
                                        setValue={(id: string) => setSelectedOptionId(id)}
                                    />
                                    <span>Cards per Page</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isActive={isOpenModal}
                        setActive={openCloseModalWindow}
                        trigger={triggerModal}
                    >
                        {
                            triggerModal === 'add'
                                ? <AddNewPackModal
                                    setNewTitlePack={(name: string) => createNewPack(name)}
                                    openCloseModalWindow={openCloseModalWindow}
                                />
                                : <DeletePackModal
                                    packName={packInfo.name}
                                    deletePack={deletePackHandler}
                                    openCloseModalWindow={openCloseModalWindow}
                                />
                        }
                        {
                            errorGettingPacks && <div className={'error'}>
                                {
                                    (errorGettingPacks as FinallyErrorResponseType)?.data?.error || 'Ошибка соединения'
                                }
                            </div>
                        }
                    </Modal>
                </>
            }
        </>
    );
}
