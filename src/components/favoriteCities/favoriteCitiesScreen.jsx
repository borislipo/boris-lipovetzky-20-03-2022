import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteCities, startGetFavoritesWeather } from "../../actions/favoritesActions";

export const FavoriteCitiesScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { favoriteList, favorites, favoritesWeather, removeCity } = useSelector(state => state.favorites);
    const { loading, component } = useSelector(state => state.ui);


    useEffect(() => {


        dispatch(getFavoriteCities())

    }, [favorites, removeCity])


    useEffect(() => {
        if (favoriteList) {
            dispatch(startGetFavoritesWeather(favoriteList))
        }

    }, [favoriteList, favorites, removeCity])


    return (
        <div>
            <h1>Favorite Cities Screen</h1>

            {
                favoritesWeather && favoritesWeather.map(city => {
                    return (
                        <div key={city[0].Link}>
                            {city[0].Link.split('/')[5]}
                            <button onClick={() => navigate(`/forecast?q=${city[0].Link.split('/')[6]}&cityQuery=${city[0].Link.split('/')[5]}`)}></button>
                        </div>
                    )
                })
            }
        </div>
    )
}