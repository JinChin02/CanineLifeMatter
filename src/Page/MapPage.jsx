import React,{Component} from "react";
import HeaderWithNav from '../components/Header'
import Map from "../components/Map"

class MapPage extends Component{

    render(){
        return (<div><HeaderWithNav/><Map/></div>)
    }
}

export default MapPage;