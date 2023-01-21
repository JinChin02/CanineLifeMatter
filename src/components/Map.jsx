import React, { useState, useEffect, useContext, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindow,
  Rectangle,
} from "@react-google-maps/api";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LoadingPage from "../components/Loading";
import dogContext from "../context/dogContext";
import { Button } from "@mui/material";
import userClickContext from "../context/userClickContext";

const Map = (props) => {
  // original center
  const [location, setLocation] = useState(null);
  const [clinicObjArray, setClinicArray] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(0);
  const [dogs, setDogs] = useState(null);

  // user Location
  const [userLocation, setuUserLocation] = useState(null);
  const [clickLocation, setClickLoaction] = useState("");

  // dog load location renew
  const [userScrollLocaiotn, setScrollLocation] = useState(null);
  // const [openShowAllDogs, setOpenShowAllDogs] = useState(false);

  // test
  const [showFindDogsButton, setShowFindDogsButton] = useState(true);

  const mapRef = useRef(null);

  let selecteddog = useContext(dogContext);
  let userSelectedLocation = useContext(userClickContext);

  useEffect(() => {
    getUserLocation();
    getDogLoaciton();
    getAllMarkerLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lati = position.coords.latitude;
        let lngi = position.coords.longitude;
        setuUserLocation({ lat: lati, lng: lngi });
        if (selecteddog.current == null) {
          setLocation({ lat: lati, lng: lngi });
          setScrollLocation({ lat: lati, lng: lngi });
        }
      });
    } else {
      alert("GEO is not supported in this browser");
    }
  };

  const getDogLoaciton = () => {
    if (selecteddog.current != null) {
      let dogObj = selecteddog.current;
      let dogArray = new Array(dogObj);
      setDogs(dogArray);

      setLocation({ lat: dogObj.latitude, lng: dogObj.longitude });
      setScrollLocation({ lat: dogObj.latitude, lng: dogObj.longitude });
    }
  };

  const getAllMarkerLocation = async () => {
    await axios
      .get("http://localhost:8080/clinic")
      .then((res) => setClinicArray(res.data));
  };

  const onMarkerClick = (id) => {
    setShowingInfoWindow(id);
  };

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
  };

  const onMapClick = (e) => {
    setClickLoaction({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    userSelectedLocation.current = { lat: e.latLng.lat(), lng: e.latLng.lng() };
  };

  const clearDog = () => {
    setDogs(null);

    selecteddog.current = null;
  };

  const handleCenterChanged = (e) => {
    setShowFindDogsButton(true);
  };

  const MaphandleOnLoad = (mapInfo) => {
    mapRef.current = mapInfo;
  };

  const showNearDogs = () => {
    setShowFindDogsButton(false);
    console.log(
      mapRef.current.center.lat() + " + " + mapRef.current.center.lng()
    );

    //fetch data only when setScreenCenterLocation up to 500km (in the backend, update data every 0.5 degree)
    axios
      .get(
        `http://localhost:8080/searchDogs/${mapRef.current.center.lat()}/${mapRef.current.center.lng()}`
      )
      .then((res) => setDogs(res.data))
      .catch((err) => console.log(err));
  };

  // return part
  if (clinicObjArray.length === 0) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
    const google = window.google;
    return (
      // <div style={componentSize} >
      <div className="center">
        <GoogleMap
          bounds={(e) => console.log(e)}
          center={location}
          zoom={13}
          mapContainerClassName="map-container"
          onClick={onMapClick}
          onCenterChanged={handleCenterChanged}
          onIdle={() => {
            console.log("idle");
          }}
          onLoad={MaphandleOnLoad}
          LatLngBounds={(e) => console.log(e)}
        >
          <br />
          {showFindDogsButton && (
            <Button variant="contained" onClick={showNearDogs}>
              Find All dogs near this area
            </Button>
          )}

          <MarkerF
            key="user"
            size="large"
            position={userLocation}
            icon={"https://www.robotwoods.com/dev/misc/bluecircle.png"}
          ></MarkerF>
          {clickLocation !== "" && (
            <MarkerF
              key={"selectedLocation"}
              size="large"
              position={clickLocation}
            ></MarkerF>
          )}
          {clinicObjArray.map((eachEle) => (
            <MarkerF
              key={eachEle.id}
              size="large"
              position={{ lat: eachEle.lat, lng: eachEle.lng }}
              onClick={() => onMarkerClick(eachEle.id)}
              icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656696738/hos_Icon-removebg_small_lkarnz.png"
            >
              {showingInfoWindow === eachEle.id && (
                <div>
                  <InfoWindow
                    position={{ lat: eachEle.lat, lng: eachEle.lng }}
                    onCloseClick={onInfoWindowClose}
                  >
                    <Card sx={{ minWidth: 275, maxWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
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
                </div>
              )}
            </MarkerF>
          ))}

          {dogs != null &&
            dogs.map((dog) => (
              <MarkerF
                key={dog.id}
                size="large"
                position={{ lat: dog.latitude * 1, lng: dog.longitude * 1 }}
                onClick={() => onMarkerClick(dog.id)}
                icon="https://res.cloudinary.com/dlbwhvhsg/image/upload/v1656459823/dogIcon_pcveui.png"
              >
                {showingInfoWindow === dog.id && (
                  <InfoWindow
                    position={{ lat: dog.latitude, lng: dog.longitude }}
                    onCloseClick={onInfoWindowClose}
                  >
                    <Card sx={{ minWidth: 275, maxWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
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
                  </InfoWindow>
                )}
              </MarkerF>
            ))}
        </GoogleMap>
        <br />
        {dogs && (
          <Button variant="contained" onClick={clearDog}>
            Clean dogs
          </Button>
        )}
      </div>
    );
  }
};

export default Map;
