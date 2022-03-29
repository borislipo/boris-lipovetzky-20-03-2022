import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { url, apiKey } from "../../api/config";
import { startGetCityCurrentWeather, startGetCityFiveDayForecast } from "../../actions/weatherActions";
import { setFavoriteCity, removeFavoriteCity, getFavoriteCities } from "../../actions/favoritesActions";
import { setTemperature, setError } from "../../actions/uiActions";
import { removeCityFromLocalStorage, capitalizeFirstLetter, getGeolocalizationWeather } from "../../helpers/helpers";
import { AutoCompleteComponent } from "../ui/autoCompleteComponent";
import { WeatherDisplayComponent } from "./weatherDisplayComponent";
import { telAvivKey } from "../../api/config";
import { AlertDialogComponent } from "../ui/alertDialogComponent";
import { Grid, Box, Button } from "@mui/material";
import queryString from 'query-string';

export const WeatherForecastScreen = () => {
    const { currentWeather, fiveDayForecast } = useSelector(state => state.weather);
    const { error, temperature } = useSelector(state => state.ui);
    const { favorites, removeCity } = useSelector(state => state.favorites);
    const isMounted = useRef(true);
    const cityKeyRef = useRef(currentWeather?.Link?.split("/")[6]);
    const cityLabelRef = useRef(capitalizeFirstLetter(currentWeather?.Link?.split("/")[5].replace(/-/g, ' ')));

    const location = useLocation();
    const dispatch = useDispatch();

    const { cityKeySearchQuery } = queryString.parse(location.search);

    const geoSuccess = async (pos) => {
        try {
            var crd = pos.coords;
            const response = await fetch(`${url}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${crd.latitude},${crd.longitude}`);
            if (!response.ok) {
                return dispatch(setError(response.statusText));
            }
            const data = await response.json();
            const city = data.LocalizedName;
            const cityKey = data.Key;
            dispatch(startGetCityCurrentWeather(cityKey, city));
            dispatch(startGetCityFiveDayForecast(cityKey));
        } catch (error) {
            return dispatch(setError(error.message));
        }
    }

    useMemo(() => cityKeySearchQuery && dispatch(startGetCityCurrentWeather(cityKeySearchQuery)), [cityKeySearchQuery])
    useMemo(() => cityKeySearchQuery && dispatch(startGetCityFiveDayForecast(cityKeySearchQuery)), [cityKeySearchQuery])

    useEffect(() => {
        cityKeyRef.current = currentWeather?.Link?.split("/")[6];
        cityLabelRef.current = capitalizeFirstLetter(currentWeather?.Link?.split("/")[5].replace(/-/g, ' '));
    }, [currentWeather, cityKeySearchQuery])

    useEffect(() => {

        dispatch(setTemperature('°C'));
        if (isMounted.current && !currentWeather && !fiveDayForecast && !cityKeySearchQuery) {
            getGeolocalizationWeather(geoSuccess);
            dispatch(startGetCityCurrentWeather(telAvivKey));
            dispatch(startGetCityFiveDayForecast(telAvivKey));
        }
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {

        if (favorites?.key.length > 0 && favorites?.label.length > 0) {
            const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
            if (!favoriteCities) {
                localStorage.setItem('favoriteCities', JSON.stringify([{ key: cityKeyRef.current, label: cityLabelRef.current }]));
            } else {
                const newFavoriteCities = [...favoriteCities, { key: cityKeyRef.current, label: cityLabelRef.current }];
                localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
            }
        }
        dispatch(setFavoriteCity(null));

    }, [favorites])

    useEffect(() => {
        dispatch(getFavoriteCities());
    }, [favorites, removeCity, dispatch])

    useEffect(() => {
        if (removeCity) {
            removeCityFromLocalStorage(removeCity);
        }
        dispatch(removeFavoriteCity(null));
    }, [removeCity])

    return (
        <Box
            className="animate__animated animate__fadeIn animate__delay-0.5s"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', marginTop: '1rem' }}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '70%', marginBottom: '1rem' }}
            >
                <Grid
                    container
                    direction="row"
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={10}
                        xl={10}
                    >
                        <AutoCompleteComponent />
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        sm={5}
                        md={1}
                        lg={1}
                        xl={1}
                    >
                        {
                            temperature && temperature === '°C' ?
                                <Button sx={{ margin: "5px" }} variant="contained" size="large" onClick={() => dispatch(setTemperature('°F'))}>°F</Button>
                                :
                                <Button sx={{ margin: "5px" }} variant="contained" size="large" onClick={() => dispatch(setTemperature('°C'))}>°C</Button>
                        }
                    </Grid>
                </Grid>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ width: '100%' }}
            >
                <WeatherDisplayComponent />
                {
                    error ? <AlertDialogComponent error={error} /> : null
                }
            </Box>

        </Box >
    )
}