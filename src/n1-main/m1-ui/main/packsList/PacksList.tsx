import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Table} from "./table/Table";
import {useAppSelector} from "../../../../hook/redux";
import {
    QueryParamsGetAllCardsType,
    useGetAllCardsQuery
} from "../../../m3-dal/cards_pack-api";
import {Loader} from "../../common/Loader/Loader";
import s from './packList.module.scss'
import {Pagination} from "../../common/Pagination/Pagination";

export const PacksList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const isAuth = useAppSelector(state => state.app.isAuthUser)
    const userId = useAppSelector(state => state.loginization.user._id)

    const [queryParams, setQueryParams] = useState<QueryParamsGetAllCardsType>({
        min: 0,
        max: 100,
        sortPacks: '1',
        page: 1,
        pageCount: 10,
    })
    const {data: allCards, isLoading, isFetching} = useGetAllCardsQuery({
        ...queryParams
    }, {
        skip: !isAuth,
    });

    const data = useMemo(() => allCards ? allCards.cardPacks : [], [allCards]);

    const setCurrentPageHandler = useCallback((page:number) => {
        setQueryParams({...queryParams, page})
    },[queryParams])

    useEffect(() => {
        setSearchParams({...Object.entries(searchParams), ...queryParams})
    }, [allCards, queryParams, searchParams, setSearchParams])

    return (
        <>
            {isLoading || isFetching
                ? <Loader/>
                : <div className={s.packList}>
                    <div className={s.panelCards}>show pack cards</div>
                    <div className={s.bodyCards}>
                        <Table data={data}/>
                        <Pagination
                            totalCards={allCards?.cardPacksTotalCount || 100}
                            pageSize={queryParams.pageCount || 10}
                            pageCurrent={queryParams.page || 1}
                            setCurrentPage={setCurrentPageHandler}
                        />
                    </div>
                </div>
            }
        </>
    );
}
