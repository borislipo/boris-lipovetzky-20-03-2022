import { useState } from "react";
import { autoCompleteData } from "../../data/fakeData"
import { useForm } from "../../hooks/useForm";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export const WeatherForecastScreen = () => {
    

    const [formValues, handleInputChange] = useForm({
        city: '',
    })
    const {city} = formValues;


    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const autoCompleteCities = autoCompleteData.map(city => {
        return {
            key: city.Key,
            label: city.LocalizedName
        }
    })


    


    return (
        <div>
            <h1>Weather Forecast Screen</h1>
            <Autocomplete
                onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
                id="city"
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
                options={autoCompleteCities}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
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

        </div>
    )
}