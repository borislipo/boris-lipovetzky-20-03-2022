import { NavLink } from 'react-router-dom'
import { Grid, AppBar, Box, Toolbar, Button } from '@mui/material';

export const NavBar = () => {

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
                                xs={12}
                                s={12}
                                md={6}
                                lg={6}
                                xl={6}
                            >
                                <img
                                    className="animate__animated animate__fadeIn animate__delay-0.5s"
                                    src={`./assets/weatherfy.png`} alt="logo icon" />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                s={12}
                                md={6}
                                lg={6}
                                xl={6}
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
                                        <Button sx={{ margin: "5px" }} variant="contained" >
                                            Weather Forecast
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to="/favorites">
                                        <Button sx={{ margin: "5px" }} variant="contained" >
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