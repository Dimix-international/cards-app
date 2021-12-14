import React from "react";

type DeletePackModalType = {
    packName:string
    deletePack:() => void
}
export const DeletePackModal :React.FC<DeletePackModalType> = React.memo(props => {

    const {deletePack, packName} = props;

    const deletePackHandler = () => {
        deletePack();
    }
    return(
        <div>
            <div>{packName}</div>
            <button onClick={deletePackHandler}>delete</button>
        </div>
    )
})