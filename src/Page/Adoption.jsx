import React, {Component} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Adoption extends Component{

    constructor(props){
        super(props);
        this.state = {
            dog : JSON.parse(sessionStorage.getItem("dogObj")),
            open : false,
            oldUser:"",
        }
    }
    
    dogNameDisplay=()=>{
        if(this.state.dog.dogname === null){
            return "Not Available"
        }
        else{
            return this.state.dog.dogname
        }
    }

    dogVacDisplay=()=>{
        if(this.state.dog.vaccinationStatus === null){
            return "Unvaccinated"
        }
        else{
            return "Vaccinated"
        }
    }

    ownership=()=>{
        if(sessionStorage.getItem('userlogin') !== this.state.dog.owner.id.toString()){
            return true
        }
        else{
            return false
        }
    }

    handleClickOpen = () => {
        this.setState({open : true})
    }

    handleClose = () => {
        this.setState({open : false})
    }


    handleYes = async (userId, dogId) => {
        this.setState({open : false})
        await axios.post(`http://localhost:8080/adopt/${userId}/${dogId}`)
        .then(response => toast("Congratulations, you have adopted a new canine. You can check out the details in manage page."),{ type: "success" })
        .then(res=> axios.get("http://localhost:8080/sendMail"))
        .catch(e=>toast("Adoption failed",{ type: "error" }))
    }


    navigateToMap=()=>{
        this.props.navigate("/googleMap");
    }


    render() {

        const isNotYours = this.ownership()
            return(
                <div> 
                        <Card sx={{ maxWidth:1000 ,textAlign:'center', margin:'auto', background:'#eff9fa' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="h2" color="text.secondary">
                                Details Information
                                </Typography>
                                <br/>
                                <CardMedia
                                    component="img"
                                    sx={{height : 800, width : 900, margin:'auto', fit:"contain"}}
                                    image={decodeURIComponent(this.state.dog.dogURL)}
                                    alt="random"
                                />
                                <Typography sx={{ mb: 1.5}} color="text.secondary">
                                    {"Dog Breed : "} {this.state.dog.breed}
                                    <br />
                                    {"Dog Name : "} {this.dogNameDisplay()}
                                    <br/>
                                    {"Vaccination Status : "} {this.dogVacDisplay()}
                                    <br />
                                    {"Current Owner / Founder : "} {this.state.dog.owner.username}
                                </Typography>
                                <Typography variant="body2">
                                    {this.state.dog.dogDescription}
                                <br />
                            
                                </Typography>
                            </CardContent>
                            <CardActions >
                            {isNotYours && <Button variant="contained" size="large" sx={{margin:"auto"}} onClick={this.handleClickOpen} >Adopt Now</Button>}
                            <Button variant="contained" size="large" sx={{margin:"auto"}} onClick={this.navigateToMap} >Location found</Button>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                    {"Adoption Confirmation"}
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Are you sure that you want to take on the responsibilty to adopt and take care of this canine ? 
                                        <br />
                                        <strong>(Please take note that your personal information will be used to registered as the new owner)</strong>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={this.handleClose}>No, let me think again</Button>
                                    <Button onClick={()=>this.handleYes( sessionStorage.getItem('userlogin') ,this.state.dog.id)} autoFocus>Yes, i'm sure</Button>
                                    </DialogActions>
                                </Dialog>
                            </CardActions>
                    </Card>
                    <ToastContainer autoClose={1500} />
                </div>
            )
       
    }
}

export default Adoption
