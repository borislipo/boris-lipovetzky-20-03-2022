import { types } from "../types/types";

export const weatherReducer = (state = {}, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.currentWeather:
            return {
                ...state,
                currentWeather: payload.weatherData,
            };
        case types.fiveDayForecast:
            return {
                ...state,
                fiveDayForecast: payload
            };
        case types.citiesList:
            return {
                ...state,
                citiesList: payload
            };
        default:
            return state;
    }
}