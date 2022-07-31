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



class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchString:'',
            returnedData:'',
            returnedStatus:0
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

    someFunction = () => {
        if (this.state.returnedStatus === 200){
            return <HomeSearchDisplay data={this.state.returnedData}/>
        }
        else if (this.state.returnedStatus===404){
            return <HomeNotFound />
        }
        else if (this.state.returnedStatus===0){
            return <HomeMainDisplay/>       
        }
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
                        {this.someFunction()}             
                    </div>

                    </Grid>
                    <Grid item ><Advert name="adImage2"/></Grid>
                </Grid>

                
                <ToastContainer autoClose={1000} />
                
            </div>
        )
    }
}

export default HomePage