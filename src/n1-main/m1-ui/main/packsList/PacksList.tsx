import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Navigate, useSearchParams} from "react-router-dom";
import {Table} from "./table/Table";
import {useAppSelector} from "../../../../hook/redux";
import {
    QueryParamsGetAllCardsType, SortType,
    useGetAllCardsQuery
} from "../../../m3-dal/cards_pack-api";
import {Loader} from "../../common/Loader/Loader";
import s from './packList.module.scss'
import {Pagination} from "../../common/Pagination/Pagination";
import {InputSearch} from "./searchInput/SearchInput";
import {Select} from "../../common/Select/Select";
import {RadioButton} from "../../common/RadioButtons/RadioButton";
import {Range} from "./range/Range";


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

export const PacksList = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedOptionId, setSelectedOptionId] = useState(selectOptions[0].id)

    const isAuth = useAppSelector(state => state.app.isAuthUser)
    const userId = useAppSelector(state => state.loginization.user._id)

    const [queryParams, setQueryParams] = useState<QueryParamsGetAllCardsType>({
        packName: null,
        min: 0,
        max: 50,
        sortPacks: '0',
        page: 1,
        pageCount: 10,
        user_id: null
    });

    const {data: allCards, isLoading} = useGetAllCardsQuery({
        ...queryParams
    }, {
        skip: !isAuth ,
    });

    const data = useMemo(() => allCards ? allCards.cardPacks : [], [allCards]);

    const setCurrentPageHandler = useCallback((page: number) => {
        setQueryParams({...queryParams, page})
    }, [queryParams]);

    const setPackName = useCallback((packName: string) => {
        setQueryParams({...queryParams, packName})
    }, [queryParams])

    const setRadioButtonsValue = useCallback( (name:string) => {
        if(name === 'my') {
            setQueryParams({...queryParams, user_id: String(userId)})
        } else{
            setQueryParams({...queryParams, user_id: null})
        }
    },[queryParams, userId]);

    const sortData = useCallback(() => {
        const sort: SortType =  queryParams.sortPacks === '0' ? '1' : '0';
        setQueryParams({...queryParams, sortPacks: sort })
    },[queryParams])

    const setMinMaxRange = useCallback((values: Array<number>) => {
        setQueryParams({...queryParams, min: values[0],  max: values[1]})
    },[queryParams])

    useEffect(() => {

        setSearchParams({...Object.entries(searchParams), ...queryParams})
    }, [allCards, queryParams, searchParams, setSearchParams])

    useEffect(() => {
        const el = selectOptions.find(option => option.id === selectedOptionId);
        if(el) {
            setQueryParams({...queryParams, pageCount: Number(el.value)})
        }
    },[selectedOptionId])


    if (!isAuth) {
        return <Navigate to={'/login'} replace/>
    }
    return (
        <>
            {isLoading
                ? <Loader/>
                : <div className={s.packList}>
                    <div className={s.panelCards}>
                        <h3 className={s.title}>Show pack cards</h3>
                        <div className={s.radioButtons}>
                            <RadioButton activeBtn={ queryParams.user_id !== null}  name={'my'} text={'My'}  callback={(name:string) => setRadioButtonsValue(name)}/>
                            <RadioButton activeBtn={queryParams.user_id === null}  name={'all'} text={'All'} callback={(name:string) => setRadioButtonsValue(name)}/>
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
                                callback={setPackName}
                                addClass={s.input}
                            />
                            <button className={s.button}>Add new</button>
                        </div>
                        <Table data={data} sortData={sortData}/>
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
                                    setValue={(id:string) => setSelectedOptionId(id)}
                                />
                                <span>Cards per Page</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
