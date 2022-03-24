import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteCities, startGetFavoritesWeather } from "../../actions/favoritesActions";
import { FavoriteItemWeather } from "../ui/favoriteItemWeather";
import { capitalizeFirstLetter } from "../../helpers/helpers";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";


export const FavoriteCitiesScreen = () => {
    const dispatch = useDispatch();
    const { favoriteList, favorites, favoritesWeather, removeCity } = useSelector(state => state.favorites);

    useEffect(() => {

        dispatch(getFavoriteCities())

    }, [favorites, removeCity])


    useEffect(() => {
        if (favoriteList) {
            dispatch(startGetFavoritesWeather(favoriteList))
        }

    }, [favoriteList, favorites, removeCity])


    return (
        <Box
            className="animate__animated animate__fadeIn animate__delay-0.5s"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', height: '100%' }}
        >
            <h1>Favorite Cities </h1>
            <Grid
                flexWrap="wrap"
                container
                direction="row"
                wrap="wrap"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                {
                    favoriteList && favoriteList.length > 0 && favoritesWeather && favoritesWeather.map(city => {
                        return (
                            <FavoriteItemWeather
                                key={city[0].Link}
                                cityName={capitalizeFirstLetter(city[0].Link?.split('/')[5].replace(/-/g, ' '))}
                                currentWeather={city[0].Temperature.Metric.Value}
                                icon={city[0].WeatherIcon}
                                isFahrenheit={false}
                                navigateLink={`/forecast?q=${city[0].Link.split('/')[6]}&cityQuery=${capitalizeFirstLetter(city[0].Link.split('/')[5].replace(/-/g, ' '))}`}
                            />

                        )
                    })

                }
            </Grid>
        </Box>
    )
}