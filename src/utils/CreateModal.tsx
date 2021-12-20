import {ModalTriggerType} from "../n1-main/m1-ui/main/packsList/PacksList";
import {AddEditPackModal} from "../n1-main/m1-ui/main/packsList/AddEditPackModal/AddEditPackModal";
import React from "react";

type CreateModalType = {
    triggerModal: ModalTriggerType
    setNewTitlePack?:(name:string) => void
    openCloseModalWindow?: (value: boolean, trigger: ModalTriggerType) => void
}
/*
export const CreateModal: React.FC<CreateModalType> = (props) => {
    const {triggerModal, setNewTitlePack} = props;

    switch (triggerModal) {
        case "add":
            return  <AddNewPackModal setNewTitlePack={setNewTitlePack}/>
        default:
            return <AddNewPackModal {...restProps}/>
    }
}*/
