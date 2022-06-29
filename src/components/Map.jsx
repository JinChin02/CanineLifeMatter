import React,{Component} from "react";
import {GoogleMap,MarkerF,InfoWindow} from '@react-google-maps/api';
import HeaderWithNav from './Header'
import axios from "axios";

class Map extends Component{

    constructor(props){
        super(props)
        this.state = {
            location:{lat: 49.20348054635789*1 , lng: (-122.91076722885988)*1},
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
    console.log(id)
      this.setState({
        showingInfoWindow: id,
      })        
    };
    
    onInfoWindowClose = () =>{
    console.log("close");
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
        return (
            <div>   
                <HeaderWithNav/>         
                <GoogleMap  center={this.state.location}  zoom={13} mapContainerClassName="map-container" >
                <MarkerF key="user" size="large" position={this.state.userLocation}  icon={"https://www.robotwoods.com/dev/misc/bluecircle.png"} ></MarkerF> 
                
                {this.state.clinicObjArray.map((eachEle)=>
                <MarkerF key={eachEle.id} size="large" position={{lat:eachEle.lat , lng:eachEle.lng}} onClick={()=>this.onMarkerClick(eachEle.id)}>
                    {this.state.showingInfoWindow === eachEle.id && 
                    <InfoWindow position={{lat:eachEle.lat , lng:eachEle.lng}} onCloseClick={this.onInfoWindowClose}><>{eachEle.id}</></InfoWindow>}
                </MarkerF> 
                )}

                {this.state.dog!=null&&
                <MarkerF key={this.state.dog.id} size="large" position={{lat:this.state.dog.latitude*1 , lng:this.state.dog.longitude*1}} onClick={()=>this.onMarkerClick(this.state.dog.id)}
                icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656459823/dogIcon_pcveui.png" >
                    {this.state.showingInfoWindow === this.state.dog.id && 
                    <InfoWindow position={{lat:this.state.dog.latitude , lng:this.state.dog.longitude}} onCloseClick={this.onInfoWindowClose}><>{this.state.dog.dogname}</></InfoWindow>}
                </MarkerF> 
                }

                </GoogleMap>
            </div>
        )
    }
}

export default Map;