import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Box } from "@mui/material";
import { convertToFahrenheit } from "../../helpers/helpers";

export const FavoriteItemWeather = ({ cityName, currentWeather, icon, navigateLink }) => {

    const { temperature } = useSelector(state => state.ui);

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
                className="animate__animated animate__fadeIn animate__delay-0.5s"
                style={{ width: "100%", height: "auto" }}
                src={`./assets/${icon}.svg`}
                alt="weather icon"
            />
            <Typography textAlign="center" variant="h6" component="div">
                {cityName}
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                {temperature === '°C' ? ` ${currentWeather}°C ` : `${convertToFahrenheit(currentWeather)}°F`}
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    variant="contained"
                    onClick={() => navigate(navigateLink)}>
                    More..
                </Button>
            </Box>


        </Grid>
    )
}