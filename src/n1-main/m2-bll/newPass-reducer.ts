const newPassInitState = {};

export type NewPassInitStateType = typeof newPassInitState;
export type NewPassActionType = any;

export const newPassReducer =
    (state: NewPassInitStateType = newPassInitState, action: NewPassActionType): NewPassInitStateType => {
        switch (action.type) {
            default:
                return state
        }
    }