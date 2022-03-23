import { useDispatch, useSelector} from 'react-redux';
import { removeFavoriteCity, setFavoriteCity } from '../../actions/favoritesActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { disableFavButton } from '../../helpers/helpers';

export const WeatherDisplay = ({ cityName, currentWeather, favoriteList }) => {


    const dispatch = useDispatch();

    return (
        <Grid
            container
            direction="row"
        >

            <Grid
                item
                xs={7}
            >
                <Box
                    display="flex"
                    flexDirection="row"

                >
                    <Box >
                        <CardMedia
                            component="img"
                            height="140"
                            image={process.env.PUBLIC_URL + `assets/${currentWeather.WeatherIcon}.svg`}
                            alt="green iguana"
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                    >
                        <Typography textAlign="center" variant="h5" component="div">
                            {cityName}
                        </Typography>

                        <Typography textAlign="center" color="text.secondary">
                            {currentWeather.Temperature.Metric.Value}{currentWeather.Temperature.Metric.Unit}
                        </Typography>
                    </Box>

                </Box>

            </Grid>
            <Grid
                item xs={5}>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    
                    {
                        
                        (disableFavButton(favoriteList, currentWeather.Link.split("/")[5].replace(/-/g, ' '))) ?

                            <Button
                                variant="contained"
                                onClick={() => dispatch(removeFavoriteCity(currentWeather.Link.split("/")[6].replace(/-/g, ' ')))}
                            >
                                Remove Fav
                            </Button>
                            :
                            
                            <Button
                                variant="contained"
                                onClick={() => dispatch(setFavoriteCity({ key: currentWeather.Link.split("/")[6] ||"215854", label: currentWeather.Link.split("/")[5].replace(/-/g, ' ') || cityName}))}
                            >
                                Add to Favs
                            </Button>
                        
                    }

                </Box>

            </Grid>
            <Grid item
                xs={12}>
                <Typography textAlign="center" variant="h4">
                    {currentWeather.WeatherText}
                </Typography>
            </Grid>
        </Grid>
    )
}