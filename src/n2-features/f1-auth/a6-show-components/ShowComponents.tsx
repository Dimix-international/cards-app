import React from "react";
import SuperCheckbox
    from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInputText
    from "../../../n1-main/m1-ui/common/SuperInputText/SuperInputText";

export const ShowComponents = () => {
    return (
        <div>
            <SuperInputText />
            <SuperCheckbox />
            <div>
                <SuperButton />
            </div>
        </div>
    )
}