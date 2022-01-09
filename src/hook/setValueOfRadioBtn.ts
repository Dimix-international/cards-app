import {QueryParamsGetAllCardsType} from "../n1-main/m3-dal/pack-list-api";

type ValueOfRadioBtnType = {
    queryParams:QueryParamsGetAllCardsType,
    name:string,
    userId:string
}
export const setValueOfRadioBtn = (props: ValueOfRadioBtnType) => {
    const {queryParams, userId, name} = props;

    if (name === 'my') {
        return {
            ...queryParams,
            user_id: userId
        }
    } else {
        return {...queryParams, user_id: null}
    }
}