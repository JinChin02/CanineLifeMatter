import React, {useState } from "react";
import StripeCheckout from 'react-stripe-checkout';     
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import axios from "axios";



export default function Donation() {

    const [amount, setAmount] = useState()
    const [product] = React.useState({
        name: "CLM NGO",
        description: "Support CLM"
    });

    const onAmountChange = (evt) => {
        const amountI = evt.target.value;
        if (!amountI || amountI.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(amountI)
        }
      
    }

     
    const handleToken = async (token) => {    
        const response = await axios.post("http://localhost:4000/donation",{amount,token})
        setAmount(0);
        const { status } = response.data;
        console.log("Response:", response.data);
        
        if (status === "success") {
            toast("Success! Thank you for your donation", { type: "success" });
            
        } else {
            toast("Something went wrong", { type: "error" });
        }

    }

    return(
        <div>
            <Grid container justifyContent='center'>
                <Grid item container direction='column' alignItems='center'  className='sign-up-form'>
                <Grid item>
                <Typography variant='h2' style={{color:'#F7FD04',marginBottom:'0.5em'}} align='center' >
                    Lets Make A Change Together!
                </Typography>
                </Grid>
                <Grid item >
                    <Typography variant='subtitle1' style={{color:'#FBF6F0',marginBottom:'0.5em'}} align='center'>
                    Giving is not just about making a donation,
                    its about making difference.
                    </Typography>
                    <Typography  align='center' variant='subtitle1' style={{color:'#FBF6F0',marginBottom:'0.5em'}} >
                    Any help or donation,
                    no matter how small or big,
                    will be deeply appreciated and is much needed.
                    </Typography>
                </Grid>
                <Grid item>
                <Typography variant='h4' style={{color:'#FBF6F0',marginBottom:'0.5em'}} >
                    Enter The amount you want to donate
                </Typography>
                </Grid>
                <Grid item>
                <form >
                    <label>
                        <input type="text" name="name" value={amount} onChange={onAmountChange}/>
                    </label>
                </form>
                </Grid>
                <Grid item>
                <StripeCheckout 
                    stripeKey='pk_test_51LGoqIEuGrCFXQM1mDVCGqHspxgVK56LRlw5w1Ln9D9dut9XatpOibNjeE6tsi0efWdbBXowzLCHkVx1kEyw13D2008e1C9dDI'
                    token={handleToken}
                    amount={amount}
                    name="CLM NGO"
                    billingAddress
                    
                >
                <Button variant='contained' style={{backgroundColor:'#DA0037'}}>
                    <Typography variant='h6' style={{color:'#EDEDED'}}> Donate Now</Typography>
                </Button>
                </StripeCheckout>
                </Grid>
                </Grid>
            </Grid>
            <ToastContainer autoClose={1000} />
        </div>
    )

}