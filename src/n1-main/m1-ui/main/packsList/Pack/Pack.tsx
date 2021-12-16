import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useGetCardsOfPackQuery} from "../../../../m3-dal/cards-api";

type PackType= {

}
export const Pack:React.FC<PackType> = React.memo(props => {

    const [searchParams, setSearchParams] = useSearchParams();
    const idPack = searchParams.get('cardsPack_id') || ''; //поисковый запрос, || '' -если не найдет
    const navigate = useNavigate();

    const {data} = useGetCardsOfPackQuery({cardsPack_id: idPack || ''});
    console.log(data)

    const goBack = () => navigate(-1);

    return (
        <div>
            <button onClick={goBack}> back</button>
        </div>

    )
})