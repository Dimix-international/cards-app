import React, {useCallback, useEffect, useState} from "react";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";
import {
    QueryParamsGetCardsOfPackType,
    useGetCardsOfPackQuery
} from "../../../../m3-dal/cards-api";
import {TableCard} from "./tableCard/TableCard";
import s from './CardsOfPack.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppSelector} from "../../../../../hook/redux";
import {InputSearch} from "../searchInput/SearchInput";

type PackType = {}
export const CardsOfPack: React.FC<PackType> = React.memo(props => {


    const isAuth = useAppSelector(state => state.app.isAuthUser);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    debugger
    const location = useLocation();
    const packName = location.state.packName;

    const cardId = searchParams.get('cardsPack_id') || ''; //поисковый запрос, || '' -если не найдет


    const [queryParams, setQueryParams] = useState<QueryParamsGetCardsOfPackType>({
        cardsPack_id: cardId,
        pageCount: 10,
        cardQuestion: '',
        cardAnswer: '',
        sortCards: '0',
        page: 1,
    });
    const [searchCard, setSearchCard] = useState('');

    const {data} = useGetCardsOfPackQuery(queryParams, {
        skip: !isAuth
    });

    const sortData = useCallback(() => {
        console.log('sort')
        /*const sort: SortType = queryParams.sortPacks === '0' ? '1' : '0';
        setQueryParams({...queryParams, sortPacks: sort})*/
    }, []);
    const goBack = () => navigate(-1);

    useEffect(() => {
        setQueryParams({...queryParams, cardQuestion:searchCard,cardAnswer:searchCard  })
    },[searchCard])


    return (
        <div className={s.container}>
            <div className={s.header}>
                <ArrowBackIcon className={s.arrow} onClick={goBack}/>
                <h1 className={s.title}>{packName}</h1>
            </div>
            <div className={s.search}>
                <InputSearch
                    valueSearch={searchCard}
                    callback={setSearchCard}
                />
            </div>
            {
                data?.cards.length === 0
                    ? <p className={s.emptyPackText}>This pack is empty!</p>
                    : <TableCard
                        data={data?.cards || []}
                        sortData={sortData}
                    />
            }
        </div>

    )
})