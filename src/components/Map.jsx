import React,{Component} from "react";
import {GoogleMap,MarkerF} from '@react-google-maps/api';
import HeaderWithNav from './Header'

class Map extends Component{

    constructor(props){
        super(props)
        this.state = {
            location:{lat: 49.20348054635789*1 , lng: (-122.91076722885988)*1},
        }
    }
    render(){
        return (
            <div>   
                <HeaderWithNav/>         
                <GoogleMap  center={this.state.location}  zoom={17} mapContainerClassName="map-container" >
                <MarkerF size="large" position={this.state.location} label="hello"></MarkerF> </GoogleMap>
            </div>
        )
    }
}

export default Map;