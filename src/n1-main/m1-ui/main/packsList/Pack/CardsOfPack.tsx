import React, {useCallback, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    QueryParamsGetCardsOfPackType,
    useGetCardsOfPackQuery
} from "../../../../m3-dal/cards-api";
import {TableCard} from "./tableCard/TableCard";
import s from './CardsOfPack.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppSelector} from "../../../../../hook/redux";
import {InputSearch} from "../searchInput/SearchInput";
import {Loader} from "../../../common/Loader/Loader";

type stateFromTableType = {
    packName:string,
    userIdPack:string
}
type PackType = {}
export const CardsOfPack: React.FC<PackType> = React.memo(props => {


    const isAuth = useAppSelector(state => state.app.isAuthUser);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const packInfo:stateFromTableType = location.state;


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

    const {data, isLoading} = useGetCardsOfPackQuery(queryParams, {
        skip: !isAuth
    });

    const sortData = useCallback(() => {
        console.log('sort')
        /*const sort: SortType = queryParams.sortPacks === '0' ? '1' : '0';
        setQueryParams({...queryParams, sortPacks: sort})*/
    }, []);
    const goBack = () => navigate(-1);


    const searchCardName = useCallback((searchValue: string) => {
        setQueryParams({...queryParams, cardQuestion: searchValue})
    }, [queryParams])

    return (
        <>
            {
                isLoading
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
                                packInfo.userIdPack === String(userId) && <button  className={s.button}>
                                    Add new card
                                </button>
                            }
                        </div>
                        {
                            data?.cards.length === 0
                                ? <p className={s.emptyPackText}>This pack is
                                    empty!</p>
                                : <TableCard
                                    data={data?.cards || []}
                                    sortData={sortData}
                                />
                        }
                    </div>
            }
        </>
    )
})