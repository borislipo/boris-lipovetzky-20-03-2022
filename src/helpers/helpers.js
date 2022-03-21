

export const removeCityFromLocalStorage = ({ cityKey }) => {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
    const newFavoriteCities = favoriteCities.filter(city => city.key !== cityKey);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
}