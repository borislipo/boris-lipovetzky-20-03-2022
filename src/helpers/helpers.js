

export const removeCityFromLocalStorage = (cityKey ) => {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
    const newFavoriteCities = favoriteCities.filter(city => city.key !== cityKey);
    if(newFavoriteCities.length === 0) {
        return localStorage.removeItem('favoriteCities');
    }
    localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
}

export const disableFavButton = (favoriteList, cityName) => {
    return favoriteList && favoriteList.find(city => city.label?.toLowerCase() === cityName) ? true : false;
}

export const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}