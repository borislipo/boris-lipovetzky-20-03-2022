export const FavoriteCitiesScreen = () => {

    //favorite cities from local storage
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));

  
    return (
        <div>
            <h1>Favorite Cities Screen</h1>
        </div>
    )
}