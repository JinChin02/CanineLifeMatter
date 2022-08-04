import React, {Component} from "react";
import axios from "axios";
import HomeMainDisplay from "../components/HomeMainDisplay";
import HomeSearchDisplay from "../components/HomeSearchDisplay";
import HomeNotFound from "../components/HomeNotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Advert from "../components/Advert";
import WithNavigation from "../Utilities/WithNavigation";
import Authentication from "../Utilities/Authentication";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const HomeMainDisplayWithNav = WithNavigation(HomeMainDisplay);
const HomeSearchDisplayWithNav = WithNavigation(HomeSearchDisplay);

class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchString:'',
            returnedData:'',
            returnedStatus:0,
            open:false,
            dogList:null
        } 
    }

    componentDidMount(){
        if (Authentication.isLoggedIn()){
            axios.put("http://localhost:8080/CheckCleanUserPreviousDog/"+sessionStorage.getItem('userlogin'))
            .then((res)=>{
                if (res.data===null||res.data==""){
                    
                } else {
                    // toast("Your dogs "+res.data+" has been adopted",{type:"warning"});
                    this.setState({dogList:res.data})
                    this.handleOpen();
                }
            })
            .catch((res)=>console.log(res.message))
        }
    }


    handleSearch = async(event) =>{
        event.preventDefault();
        if(this.state.searchString.length === 0){
            // alert("Please fill in breed type to search")
            toast("Please fill in breed type to search",{type:"warning"})
        }
        else{
            await axios.post("http://localhost:8080/searchDog",this.state.searchString)
            .then(response=>{this.setState({returnedData:response.data, returnedStatus:response.status})})
            .catch(e=>this.setState({returnedStatus:404}))
        }
        
    }

    handleOpen = () => {
        this.setState({open : true})
    }
    
    handleClose = () => {
    this.setState({open : false})
        // sample shows lat and lng
    
    } 


    render(){
        
        
        return(
            <div>
                <div>
                    {/* <CardMedia component="img" sx={{height : 450 }} image={require('../images/strays.jpg')} alt="main"/> */}
                    <Grid container className='mainImage' sx={{minHeight:470}}>
                        <Grid item>
                            <Typography variant='h5' fontFamily={"monospace"} style={{color:'rgba(199, 192, 183, 0.5)',marginLeft:"3.9em", marginTop:"8em", marginBottom:'0.5em'}} align='left' >
                                Togather we can <br />
                                ________
                            </Typography>
                            <Typography variant='h3' fontFamily={"monospace"} style={{color:'rgba(199, 192, 183, 0.5)',marginLeft:"1.9em", marginBottom:'0.5em'}} align='left' >
                                BUILD A COMMUNITY OF LOVING AND CARE
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={3} wrap="nowrap" direction="row" justifyContent="center" alignItems="Top">

                    <Grid item ><Advert name="adImage1"/></Grid>
                    <Grid item xs={8} sx={{marginTop:2.5}}>
                    <div className="searchBody">
                        <form action="" onSubmit={this.handleSearch}>
                            <div className="abc">
                                <input type="text" name="searchString" className="searchBar" placeholder="Search here" 
                                    onChange={evt => this.setState({searchString: evt.target.value})} required/>
                                <button type="submit" name="submit" className="searchButton"  onClick={this.handleSearch} >GO !</button>
                            </div>
                        </form>
                    </div>

                    <div>
                        {this.state.returnedStatus===0 &&  <HomeMainDisplayWithNav/>} 
                        {this.state.returnedStatus===200 && <HomeSearchDisplayWithNav data={this.state.returnedData}/>} 
                        {this.state.returnedStatus===404 && <HomeNotFound/>}         
                    </div>

                    </Grid>
                    <Grid item ><Advert name="adImage2"/></Grid>
                </Grid>

                <ToastContainer autoClose={1000} />

                <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Notification"} </DialogTitle>
                      <DialogContent sx={{minWidth: 200, minHeight:50}}>
                       Your dogs {this.state.dogList} has been adopted!
                      </DialogContent>
                  </Dialog>
                
            </div>
        )
    }
}

export default HomePage