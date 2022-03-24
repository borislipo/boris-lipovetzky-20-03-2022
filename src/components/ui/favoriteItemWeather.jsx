import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { CardMedia, Typography } from "@mui/material";
import {convertToFahrenheit} from "../../helpers/helpers";

export const FavoriteItemWeather = ({ cityName, currentWeather, icon, navigateLink }) => {

    const {temperature} = useSelector(state => state.ui);

    const navigate = useNavigate();
    return (
        <Grid
            item
            xs={12}
            s={12}
            md={6}
            lg={2}
            xl={2}
            justifyContent="center"
            alignItems="center"
            sx={{
                maxWidth: "100",
                margin: "0 auto"
            }}>
            <img
                style={{width: "100%", height: "auto"}}
                src={process.env.PUBLIC_URL + `assets/${icon}.svg`}
                alt="weather icon"
            />
            <Typography textAlign="center" variant="h6" component="div">
                {cityName}
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                {temperature === '°C' ? currentWeather : convertToFahrenheit(currentWeather)}{temperature}
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate(navigateLink)}>
                More..
            </Button>

        </Grid>
    )
}