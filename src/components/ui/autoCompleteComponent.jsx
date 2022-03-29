import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startGetCitiesList } from "../../actions/weatherActions";
import { useForm } from "../../hooks/useForm";
import { Grid, CircularProgress, Autocomplete, TextField, Button } from "@mui/material";
import { componentTypes } from "../../types/types";


export const AutoCompleteComponent = () => {

    const { citiesList } = useSelector(state => state.weather);
    const { loading, component } = useSelector(state => state.ui);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [formValues, handleInputChange] = useForm({
        cityInput: '',
    })
    const { cityInput } = formValues;

    const cityKey = citiesList?.find(city => city.label === cityInput)?.key;

    useEffect(() => {

        const searchTimer = setTimeout(() => {
            if (open) {
                dispatch(startGetCitiesList(cityInput));
            }
        }, 1500);

        return () => clearTimeout(searchTimer);

    }, [cityInput])

    return (
        <Grid
            container
            direction="row">
            <Grid item
                xs={12}
                sm={12}
                md={12}
                lg={9}
                xl={9}>
                <Autocomplete
                    fullWidth
                    onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
                    id="cityInput"
                    sx={{ width: '100%' }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);;
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
                <Button sx={{ margin: "5px 10px" }} variant="contained" size="large" onClick={() => navigate(`?cityKeySearchQuery=${cityKey}`)}>Search</Button>
            </Grid>
        </Grid>
    )
}