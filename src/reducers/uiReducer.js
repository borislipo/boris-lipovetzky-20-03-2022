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
                error: null
            };
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            };
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            };
        case types.uiForecastLoading:
            return {
                ...state,
                forecastLoading: true
            };
        case types.uiForecastLoaded:
            return {
                ...state,
                forecastLoading: false
            };
        case types.uiForecastSetError:
            return {
                ...state,
                forecastError: payload
            };
        default:
            return state;
    }
}