import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { url, apiKey } from "../../api/config";
import { useForm } from "../../hooks/useForm";
import { componentTypes } from "../../types/types";
import { startGetCitiesList, startGetCityCurrentWeather, startGetCityFiveDayForecast } from "../../actions/weatherActions";
import { setFavoriteCity, removeFavoriteCity, getFavoriteCities } from "../../actions/favoritesActions";
import { removeCityFromLocalStorage, capitalizeFirstLetter } from "../../helpers/helpers";
import { WeatherDisplay } from "./weatherDisplay";
import { FideDaysDisplayComponent } from "./fideDaysDisplayComponent";
import { telAvivKey, telAvivLabel } from "../../api/config";
import { AlertDialogComponent } from "../ui/alertDialogComponent";
import { Grid, Box, Paper, Button, CircularProgress, Autocomplete, TextField } from "@mui/material";
import { setTemperature, setError } from "../../actions/uiActions";
import queryString from 'query-string';

export const WeatherForecastScreen = () => {
    const { citiesList, currentWeather, fiveDayForecast, cityName } = useSelector(state => state.weather);
    const { loading, component, error, temperature } = useSelector(state => state.ui);
    const isMounted = useRef(true);
    const cityKeyRef = useRef(currentWeather?.Link?.split("/")[6]);
    const cityLabelRef = useRef(currentWeather?.Link?.split("/")[5].replace(/-/g, ' '));

    const { favorites, favoriteList, removeCity } = useSelector(state => state.favorites);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [formValues, handleInputChange] = useForm({
        cityInput: '',
    })
    const { cityInput } = formValues;

    const { q, cityQuery } = queryString.parse(location.search)
    const citySearchQuery = q;
    const cityLabelQuery = cityQuery && capitalizeFirstLetter(cityQuery?.replace(/-/g, ' '));
    const cityKey = citiesList?.find(city => city.label === cityInput)?.key?.replace(/-/g, ' ')
    const cityLabel = citiesList && capitalizeFirstLetter(citiesList?.find(city => city.label === cityInput)?.label?.replace(/-/g, ' '))

    useMemo(() => citySearchQuery && dispatch(startGetCityCurrentWeather(citySearchQuery, cityLabelQuery)), [citySearchQuery])
    useMemo(() => citySearchQuery && dispatch(startGetCityFiveDayForecast(citySearchQuery)), [citySearchQuery])

    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const geoSuccess = async (pos) => {
        try {
            var crd = pos.coords;
            const response = await fetch(`${url}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${crd.latitude},${crd.longitude}`)
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

    const geoErr = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        cityKeyRef.current = currentWeather?.Link?.split("/")[6];
        cityLabelRef.current = currentWeather?.Link?.split("/")[5].replace(/-/g, ' ');
    }, [currentWeather, citySearchQuery])

    useEffect(() => {

        if (isMounted.current && !currentWeather && !fiveDayForecast) {
            dispatch(setTemperature('°C'));
            navigator.geolocation.getCurrentPosition(geoSuccess, geoErr, geoOptions);
            dispatch(startGetCityCurrentWeather(telAvivKey, telAvivLabel));
            dispatch(startGetCityFiveDayForecast(telAvivKey));
        }
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {

        const searchTimer = setTimeout(() => {
            if (open) {
                dispatch(startGetCitiesList(cityInput));
            }
        }, 1000);

        return () => clearTimeout(searchTimer);

    }, [cityInput])

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
    }, [favorites, removeCity])

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
                        md={8}
                        lg={8}
                        xl={8}
                    >
                        <Autocomplete
                            fullWidth
                            onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
                            id="cityInput"
                            sx={{ width: '100%' }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                            getOptionLabel={(option) => option.label}
                            options={citiesList ? citiesList : []}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading && component === componentTypes.autocomplete ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item
                        xs={5}
                        sm={5}
                        md={2}
                        lg={2}
                        xl={2}
                    >
                        <Button sx={{ margin: "5px 10px" }} variant="contained" size="large" onClick={() => navigate(`?q=${cityKey}&cityQuery=${cityLabel}`)}>Search</Button>
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
                                <Button sx={{ margin: "5px"}} variant="contained" size="large" onClick={() => dispatch(setTemperature('°C'))}>°C</Button>
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
                <Paper
                    className="animate__animated animate__fadeIn animate__delay-0.5s"
                    sx={{ width: '80%', height: '80%', padding: '1rem' }}
                    elevation={3}>
                    <Grid
                        container
                        direction="row"
                        wrap="wrap"
                        flexWrap="wrap"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        {
                            currentWeather && currentWeather.WeatherText ?
                                <Grid item xs={12}>
                                    < WeatherDisplay
                                        cityName={cityName}
                                        currentWeather={currentWeather}
                                        favoriteList={favoriteList}
                                    />
                                </Grid>

                                :
                                null
                        }
                        {

                            fiveDayForecast && fiveDayForecast.length > 0 ?
                                <Grid item xs={12}>
                                    <FideDaysDisplayComponent fiveDaysForecast={fiveDayForecast} />
                                </Grid>

                                :
                                null
                        }
                        {
                            error ? <AlertDialogComponent error={error} /> : null
                        }
                    </Grid>
                </Paper>
            </Box>

        </Box >
    )
}