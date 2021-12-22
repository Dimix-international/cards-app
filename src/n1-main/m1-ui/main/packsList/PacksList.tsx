import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {Table} from "./table/Table";
import {useAppDispatch, useAppSelector} from "../../../../hook/redux";
import {
    SortType,
    useCreateNewPackMutation,
    useDeletePackMutation,
    useGetAllPacksQuery,
    useUpdatePackMutation,
} from "../../../m3-dal/pack-list-api";
import {Loader} from "../../common/Loader/Loader";
import s from './packList.module.scss'
import {Pagination} from "../../common/Pagination/Pagination";
import {InputSearch} from "./searchInput/SearchInput";
import {Select} from "../../common/Select/Select";
import {RadioButton} from "../../common/RadioButtons/RadioButton";
import {Range} from "./range/Range";
import {
    ModalTriggerType,
    setAppStatus,
    setIsOpenedModal,
    setTriggerModal
} from "../../../m2-bll/app-reducer";
import {Modal} from "../../common/Modal/Modal";
import {AddEditPackModal} from "./AddEditPackModal/AddEditPackModal";
import {DeletePackModal} from "./DeletePackModal/DeletePackModal";
import {FinallyErrorResponseType} from "../../../m3-dal/auth-api";
import {AxiosResponse} from "axios";
import {setPackListParams} from "../../../m2-bll/a1-pakcList/packListReducer";


export type OptionsSelectType = {
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

export type packInfoType = {
    id: string,
    name: string
}
export const PacksList = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedOptionId, setSelectedOptionId] = useState(selectOptions[0].id);
    const [packInfo, setPackInfo] = useState<packInfoType>({
        id: '',
        name: ''
    });

    const triggerModal = useAppSelector(state => state.app.modalTrigger);
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
    const [updatePack] = useUpdatePackMutation();
    console.log(allCards)

    const data = useMemo(() => allCards ? allCards.cardPacks : [], [allCards]);

    const setCurrentPageHandler = useCallback((page: number) => {
        dispatch(setPackListParams({...queryParams, page}))
    }, [queryParams, dispatch]);

    const searchPackName = useCallback((packName: string) => {
        dispatch(setPackListParams({...queryParams, packName}))
    }, [queryParams, dispatch])

    const setRadioButtonsValue = useCallback((name: string) => {
        if (name === 'my') {
            dispatch(setPackListParams({
                ...queryParams,
                user_id: String(userId)
            }))
        } else {
            dispatch(setPackListParams({...queryParams, user_id: null}))
        }
    }, [queryParams, userId, dispatch]);

    const sortData = useCallback(() => {
        const sort: SortType = queryParams.sortPacks === '0updated' ? '1updated' : '0updated';
        dispatch(setPackListParams({...queryParams, sortPacks: sort}))
    }, [queryParams, dispatch]);

    const setMinMaxRange = useCallback((values: Array<number>) => {
        dispatch(setPackListParams({
            ...queryParams,
            min: values[0],
            max: values[1]
        }))
    }, [queryParams, dispatch]);

    const openCloseModalWindow = useCallback((value: boolean, triggerName: ModalTriggerType,
                                              info?: packInfoType) => {
        dispatch(setIsOpenedModal(value));
        if (!value) {

            setTimeout(() => {
                setPackInfo({id: '', name: ''});
                dispatch(setTriggerModal(null));
            }, 400)

        } else {
            if (triggerName === 'deletePack' || triggerName === 'editPack') {
                info && setPackInfo({...info});
            } else {
                setPackInfo({id: '', name: ''})
            }
            dispatch(setTriggerModal(triggerName));
        }
    }, [dispatch]);


    const createUpdatePackHandler = useCallback(async (name: string) => {
        dispatch(setAppStatus('loading'));
        try {

            const response = await createPack({name});
            dispatch(setIsOpenedModal(false));
            dispatch(setAppStatus('succeeded'));
            navigate(`/packs-list/cards/card?cardsPack_id=${(response as AxiosResponse).data._id}`,
                {
                    replace: true,
                    state: {
                        packName: name,
                        userIdPack: (response as AxiosResponse).data.user_id
                    }
                }
            )
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }, [createPack, dispatch, navigate]);

    const updatePackHandler = useCallback(async (name: string) => {
        dispatch(setAppStatus('loading'));
        try {
            await updatePack({_id: packInfo.id, name});
            dispatch(setIsOpenedModal(false));
            dispatch(setAppStatus('succeeded'));
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }, [dispatch, packInfo.id, updatePack]);

    const deletePackHandler = useCallback(async () => {
        dispatch(setAppStatus('loading'));
        try {
            await deletePack({id: packInfo.id});
            dispatch(setIsOpenedModal(false));
            dispatch(setAppStatus('succeeded'));
        } catch (e) {
            dispatch(setAppStatus('failed'));
        }
    }, [dispatch, deletePack, packInfo]);


    //установка query параметров в url
    useEffect(() => {

        setSearchParams({...Object.entries(searchParams), ...queryParams})
    }, [allCards, queryParams, searchParams, setSearchParams]);

    //установка значения select
    useEffect(() => {
        const el = selectOptions.find(option => option.id === selectedOptionId);
        if (el) {
            dispatch(setPackListParams({
                ...queryParams,
                pageCount: Number(el.value)
            }))
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
                :

                errorGettingPacks ? <div className={'error'}>
                        {
                            (errorGettingPacks as FinallyErrorResponseType)?.data?.error || 'Ошибка соединения'
                        }
                    </div>
                    :
                    <>
                        <div className={s.packList}>
                            <div className={s.panelCards}>
                                <h3 className={s.title}>Show pack cards</h3>
                                <div className={s.radioButtons}>
                                    <RadioButton
                                        activeBtn={queryParams.user_id !== null}
                                        name={'cardsRadio'} text={'My'}
                                        value={'my'}
                                        callback={setRadioButtonsValue}/>
                                    <RadioButton
                                        activeBtn={queryParams.user_id === null}
                                        value={'all'}
                                        name={'cardsRadio'} text={'All'}
                                        callback={setRadioButtonsValue}/>
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
                                        onClick={() => openCloseModalWindow(true, 'addPack')}
                                        className={s.button}>
                                        Add new
                                    </button>
                                </div>
                                <Table
                                    data={data}
                                    sortData={sortData}
                                    openModalWindow={openCloseModalWindow}
                                    updateSort={queryParams.sortPacks}
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
                                            setValue={setSelectedOptionId}
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
                                triggerModal === 'addPack'
                                    ? <AddEditPackModal
                                        setNewTitlePack={createUpdatePackHandler}
                                        openCloseModalWindow={openCloseModalWindow}
                                        title={'Add new pack'}
                                        trigger={'addPack'}
                                    />
                                    : triggerModal === 'editPack'
                                    ? <AddEditPackModal
                                        setNewTitlePack={updatePackHandler}
                                        openCloseModalWindow={openCloseModalWindow}
                                        title={'Edit pack'}
                                        namePack={packInfo.name}
                                        trigger={'editPack'}
                                    />
                                    : triggerModal === 'deletePack'
                                        ? <DeletePackModal
                                            packName={packInfo.name}
                                            deletePack={deletePackHandler}
                                            openCloseModalWindow={openCloseModalWindow}
                                        />
                                        : false
                            }
                        </Modal>
                    </>
            }
        </>
    );
}
