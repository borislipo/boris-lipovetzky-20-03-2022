export const saveCityToLocalStorage = (favoriteState, city) => {

    if (!favoriteState) {
        localStorage.setItem('favoriteCities', JSON.stringify([city]));
    } else {
        const newFavoriteCities = [...favoriteState, city];
        localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
    }
}