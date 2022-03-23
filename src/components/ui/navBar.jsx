import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const NavBar = () => {
    const navigate = useNavigate();


    return (

        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid
                                item
                                xs={6}>
                                <img src={process.env.PUBLIC_URL + `assets/weatherfy.png`} alt="logo icon" />
                            </Grid>

                            <Grid
                                item
                                xs={6}
                            >
                                <Box
                                    sx={{ padding: '1rem', }}
                                    container
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to="/forecast">
                                        <Button variant="contained" >
                                            Weather Forecast
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to="/favorites">
                                        <Button variant="contained" >
                                            Favorite Cities
                                        </Button>
                                    </NavLink>
                                </Box>
                            </Grid>

                        </Grid>

                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    )
}