import React, {useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import LoadinUploadPage from '../components/FloatingUploadBar'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

export default function Dashboard (){

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Controlled');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const submitComment = () => {
        setOpen(false);
        console.log(value);
    }

    return (
        <div>
            <div style={{ padding: 50 }} className="Comments">
                <h3>Comments</h3>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <Paper style={{ padding: "40px 20px", marginLeft: 50, marginTop: 20 , marginBottom: 10, backgroundColor:"rgba(0,0,0,0.1)"}}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item></Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                        </p>
                    </Grid>
                    </Grid>
                </Paper>
            </div>

            <div className='floatingBarPosition' onClick={handleClickOpen} >
                <LoadinUploadPage name={"Comment"} /> 
            </div> 

            <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose}>
                <TextField
                    id="outlined-multiline-static"
                    label="Leave Your Comment Here"
                    multiline
                    rows={5}
                    style={{width:860, marginLeft:20 , marginRight:20, marginTop:20, marginBottom:5}}
                    onChange={handleChange}
                />
                <DialogActions>
                    <Button style={{marginRight:10}} onClick={submitComment}>Comment</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}