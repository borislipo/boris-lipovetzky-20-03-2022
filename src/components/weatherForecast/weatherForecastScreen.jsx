import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import { componentTypes } from "../../types/types";
import { startGetCitiesList, startGetCityCurrentWeather, startGetCityFiveDayForecast } from "../../actions/weatherActions";
import queryString from 'query-string';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export const WeatherForecastScreen = () => {
    const { citiesList, currentWeather, fiveDayForecast } = useSelector(state => state.weather);
    const { loading, component } = useSelector(state => state.ui);
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm({
        cityInput: '',
    })
    const [open, setOpen] = useState(false);
    const { cityInput } = formValues;
    const { q, cityQuery } = queryString.parse(location.search)
    const citySearchQuery = q;
    const cityLabelQuery = cityQuery;
    const cityKey = citiesList?.find(city => city.label === cityInput)?.key
    const cityLabel = citiesList?.find(city => city.label === cityInput)?.label


    useMemo(() => citySearchQuery && dispatch(startGetCityCurrentWeather(citySearchQuery)), [citySearchQuery])
    useMemo(() => citySearchQuery && dispatch(startGetCityFiveDayForecast(citySearchQuery)), [citySearchQuery])

    useEffect(() => {
       
        setTimeout(() => {
            if (open) {
                dispatch(startGetCitiesList(cityInput));
            }
        }, 1000);

    }, [cityInput])




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
                                    {loading && component === componentTypes.autocomplete  ? <CircularProgress color="inherit" size={20} /> : null}
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
                    loading && component === componentTypes.current ? <CircularProgress color="inherit" size={150} /> : null

                }
                {
                    !loading && currentWeather && currentWeather.WeatherText ? <h1>{cityLabelQuery}{currentWeather.WeatherText}</h1> : null
                }
                {
                    loading && component === componentTypes.fiveDayForecast ? <CircularProgress color="inherit" size={150} /> : null
                }
                {
                    !loading && fiveDayForecast && fiveDayForecast.length > 0 ? fiveDayForecast.map(day => <h1 key={day.EpochDate}>{day.Date}</h1>) : null
                }
            </div>

        </div>
    )
}