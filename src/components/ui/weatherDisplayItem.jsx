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
            <CardMedia
                component="img"
                height="140"
                image={process.env.PUBLIC_URL + `assets/${icon}.svg`}
                alt="green iguana"
            />
            <Typography textAlign="center" variant="h6" component="div">
                {transformDate(date)}
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                {min}{isFahrenheit ? "°F" : "°C"}
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                {max}{isFahrenheit ? "°F" : "°C"}
            </Typography>

        </Grid>

    )
}