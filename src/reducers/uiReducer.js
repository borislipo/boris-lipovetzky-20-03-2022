import { types } from "../types/types";

export const uiReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.uiSetError:
            return {
                ...state,
                error: payload
            };
        case types.uiRemoveError:
            return {
                ...state,
                error: null,
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
        case types.setTemperature:
            return {
                ...state,
                temperature: payload
            };
        default:
            return state;
    }
}