import { NavLink, Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const NavBar = () => {


    return (

        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/" >
                                Weather Forecast
                            </NavLink>
                        </Typography>
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
                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    )
}