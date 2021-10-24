const recoverPassInitState = {};

export type RecoverPassInitStateType = typeof recoverPassInitState;
export type RecoverPassActionType = any;

export const recoveryPassReducer =
    (state: RecoverPassInitStateType = recoverPassInitState,
     action: RecoverPassActionType): RecoverPassInitStateType => {
        switch (action.type) {
            default:
                return state
        }
    }