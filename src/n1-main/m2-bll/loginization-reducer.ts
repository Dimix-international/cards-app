
const loginInitState = {};

export type LoginInitStateType = typeof loginInitState;
export type LoginActionType = any;

export const loginReducer = (state:LoginInitStateType = loginInitState, action:LoginActionType):LoginInitStateType => {
    switch (action.type) {
        default: return state
    }
}