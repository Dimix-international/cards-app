import {useEffect, useState} from "react";

type DebounceType = {
    value:string,
    delay: number
}
export const useDebounce = ({value, delay}: DebounceType) => {

    const [debValue, setDebValue] = useState(value);

    useEffect(() => {

        const id:number = window.setTimeout(() => {
            setDebValue(value)
        },delay)

        return () => {
            clearTimeout(id)
        }

    },[value, delay])

    return debValue
}