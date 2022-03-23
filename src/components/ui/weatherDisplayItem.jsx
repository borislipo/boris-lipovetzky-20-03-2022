import { Box } from "@mui/system";
import { CardMedia, Grid } from "@mui/material";
import { Typography } from "@mui/material";

export const WeatherDisplayItem = ({ date, min, max, icon, isFahrenheit }) => {

    //function transform celsius to fahrenheit
    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9 / 5) + 32;
    }

    const transformDate = (date) => {
        return new Date(date).toDateString().split(" ")[0];
    }


    return (
        <Grid
            className="animate__animated animate__fadeIn animate__delay-0.5s"
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
                src={process.env.PUBLIC_URL + `assets/${icon}.svg`}
                alt="green iguana"
            />
            <Typography
                className="animate__animated animate__fadeIn animate__delay-0.5s"
                textAlign="center"
                variant="h6"
                component="div">
                {transformDate(date)}
            </Typography>
            <Typography
                className="animate__animated animate__fadeIn animate__delay-0.5s"
                textAlign="center"
                color="text.secondary">
                {min}{isFahrenheit ? "°F" : "°C"}
            </Typography>
            <Typography
                className="animate__animated animate__fadeIn animate__delay-0.5s"
                textAlign="center"
                color="text.secondary">
                {max}{isFahrenheit ? "°F" : "°C"}
            </Typography>

        </Grid>

    )
}