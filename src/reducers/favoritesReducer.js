import { types } from "../types/types";

export const favoritesReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.setfavorite:
            return {
                ...state,
                favorites: payload
            };
        case types.removeFavorite:
            return {
                ...state,
                removeCity: payload
            };
        case types.getFavoriteCities:
            return {
                ...state,
                favoriteList: payload
            };
        case types.favoritesWeather:
            return {
                ...state,
                favoritesWeather: payload
            };
        default:
            return state;
    }
}