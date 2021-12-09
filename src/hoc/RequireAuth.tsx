import React, { ReactElement} from "react";
import {useAppSelector} from "../hook/redux";
import {Loader} from "../n1-main/m1-ui/common/Loader/Loader";

type RequireAuthType = {
    children: ReactElement
}

export const RequireAuth: React.FC<RequireAuthType> = React.memo(({children}: { children: ReactElement }) => {

    const user = useAppSelector(state => state.app.isAuthUser);

    if (!user) {
        //если не авторизованы - сделаем переадресацию
        //state={{from: location}} - уточняем откуда мы пришли
        // чтобы после регистрации могли вернуться на страницу с которой был редирект
        return <Loader />
    }
    return children;//отрисовываем любую страницу переданную если можем на неё попасть
})