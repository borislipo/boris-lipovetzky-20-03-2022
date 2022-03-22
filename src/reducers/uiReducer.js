import { types } from "../types/types";

export const uiReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.uiSetError:
            return {
                ...state,
                error: payload.msg,
                component: payload.component
            };
        case types.uiRemoveError:
            return {
                ...state,
                error: null,
                component: payload.component
            };
        case types.uiStartLoading:
            return {
                ...state,
                loading: true,
                component: payload.component
            };
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false,
                component: payload.component
            };
        default:
            return state;
    }
}