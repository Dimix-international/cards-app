import React from "react";
import {useParams} from "react-router-dom";

type PackType= {

}
export const Pack:React.FC<PackType> = React.memo(props => {

    const {id} = useParams();

    return (
        <div> pack </div>
    )
})