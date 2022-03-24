import { useSelector } from "react-redux";
import { Typography, Grid } from "@mui/material";
import { transformDate } from "../../helpers/helpers";
import { convertToFahrenheit } from "../../helpers/helpers";

export const WeatherDisplayItem = ({ date, min, max, icon }) => {

    const { temperature } = useSelector(state => state.ui);

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
                src={`./assets/${icon}.svg`}
                alt="weather icon"
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
                {temperature === '°C' ? max : convertToFahrenheit(max)}{temperature}
            </Typography>
            <Typography
                className="animate__animated animate__fadeIn animate__delay-0.5s"
                textAlign="center"
                color="text.secondary">
                {temperature === '°C' ? min : convertToFahrenheit(min)}{temperature}
            </Typography>
        </Grid>
    )
}