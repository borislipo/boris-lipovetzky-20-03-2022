import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "../../hooks/useForm";
import { startGetCitiesList, startGetCityCurrentWeather } from "../../actions/weatherActions";
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export const WeatherForecastScreen = () => {
    const { citiesList, currentWeather } = useSelector(state => state.weather);
    const { loading } = useSelector(state => state.ui);
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm({
        cityInput: '',
    })
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const { cityInput } = formValues;
    const { q } = queryString.parse(location.search)
    const citySearchQuery = q
    const cityKey = citiesList?.find(city => city.label === cityInput)?.key


    useMemo(() => 
    dispatch(startGetCityCurrentWeather(citySearchQuery)
    ), [citySearchQuery])

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
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            <button onClick={() => navigate(`?q=${cityKey}`)}>Search</button>
            <div>
                {JSON.stringify(currentWeather, null, 2)}
            </div>

        </div>
    )
}