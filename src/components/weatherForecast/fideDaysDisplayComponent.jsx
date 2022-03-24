import { WeatherDisplayItem } from "../ui/weatherDisplayItem"
import { Grid } from "@mui/material"

export const FideDaysDisplayComponent = ({ fiveDaysForecast }) => {

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__delay-0.5s"
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            {
                fiveDaysForecast.map((day) => {
                    return (
                        <WeatherDisplayItem
                            key={day.EpochDate}
                            date={day.Date}
                            min={day.Temperature.Minimum.Value}
                            max={day.Temperature.Maximum.Value}
                            icon={day.Day.Icon}
                            isFahrenheit={day.Temperature.Maximum.Unit === "C" ? false : true}
                        />
                    )
                })
            }
        </Grid>
    )

}