import { useSelector } from "react-redux";
import { Paper, Grid } from "@mui/material";
import { WeatherDisplay} from "./weatherDisplay";
import { FideDaysDisplayComponent } from "./fideDaysDisplayComponent";
import { capitalizeFirstLetter } from "../../helpers/helpers";

export const WeatherDisplayComponent = () => {

    const { currentWeather, fiveDayForecast } = useSelector(state => state.weather);
    const { favoriteList } = useSelector(state => state.favorites);


    return (
        <>
            {currentWeather &&
                <Paper
                    className="animate__animated animate__fadeIn animate__delay-0.5s"
                    sx={{ width: '80%', height: '80%', padding: '1rem' }}
                    elevation={3}>
                    <Grid
                        container
                        direction="row"
                        wrap="wrap"
                        flexWrap="wrap"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        {
                            currentWeather && currentWeather.WeatherText ?
                                <Grid item xs={12}>
                                    < WeatherDisplay
                                        cityName={capitalizeFirstLetter(currentWeather.Link?.split("/")[5].replace(/-/g, ' '))}
                                        currentWeather={currentWeather}
                                        favoriteList={favoriteList}
                                    />
                                </Grid>
                                :
                                null
                        }
                        {

                            fiveDayForecast && fiveDayForecast.length > 0 ?
                                <Grid item xs={12}>
                                    <FideDaysDisplayComponent fiveDaysForecast={fiveDayForecast} />
                                </Grid>
                                :
                                null
                        }
                    </Grid>
                </Paper>
            }
        </>
    )
}