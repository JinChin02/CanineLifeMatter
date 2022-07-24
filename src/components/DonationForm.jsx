import React, {useState } from "react";
import axios from "axios";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CARD_ELEMENT_OPTIONS = {
    iconStyle : "solid",
    style: {
        base: {
            iconColor : "c4f0ff",
            backgroundColor : "#f0fcff",
            color: "#32325d",
            fontFamily: 'Monospace',
            fontSmoothing: "antialiased",
            fontSize: "25px",
            "::placeholder": {
                color: "#32325d"
            }
        },
        invalid: {
          fontFamily: 'Monospace',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
};

export default function DonationForm(){

    const [amount,setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    
    const onAmountChange = (evt) => {
        const amount = evt.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(amount)
        }
      
    }

    const handleClickOpen = () => {   
        if(amount === 0 ){
            toast("Please input an amount if you really wish to donate",{type:"warning"})
        }
        else{
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        }) 

        if(!error){
            setOpen(false)
            try{
                const {id} = paymentMethod
                const response = await axios.post("https://pay-node-server.herokuapp.com/donation", {
                    amount,
                    id
                })

                if(response.data.success){ 
                    toast("Success! Thank you for your donation", { type: "success" })
                }
                else{
                    toast("Something went wrong", { type: "error" })
                }
            }
            catch (error){
                console.log("Error", error)      
            }
        }else{
            
            console.log(error.message)
        }
    }

    return (
        <div>
            <div>
                <Grid container className='donateBack' justifyContent='center' sx={{minHeight:750, minWidth:1050}}>
                    <Grid item container direction='column' alignItems='center' height='35em' >
                        <Grid item>
                            <Typography variant='h4' style={{color:'#fff7ec', marginTop:"1em", marginBottom:'0.5em'}} align='left' >
                                DONATE AND HELP SAVE LIVES
                                <hr />
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography width={900} align='left' textAlign='justify' variant='subtitle1' 
                                        style={{color:'#fff7ec',marginBottom:'0.5em'}} >
                                When you support us you're concomitantly saving lives. 
                                Every dollar you donate to Canine Life Matter is used for spaying, neutering and vaccinations.
                                <br />
                                <br />
                                Every canine that is taken care by our volunteers are never released to adopter until it has been 
                                sterelized. Your donation will also be used for extra veterinary care, food, supplies and micro-chipping
                                <br />
                                <br />
                                As a non-profit, non-compromise, we rely on the support of owners and donors. Your generous donation means the 
                                difference between life and death for many. Thank you so much for donating. 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6' style={{color:'#fff7ec',marginBottom:'0.5em'}} >
                                <br />
                                Enter the amount you wish to donate
                            </Typography>
                        </Grid>
                        <Grid item>
                            <form  >
                                <Typography variant='h7' style={{color:'#fff7ec',marginBottom:'0.5em'}}> 
                                <input type="text" name="name" value={amount} onChange={onAmountChange} required/> CAD</Typography>
                            </form>
                            <br />
                        </Grid>
                        <Grid item>
                            <Button variant='contained' style={{backgroundColor:'#ceffdb'}} onClick={handleClickOpen}>
                                <Typography variant='h7' style={{color:'#5f5f5f'}}> Donate Now</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"DONATION FOR CLM NGO"}
                    </DialogTitle>
                    <DialogContent>
                        <form id="payment-form" onSubmit={handleSubmit}>
                            <CardElement options={CARD_ELEMENT_OPTIONS}/>   
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={handleSubmit} autoFocus>DONATE</Button>
                    </DialogActions>
                </Dialog>
               
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
    
}