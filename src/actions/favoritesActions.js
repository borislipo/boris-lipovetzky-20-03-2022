import { types, componentTypes } from "../types/types";
import { apiKey, url } from "../api/config";
import { setError, removeError, startLoading, finishLoading } from "./uiActions";


export const setFavoriteCity = (payload) => {
    return {
        type: types.setfavorite,
        payload
    }
}

