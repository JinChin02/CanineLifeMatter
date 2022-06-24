import React,{Component} from "react";
import {GoogleMap,MarkerF} from '@react-google-maps/api';
import HeaderWithNav from './Header'
import axios from "axios";

class Map extends Component{

    constructor(props){
        super(props)
        this.state = {
            location:{lat: 49.20348054635789*1 , lng: (-122.91076722885988)*1},
            clinicObjArray:[]
        }
    }

    async componentDidMount(){
    await this.getAllMarkerLocation();
    await this.getUserLocation();

    console.log(this.state.clinicObjArray);
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
                    location:{lat:lati,lng:lngi}
                })
            })

        }else {
            alert("GEO is not supported in this browser");
        }
    }

    
    render(){
        return (
            <div>   
                <HeaderWithNav/>         
                <GoogleMap  center={this.state.location}  zoom={13} mapContainerClassName="map-container" >
                <MarkerF key="user" size="large" position={this.state.location} label="User" ></MarkerF> 
                {this.state.clinicObjArray.map((eachEle)=>
                <MarkerF key={eachEle.id} size="large" position={{lat:eachEle.lat , lng:eachEle.lng}} label={eachEle.name}></MarkerF> 
                )}
                </GoogleMap>
            </div>
        )
    }
}

export default Map;