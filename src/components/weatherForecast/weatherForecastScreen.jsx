import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import { componentTypes } from "../../types/types";
import { startGetCitiesList, startGetCityCurrentWeather, startGetCityFiveDayForecast } from "../../actions/weatherActions";
import { setFavoriteCity, removeFavoriteCity, getFavoriteCities } from "../../actions/favoritesActions";
import { removeCityFromLocalStorage, disableFavButton } from "../../helpers/helpers";
import { WeatherDisplay } from "./weatherDisplay";
import queryString from 'query-string';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const WeatherForecastScreen = () => {
    const { citiesList, currentWeather, fiveDayForecast, cityName } = useSelector(state => state.weather);
    const { loading, component } = useSelector(state => state.ui);
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
    const cityLabelQuery = cityQuery;
    const cityKey = citiesList?.find(city => city.label === cityInput)?.key
    const cityLabel = citiesList?.find(city => city.label === cityInput)?.label

    useMemo(() => citySearchQuery && dispatch(startGetCityCurrentWeather(citySearchQuery, cityLabelQuery)), [citySearchQuery])
    useMemo(() => citySearchQuery && dispatch(startGetCityFiveDayForecast(citySearchQuery)), [citySearchQuery])

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
                localStorage.setItem('favoriteCities', JSON.stringify([{ key: favorites.key, label: favorites.label }]));
            } else {
                const newFavoriteCities = [...favoriteCities, { key: cityKey, label: cityLabel }];
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
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}

        >
            <h1>Weather Forecast Screen</h1>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '30%' }}
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
                    elevation={3}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >


                        {
                            loading && component === componentTypes.current ? <CircularProgress color="inherit" size={50} /> : null

                        }
                        {
                            !loading && currentWeather && currentWeather.WeatherText ?
                                <div >
                                    < WeatherDisplay cityName={cityName} currentWeather={currentWeather.WeatherText} />

                                    <button
                                        hidden={!disableFavButton(favoriteList, currentWeather.Link.split("/")[5])}
                                        onClick={() => dispatch(removeFavoriteCity(currentWeather.Link.split("/")[6]))}>
                                        remove from favs
                                    </button>


                                    <button onClick={() => dispatch(setFavoriteCity({ key: currentWeather.Link.split("/")[6], label: currentWeather.Link.split("/")[5] }))}
                                        hidden={disableFavButton(favoriteList, currentWeather.Link.split("/")[5])}
                                    >Add city to favorites
                                    </button>

                                </div>

                                :
                                null
                        }
                        {
                            loading && component === componentTypes.fiveDayForecast ? <CircularProgress color="inherit" size={50} /> : null
                        }

                        {

                            fiveDayForecast && fiveDayForecast.length > 0 ? fiveDayForecast.map(day => <h5 className="animate__animated animate__fadeIn animate__delay-0.5s" key={day.EpochDate}>{day.Date}</h5>) : null
                        }
                    </Box>
                </Paper>
            </Box>


            {
                /*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>*/
            }



        </Box >
    )
}