import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { weatherReducer } from "../reducers/weatherReducer";
import { uiReducer } from "../reducers/uiReducer";
import { favoritesReducer } from "../reducers/favoritesReducer";
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    weather: weatherReducer,
    ui: uiReducer,
    favorites: favoritesReducer
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));