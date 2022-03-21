import { types, componentTypes } from "../types/types";
import { apiKey, url } from "../api/config";
import { setError, removeError, startLoading, finishLoading } from "./uiActions";


export const setFavoriteCity = (payload) => {
    return {
        type: types.setfavorite,
        payload
    }
}

export const getFavoriteCities = () => {
    return {
        type: types.getFavoriteCities,
        payload: JSON.parse(localStorage.getItem('favoriteCities'))
    }
}

export const removeFavoriteCity = (payload) => {
    return {
        type: types.removeFavorite,
        payload
    }
}

export const startGetFavoritesWeather = (list) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading(componentTypes.favorites));
            const weatherPromises = list.map(async (city) => {
                const response = await fetch(`${url}/currentconditions/v1/${city.key}?apikey=${apiKey}`);
                const data = await response.json()
                return data;
            });
                const weather = await Promise.all(weatherPromises);
                dispatch(getFavoritesWeather(weather));
                dispatch(finishLoading(componentTypes.favorites));
            }
        catch (error) {
            dispatch(setError(error.message, componentTypes.favoritesWeather));
        }

        
    }

}

    export const getFavoritesWeather = (payload) => {
        return {
            type: types.favoritesWeather,
            payload
        }
    }