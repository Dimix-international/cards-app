import React, {ChangeEvent, useState} from "react";
import s from './AddNewModal.module.scss'
import SuperButton from "../../SuperButton/SuperButton";
type AddNewPackModalType = {
    setNewTitlePack:(name:string) => void
}
export const AddNewPackModal :React.FC<AddNewPackModalType> = React.memo(props => {

    const {setNewTitlePack} = props;
    const[tempValue, setTempValue] = useState('');

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.currentTarget.value)
    }

    const sendNewTitlePack = () => {
        setNewTitlePack(tempValue);
        setTempValue('');
    }
    return(
        <div>
            <div>
                <h2>Add new pack</h2>
                <div>X</div>
            </div>
            <div>
                <p>Name pack</p>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    value={tempValue}
                />
            </div>
            <div>
                <SuperButton >Cancel</SuperButton>
                <SuperButton onClick={sendNewTitlePack}>Save</SuperButton>
            </div>
        </div>
    )
})