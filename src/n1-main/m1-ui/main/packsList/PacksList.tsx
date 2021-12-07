import React from 'react';
import {useGetAllCardsQuery} from "../../../m3-dal/cards_pack";


export const PacksList = () => {

    const {data} = useGetAllCardsQuery('');
    console.log(data)
    return (
        <div>
            PacksList
        </div>
    );
}
