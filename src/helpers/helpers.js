export const removeCityFromLocalStorage = (cityKey) => {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
    const newFavoriteCities = favoriteCities.filter(city => city.key !== cityKey);
    if (newFavoriteCities.length === 0) {
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

export const convertToFahrenheit = (temp) => {
    return Math.round((temp * 9 / 5) + 32);
}

export const transformDate = (date) => {
    return new Date(date).toDateString().split(" ")[0];
}

const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const geoErr = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

export const getGeolocalizationWeather = (geoSucces) => {
    navigator.geolocation.getCurrentPosition(geoSucces, geoErr, geoOptions);
}