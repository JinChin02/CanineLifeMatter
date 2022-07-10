import React, { useState,useEffect} from 'react'
import {GoogleMap,MarkerF,InfoWindow} from '@react-google-maps/api';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingPage from "../components/Loading";



 function Map (props){


    const [location,setLocation]=useState(null);
    const [clinicObjArray,setClinicArray]=useState([]);
    const [showingInfoWindow,setShowingInfoWindow]=useState(0);
    const [dog,setDog]=useState("");
    const [userLocation,setuUserLocation]=useState(null);
    const [clickLocation, setClickLoaction]= useState("");

       
    useEffect(()=>{
        getUserLocation(); 
        getDogLoaciton();  
        getAllMarkerLocation();
    },[]);

    const getUserLocation=()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                let lati =  position.coords.latitude;
                let lngi = position.coords.longitude;
                setuUserLocation({lat:lati,lng:lngi});
                if (sessionStorage.getItem("dogObj")==null){
                    setLocation({lat:lati,lng:lngi})
                }
            })

        }else {
            alert("GEO is not supported in this browser");
        }
    }

    const getDogLoaciton=()=>{
        if (sessionStorage.getItem("dogObj")!=null){    
            let dogObj = JSON.parse(sessionStorage.getItem("dogObj"));
            setDog(dogObj);
            setLocation({lat: dogObj.latitude , lng: dogObj.longitude});     
        }
        
    }



    const getAllMarkerLocation= async()=>{
        await axios.get("http://localhost:8080/clinic")
        .then((res)=>setClinicArray(res.data));
    }

    

  
    const onMarkerClick = (id) => {
        setShowingInfoWindow(id);
    };
    
    const onInfoWindowClose = () =>{
        setShowingInfoWindow(false);
    }

    const onMapClick=(e)=>{
        setClickLoaction({lat:e.latLng.lat() , lng:e.latLng.lng()});
    }
 

   
    // return part 
    if (clinicObjArray.length===0 ){
        return (<div><LoadingPage/></div>);
    } else 
    {   const google = window.google;
        return (
            <div> 
                <GoogleMap  center={location}  zoom={13} mapContainerClassName="map-container" onClick={onMapClick}>
                <MarkerF key="user" size="large" position={userLocation}  icon={"https://www.robotwoods.com/dev/misc/bluecircle.png"} ></MarkerF> 
                {clickLocation!=="" && <MarkerF key={"selectedLocation"} size="large" position={clickLocation}></MarkerF>}
                {clinicObjArray.map((eachEle)=>
                <MarkerF key={eachEle.id} size="large" position={{lat:eachEle.lat , lng:eachEle.lng}} onClick={()=>onMarkerClick(eachEle.id)} icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656696738/hos_Icon-removebg_small_lkarnz.png">
                    {showingInfoWindow === eachEle.id && 
                    <div>
               
                    <InfoWindow position={{lat:eachEle.lat , lng:eachEle.lng}} onCloseClick={onInfoWindowClose}>
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
                    </Card>    
                    </InfoWindow>
                    </div>}
                </MarkerF> 
                )}

                {dog!=null&&
                <MarkerF key={dog.id} size="large" position={{lat:dog.latitude*1,lng:dog.longitude*1}} onClick={()=>onMarkerClick(dog.id)}
                icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656459823/dogIcon_pcveui.png" >
                    {showingInfoWindow === dog.id && 
                    <InfoWindow  position={{lat:dog.latitude , lng:dog.longitude}} onCloseClick={onInfoWindowClose}>
                        <Card sx={{ minWidth: 275, maxWidth: 275}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Dog name: 
                                </Typography>
                                <Typography variant="h5" component="div">
                                {dog.dogname}
                                </Typography>
                                <Typography sx={{ mb: 0.6 }} color="text.secondary">
                                Breed: {dog.breed}
                                </Typography>
                                <Typography variant="body2">
                                {dog.dogDescription}
                                </Typography>
                            </CardContent>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={decodeURIComponent(dog.dogURL)}
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

export default Map