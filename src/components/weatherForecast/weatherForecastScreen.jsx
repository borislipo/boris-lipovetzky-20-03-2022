import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { url,apiKey } from "../../api/config";
import { useForm } from "../../hooks/useForm";
import { componentTypes } from "../../types/types";
import { startGetCitiesList, startGetCityCurrentWeather, startGetCityFiveDayForecast } from "../../actions/weatherActions";
import { setFavoriteCity, removeFavoriteCity, getFavoriteCities } from "../../actions/favoritesActions";
import { removeCityFromLocalStorage, capitalizeFirstLetter, geoOptions, geoSuccess, geoErr } from "../../helpers/helpers";
import { WeatherDisplay } from "./weatherDisplay";
import { FideDaysDisplayComponent } from "./fideDaysDisplayComponent";
import { telAvivKey, telAvivLabel } from "../../api/config";
import { AlertDialogComponent } from "../ui/alertDialogComponent";
import queryString from 'query-string';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";

export const WeatherForecastScreen = () => {
    const { citiesList, currentWeather, fiveDayForecast, cityName } = useSelector(state => state.weather);
    const { loading, component, error } = useSelector(state => state.ui);
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

    const  geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const geoSuccess =  async(pos) => {
        var crd = pos.coords;
        const reponse = await fetch(`${url}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${crd.latitude},${crd.longitude}`)
        const data = await reponse.json();
        const city = data.LocalizedName;
        const cityKey = data.Key;
        dispatch(startGetCityCurrentWeather(cityKey, city));
        dispatch(startGetCityFiveDayForecast(cityKey));
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
            navigator.geolocation.getCurrentPosition(geoSuccess, geoErr, geoOptions);
            dispatch(startGetCityCurrentWeather(telAvivKey, telAvivLabel))
            dispatch(startGetCityFiveDayForecast(telAvivKey))
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
        dispatch(setFavoriteCity(null))

    }, [favorites])

    useEffect(() => {
        dispatch(getFavoriteCities())
    }, [favorites, removeCity])

    useEffect(() => {
        if (removeCity) {
            removeCityFromLocalStorage(removeCity)
        }
        dispatch(removeFavoriteCity(null))
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
                sx={{ width: '30%', marginBottom: '1rem' }}
            >

                <Autocomplete
                    fullWidth
                    onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
                    id="cityInput"
                    sx={{ width: 300 }}
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

                <Button variant="contained" size="large" onClick={() => navigate(`?q=${cityKey}&cityQuery=${cityLabel}`)}>Search</Button>
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