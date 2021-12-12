import React, {ChangeEvent, useEffect, useState} from "react";
import s from './SearchInput.module.scss'
import {useDebounce} from "../../../../../hook/debounce";

type SearchInputType = {
    valueSearch:string,
    callback:(value:string) => void
    addClass?: string
}
export const InputSearch:React.FC<SearchInputType> = React.memo((props) => {

    const{valueSearch, callback, addClass} = props;
    const[tempValue, setTempValue] = useState(valueSearch)

    const activeSearchValue = useDebounce({value: tempValue, delay:800})

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.currentTarget.value)
    }

    useEffect(() => {
       callback(activeSearchValue)

    },[activeSearchValue])

    return (
        <input
            type="text"
            className={`${s.input} ${addClass}`}
            value={tempValue}
            onChange={onChangeHandler}
            placeholder={'Search...'}
        />
    )
})