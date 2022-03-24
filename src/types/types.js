export const types = {
    currentWeather: '[Weather] currentWeather',
    fiveDayForecast: '[Weather] fiveDayForecast',
    citiesList: '[Weather] citiesList',
    setfavorite: '[Favorites] favorites',
    getFavoriteCities: '[Favorites] getFavoriteCities',
    removeFavorite: '[Favorites] removeFavorite',
    favoritesWeather: '[Favorites] favoritesWeather',
    uiSetError: '[UI] SetError',
    uiRemoveError: '[UI] RemoveError',
    uiStartLoading: '[UI] StartLoading',
    uiFinishLoading: '[UI] FinishLoading',
    setTemperature: '[UI] SetTemperature',
}

export const componentTypes={
    autocomplete: 'autocomplete',
    currentWeather: 'currentWeather',
    fiveDayForecast: 'fiveDayForecast',
    favorites: 'favorites',
}