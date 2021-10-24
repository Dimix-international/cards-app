const componentsInitState = {};

export type ComponentsInitStateType = typeof componentsInitState;
export type ComponentsActionType = any;

export const componentsReducer =
    (state: ComponentsInitStateType = componentsInitState,
     action: ComponentsActionType): ComponentsInitStateType => {
        switch (action.type) {
            default:
                return state
        }
    }