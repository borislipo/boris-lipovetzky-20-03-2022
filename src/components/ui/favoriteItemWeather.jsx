import { useNavigate } from "react-router-dom"
import { Box, Button, Grid } from "@mui/material"
import { CardMedia, Typography } from "@mui/material"

export const FavoriteItemWeather = ({ cityName, currentWeather, icon, isFahrenheit, navigateLink }) => {

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
                alt="green iguana"
            />
            <Typography textAlign="center" variant="h6" component="div">
                {cityName}
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                {currentWeather}{isFahrenheit ? "°F" : "°C"}
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate(navigateLink)}>
                More..
            </Button>

        </Grid>
    )
}