import React, {useState,useEffect} from "react";
import Divider from "@mui/material/Divider";
import LoadingPage from "../components/Loading";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";

import LoadinUploadPage from '../components/FloatingUploadBar'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

export default function Dashboard (){

    const [comments, setComments] = useState("");

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

    useEffect(() => {
        axios.get("http://localhost:8080/bulletins")
        .then((res)=>setComments(res.data));
    });


    if (comments == ""){
            return (<LoadingPage/>);
    } else {
        return (
            <div>
                <div style={{ padding: 50 }} className="Comments">
                    <h3>Comments</h3>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }}/>
                    {comments.length!=0&& comments.map((comment)=>{
                        // <DashboardElement key={comment.id} userComment={comment} />
                        return (
                            <div key={comment.id}>
                                <Paper style={{ padding: "40px 20px", marginLeft: 50, marginTop: 20 , marginBottom: 10, backgroundColor:"rgba(0,0,0,0.1)"}}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item></Grid>
                                        <Grid justifyContent="left" item xs zeroMinWidth>
                                            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.owner.username}</h4>
                                            <p style={{ textAlign: "left" }}>
                                            {comment.description}
                                            </p>
                                            <p style={{ textAlign: "left", color: "gray" }}>
                                            Posted on {comment.date} ({comment.time})
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                        
                            </div>
                          )}
                    )}
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

}