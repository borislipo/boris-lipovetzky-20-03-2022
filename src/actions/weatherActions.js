import { types } from "../types/types";
import { apiKey, url } from "../api/config";
import { setError, removeError, startLoading, finishLoading, forecastLoaded, forecastLoading, forecastSetError } from "./uiActions";


export const startGetCitiesList = (query) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await fetch(`${url}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`);
            const data = await response.json();
            const autoCompleteCities = data.map(city => {
                return {
                    key: city.Key,
                    label: city.LocalizedName
                }
            })
            dispatch(getCitiesList(autoCompleteCities));
            dispatch(finishLoading());
        } catch (error) {
            dispatch(setError(error.message));
        }
    }
}

export const getCitiesList = (payload)=>{
    return {
        type: types.citiesList,
        payload
    }
}

export const startGetCityCurrentWeather = (Key) => {

    return async (dispatch) => {
        try {
            dispatch(forecastLoading());
            const response = await fetch(`${url}/currentconditions/v1/${Key}?apikey=${apiKey}`);
            const data = await response.json();
            dispatch(getCityCurrentWeather(data[0]));
            dispatch(forecastLoaded());
        } catch (error) {
            dispatch(forecastSetError(error.message));
        }
    }
}

export const getCityCurrentWeather = (payload) => {
    return {
        type: types.currentWeather,
        payload
    }
}