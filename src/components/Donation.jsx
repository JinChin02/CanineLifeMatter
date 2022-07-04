import React,{Component} from "react";
import HeaderWithNav from './Header';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import axios from "axios";

class Donation extends Component{

    constructor(props){
        super(props)
        this.state = {
            inputAmount:'',
            // productDefault:{name :"CLM NGO", descirption:"Support CLM"},
            status:''
        } 
    }

    onAmountChange = (evt) => {
        const a = evt.target.value;
        if (!this.state.inputAmount || this.state.inputAmount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState({inputAmount : a})
        }
    }
     
    handleToken = async (token) => {
        // const product =  this.state.productDefault
        const amount = this.state.inputAmount
        
        const response = await axios.post("https://arcane-bastion-09939.herokuapp.com/checkout/",{token,amount})
        this.setState({inputAmount:0})
        this.setState({status : response.data})
        console.log("Response " , response.data)
        
        if (this.state.status === "success") {
            toast("Success! Thank you for your donation", { type: "success" });
            
        } else {
            toast("Something went wrong", { type: "error" });
        }

    }

    render(){
        return(
            <div>
                <HeaderWithNav/>
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
                            <input type="text" name="name" value={this.state.inputAmount} onChange={this.onAmountChange}/>
                        </label>
                    </form>
                    </Grid>
                    <Grid item>
                    <StripeCheckout 
                        stripeKey='pk_test_51LGoqIEuGrCFXQM1mDVCGqHspxgVK56LRlw5w1Ln9D9dut9XatpOibNjeE6tsi0efWdbBXowzLCHkVx1kEyw13D2008e1C9dDI'
                        token={this.handleToken}
                        amount={this.state.inputAmount * 100}
                        name="CLM NGO"
                        
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

}

export default Donation;