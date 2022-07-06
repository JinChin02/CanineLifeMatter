import React,{Component} from "react";
import {GoogleMap,MarkerF,InfoWindow} from '@react-google-maps/api';
import HeaderWithNav from '../components/Header'
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingPage from "../components/Loading";


class Map extends Component{

    constructor(props){
        super(props)
        this.state = {
            location:null,
            clinicObjArray:[],
            showingInfoWindow: 0,
            dog:"",
            userLocation:null,
        }
    }

    async componentDidMount(){
        await this.getUserLocation(); 
        await this.getDogLoaciton();  
        await this.getAllMarkerLocation();
    }


    getAllMarkerLocation= async()=>{
        await axios.get("http://localhost:8080/clinic")
        .then((res)=>this.setState({
            clinicObjArray:res.data
        }));
    }

    getUserLocation=()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                let lati =  position.coords.latitude;
                let lngi = position.coords.longitude;
                this.setState({
                    userLocation:{lat:lati,lng:lngi}
                })
                if (sessionStorage.getItem("dogObj")==null){
                    this.setState({
                        location:{lat:lati,lng:lngi}
                    })
                }
            })

        }else {
            alert("GEO is not supported in this browser");
        }
    }

  
    onMarkerClick = (id) => {
      this.setState({
        showingInfoWindow: id,
      })        
    };
    
    onInfoWindowClose = () =>{
        this.setState({
          showingInfoWindow: false
        });
    }

    getDogLoaciton=()=>{
        if (sessionStorage.getItem("dogObj")!=null){
            let dogObj = JSON.parse(sessionStorage.getItem("dogObj"));
            this.setState({
                dog:dogObj,
                location:{lat: dogObj.latitude*1 , lng: dogObj.longitude*1}
            })
            
        }
        
    }

    render(){
        if (this.state.clinicObjArray.length===0 ){
            return (  <div><LoadingPage/></div>);
        } else 
        return (
            <div>     
                <GoogleMap  center={this.state.location}  zoom={13} mapContainerClassName="map-container" >
                <MarkerF key="user" size="large" position={this.state.userLocation}  icon={"https://www.robotwoods.com/dev/misc/bluecircle.png"} ></MarkerF> 
                
                {this.state.clinicObjArray.map((eachEle)=>
                <MarkerF key={eachEle.id} size="large" position={{lat:eachEle.lat , lng:eachEle.lng}} onClick={()=>this.onMarkerClick(eachEle.id)} icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656696738/hos_Icon-removebg_small_lkarnz.png">
                    {this.state.showingInfoWindow === eachEle.id && 
                    <InfoWindow position={{lat:eachEle.lat , lng:eachEle.lng}} onCloseClick={this.onInfoWindowClose}>
                    <Card sx={{ minWidth: 275, maxWidth: 275}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Hospital name: 
                        </Typography>
                        <Typography variant="h5" component="div">
                        {eachEle.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {eachEle.address}
                        </Typography>
                        <Typography variant="body2">
                        {eachEle.description}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                    </Card>    
                    </InfoWindow>}
                </MarkerF> 
                )}

                {this.state.dog!=null&&
                <MarkerF key={this.state.dog.id} size="large" position={{lat:this.state.dog.latitude*1 , lng:this.state.dog.longitude*1}} onClick={()=>this.onMarkerClick(this.state.dog.id)}
                icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656459823/dogIcon_pcveui.png" >
                    {this.state.showingInfoWindow === this.state.dog.id && 
                    <InfoWindow  position={{lat:this.state.dog.latitude , lng:this.state.dog.longitude}} onCloseClick={this.onInfoWindowClose}>
                        <Card sx={{ minWidth: 275, maxWidth: 275}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Dog name: 
                                </Typography>
                                <Typography variant="h5" component="div">
                                {this.state.dog.dogname}
                                </Typography>
                                <Typography sx={{ mb: 0.6 }} color="text.secondary">
                                Breed: {this.state.dog.breed}
                                </Typography>
                                <Typography variant="body2">
                                {this.state.dog.dogDescription}
                                </Typography>
                            </CardContent>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={decodeURIComponent(this.state.dog.dogURL)}
                                    alt="Paella dish"
                                />
                        </Card>    
                    </InfoWindow>}
                </MarkerF> 
                }

                </GoogleMap>
            </div>
        )
    }
}

export default Map;