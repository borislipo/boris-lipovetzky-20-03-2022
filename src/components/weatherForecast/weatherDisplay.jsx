import { useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { removeFavoriteCity, setFavoriteCity } from '../../actions/favoritesActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { disableFavButton } from '../../helpers/helpers';

export const WeatherDisplay = ({ cityName, currentWeather, favoriteList, cityRef, cityLableRef }) => {


    const dispatch = useDispatch();

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__delay-0.5s"
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
                            className="animate__animated animate__fadeIn animate__delay-0.5s"
                            component="img"
                            height="140"
                            image={process.env.PUBLIC_URL + `assets/${currentWeather.WeatherIcon}.svg`}
                            alt="green iguana"
                        />
                    </Box>
                    <Box
                        className="animate__animated animate__fadeIn animate__delay-0.5s"
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
                                color="error"
                                onClick={() => dispatch(removeFavoriteCity(currentWeather.Link.split("/")[6].replace(/-/g, ' ')))}
                                endIcon={<FavoriteIcon />}
                            >
                                Remove Fav
                            </Button>
                            :
                            
                            <Button
                                variant="contained"
                                color='error'
                                endIcon={<FavoriteBorderIcon />}
                                onClick={() => dispatch(setFavoriteCity({ key: currentWeather.Link.split("/")[6] , label: currentWeather.Link.split("/")[5].replace(/-/g, ' ') }))}
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