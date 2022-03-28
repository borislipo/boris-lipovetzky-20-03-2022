import { types, componentTypes } from "../types/types";
import { apiKey, url } from "../api/config";
import { setError, startLoading, finishLoading } from "./uiActions";


export const startGetCitiesList = (query) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading(componentTypes.autocomplete));
            const response = await fetch(`${url}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`);
            if(!response.ok) {
                return dispatch(setError(response.statusText));
            }
            const data = await response.json();
            const autoCompleteCities = data.map(city => {
                return {
                    key: city.Key,
                    label: city.LocalizedName
                }
            })
            dispatch(getCitiesList(autoCompleteCities.slice(0,5)));
            dispatch(finishLoading(componentTypes.autocomplete));
        } catch (error) {
            return dispatch(setError(error.message)); 
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
            const response = await fetch(`${url}/currentconditions/v1/${Key}?apikey=${apiKey}`);
            if (!response.ok) {
                return dispatch(setError(response.statusText));
            }
            const data = await response.json();
            dispatch(getCityCurrentWeather({weatherData : data[0]}));
        } catch (error) {
            return dispatch(setError(error.message)); 
        }
    }
}

export const getCityCurrentWeather = (payload) => {
    return {
        type: types.currentWeather,
        payload
    }
}

export const startGetCityFiveDayForecast = (Key) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading(componentTypes.fiveDayForecast));
            const response = await fetch(`${url}/forecasts/v1/daily/5day/${Key}?apikey=${apiKey}&language=en-us&details=false&metric=true`);
            if (!response.ok) {
                return dispatch(setError(response.statusText));
            }
            const data = await response.json();
            dispatch(getCityFiveDayForecast(data.DailyForecasts));
            dispatch(finishLoading(componentTypes.fiveDayForecast));
        } catch (error) {
            return dispatch(setError(error.message)); 
        }
    }
}

export const getCityFiveDayForecast = (payload) => {
    return {
        type: types.fiveDayForecast,
        payload
    }
}