import { useDispatch } from "react-redux"
import { removeError } from "../../actions/uiActions"
import { Box } from "@mui/system"
import { Dialog, DialogContent, Typography, DialogTitle } from "@mui/material"


export const AlertDialogComponent = ({ error }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(removeError())
    }

    return (

        <Box
            className="animate__animated animate__fadeIn animate__delay-0.5s"
            sx={{
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
                    <img
                        className="animate__animated animate__fadeIn animate__delay-0.5s"
                        style={{ width: "100px", height: "100px", borderRadius: "10%", marginTop: "10px" }}
                        src={process.env.PUBLIC_URL + `./assets/smallLogo.png`}
                        alt="logo icon" />
                </Box>
                <DialogContent >
                    <DialogTitle >
                        {`Something Went Wrong :(`}
                    </DialogTitle>
                    <Typography variant='h5' align='center' gutterBottom>
                        {error}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    )
}