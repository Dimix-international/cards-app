import React, {useMemo, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Table} from "./table/Table";
import {useAppSelector} from "../../../../hook/redux";
import {useGetAllCardsQuery} from "../../../m3-dal/cards_pack-api";
import {Loader} from "../../common/Loader/Loader";
import s from './packList.module.scss'

export const PacksList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const cardsQuery = searchParams.get('cardPacks') || '';
    const isAuth = useAppSelector(state => state.app.isAuthUser)

    const [minC, setMinC] = useState(6);
    const [maxC, setMaxC] = useState(50);

    const {data: allCards, isLoading} = useGetAllCardsQuery({
        pageCount: minC,
        min: 10
    }, {
        skip: !isAuth,
    });

    console.log(allCards)
    const data = useMemo(() => allCards ? allCards.cardPacks : [], [allCards]);


    return (
        <>
            {isLoading
                ? <Loader/>
                : <div className={s.packList}>
                    <Table data={data}/>
                </div>
            }
        </>
    );
}
