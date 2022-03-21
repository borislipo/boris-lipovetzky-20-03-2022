import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import { componentTypes } from "../../types/types";
import { startGetCitiesList, startGetCityCurrentWeather, startGetCityFiveDayForecast } from "../../actions/weatherActions";
import { setFavoriteCity} from "../../actions/favoritesActions";
import { saveCityToLocalStorage } from "../../helpers/helpers";
import queryString from 'query-string';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export const WeatherForecastScreen = () => {
    const { citiesList, currentWeather, fiveDayForecast, cityName } = useSelector(state => state.weather);
    const { loading, component } = useSelector(state => state.ui);
    const { favorites } = useSelector(state => state.favorites);
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

    //save favorite city to local storage
    /*useEffect(() => {
        if (cityKey) {

            const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
            if (favoriteCities.length === 0) {
                localStorage.setItem('favoriteCities', JSON.stringify([{ key: cityKey, label: cityLabel }]));
            } else {
                const newFavoriteCities = [...favoriteCities, { key: cityKey, label: cityLabel }];
                localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
            }
        }
    }, [favorites])*/

    //function to save city to localstorage
    /*const saveCityToLocalStorage = () => {
        const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
        if (favoriteCities.length === 0) {
            localStorage.setItem('favoriteCities', JSON.stringify([{ key: cityKey, label: cityLabel }]));
        } else {
            const newFavoriteCities = [...favoriteCities, { key: cityKey, label: cityLabel }];
            localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
        }
    }*/

    //store favorite city in redux store


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
        if (favorites && favorites.key && favorites.label) {
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




    return (
        <div>
            <h1>Weather Forecast Screen</h1>
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
            <button onClick={() => navigate(`?q=${cityKey}&cityQuery=${cityLabel}`)}>Search</button>
            <div>
                {
                    loading && component === componentTypes.current ? <CircularProgress color="inherit" size={50} /> : null

                }
                {
                    !loading && currentWeather && currentWeather.WeatherText ?
                        <div>
                            <h1>{cityName}{currentWeather.WeatherText}</h1>
                            <button onClick={() => dispatch(setFavoriteCity({ key: cityKey, label: cityLabel }))}>Add city to favorites</button>
                        </div>

                        :
                        null
                }
                {
                    loading && component === componentTypes.fiveDayForecast ? <CircularProgress color="inherit" size={50} /> : null
                }
                {
                    fiveDayForecast && fiveDayForecast.length > 0 ? fiveDayForecast.map(day => <h1 key={day.EpochDate}>{day.Date}</h1>) : null
                }
            </div>

        </div>
    )
}