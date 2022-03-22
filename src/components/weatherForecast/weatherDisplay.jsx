import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export const WeatherDisplay = ({ cityName, currentWeather }) => {
    return (
        <Box
            diisplay="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                maxWidth: 345,
                margin: "0 auto"
            }}>
            <CardMedia
                component="img"
                height="140"
                image={process.env.PUBLIC_URL + "assets/day.svg"}
                alt="green iguana"
            />
            <Typography textAlign="center" variant="h5" component="div">
                {cityName}
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                {currentWeather}
            </Typography>

        </Box>

    )
}