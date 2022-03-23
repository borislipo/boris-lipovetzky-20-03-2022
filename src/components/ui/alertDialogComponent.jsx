import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import { setError, removeError } from "../../actions/uiActions"
import { Box } from "@mui/system"
import { Dialog, DialogContent, DialogActions, Typography, Button, DialogTitle } from "@mui/material"
import { Error } from "@mui/icons-material"


export const AlertDialogComponent = ({error}) => {
   const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(removeError())
    }

    return (

        <Box sx={{
            padding: 2,
            border: 4,
        }}>
            <Dialog open
                onClose={handleClose}
            >
                <Box
                container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                >
                    <img style={{width:"100px", height:"100px"}}
                    src={process.env.PUBLIC_URL + `assets/smallLogo.png`} 
                    alt="logo icon" />
                </Box>
                <DialogContent >
                    <DialogTitle >
                       { `Something Went Wrong :(`}
                    </DialogTitle>
                    <Typography variant='h5' align='center' gutterBottom>
                        {error}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    )
}