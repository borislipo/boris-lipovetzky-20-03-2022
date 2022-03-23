import { types } from "../types/types"

export const setError = (msg, component) => ({
    type: types.uiSetError,
    payload: msg
        
})

export const removeError = (component) => ({
    type: types.uiRemoveError,
    payload: {component}

})

export const startLoading = (component) => ({
    type: types.uiStartLoading,
    payload: {component}
})

export const finishLoading = (component) => ({
    type: types.uiFinishLoading,
    payload: {component}
})

