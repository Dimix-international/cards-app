const registrInitState = {};

export type RegistrInitStateType = typeof registrInitState;
export type RegistrActionType = any;

export const registerReducer =
    (state: RegistrInitStateType = registrInitState,
     action: RegistrActionType): RegistrInitStateType => {
        switch (action.type) {
            default:
                return state
        }
    }