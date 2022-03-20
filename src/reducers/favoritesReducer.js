import { types } from "../types/types";

export const favoritesReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.favorites:
            return {
                ...state,
                favorites: payload
            };
        default:
            return state;
    }
}