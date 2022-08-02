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
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom";
import Authentication from "../Utilities/Authentication";
import { ToastContainer,toast } from 'react-toastify';
import { margin, padding } from "@mui/system";

export default function Dashboard (){

    const [comments, setComments] = useState("");
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Controlled');

    const navigate = useNavigate();

    const handleClickOpen = () => {
        if (Authentication.isLoggedIn()){
            setOpen(true);
        }else {
            toast("Please login to comment", { type: "warning" }) 
            setTimeout(()=>{navigate("/login",{replace:false})},1500);
        }
    };
    
    const handleClose = () => {
        setOpen(false);
        setValue("");
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const submitComment = () => {
        setOpen(false);
        // value = comment;
        if (value !==""&&value!=="Controlled"){
            const d = new Date();
            let text = d.toString();
            let _date = text.slice(4,16);
            let _time = text.slice(16,24);
            let userID =sessionStorage.getItem('userlogin');
            
            const commentObj= {
                description:value,
                date:_date,
                time:_time
            }

            axios.post(`http://localhost:8080/bulletins/${userID}`,commentObj)
            .then((res)=>console.log(res.data));
        }
        setValue("");
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
                 <Typography gutterBottom variant="h3" component="h2" style={{marginLeft:20, marginTop:30, fontWeight:"bold"}}>
                                Bulletin Board
                </Typography> 
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {comments.length!=0&& comments.map((comment)=>{
                        // <DashboardElement key={comment.id} userComment={comment} />
                        return (
                            <div key={comment.id}>
                                <Paper style={{ padding: "30px 10px 10px 10px", marginLeft: 50, marginTop: 30, marginRight:30, backgroundColor:"rgba(0,0,0,0.2)"}}>
                                    <Grid container wrap="nowrap" spacing={2} style={{ paddingRight:50}}>
                                        <Grid justifyContent="left" item xs zeroMinWidth style={{paddingLeft:60}}>
                                            <h4 style={{ margin: 0, textAlign: "left" }}>@ {comment.owner.username}</h4>
                                            <Divider variant="fullWidth" style={{ margin: "10px 0" }}/>
                                            <p style={{ textAlign: "left" ,marginTop:20}}>
                                            {comment.description}
                                            </p>
                                            <p style={{ textAlign: "right", color: "gray",paddingRight:20 }}>
                                            Posted on {comment.date} ({comment.time})
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                        
                            </div>
                          )}
                    )}    
                </Grid>

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
                <ToastContainer autoClose={1500}/>       
            </div>
        )
    }

}