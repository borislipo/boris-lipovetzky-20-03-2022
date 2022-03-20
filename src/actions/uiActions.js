import { types } from "../types/types"

export const setError = (msg) => ({
    type: types.uiSetError,
    payload: msg
})

export const removeError = () => ({
    type: types.uiRemoveError

})

export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})

export const forecastLoading = () => ({
    type: types.uiForecastLoading
})

export const forecastLoaded = () => ({
    type: types.uiForecastLoaded
})

export const forecastSetError = (msg) => ({
    type: types.uiForecastSetError,
    payload: msg
})