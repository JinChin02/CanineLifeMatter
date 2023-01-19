import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Map from "../components/Map";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ToastContainer, toast } from "react-toastify";

import userClickContext from "../context/userClickContext";

const DisplayImage = (props) => {

  const[image,addImage] = useState(null); 
  const [imageURL,setImageURL] = useState("https://res.cloudinary.com/dlbwhvhsg/image/upload/v1657219564/uploadLogo_eofgwl.png");
  const [open,setOpen] = useState(false);
  const [LocationIsChosen,setLocationIsChosen] =useState(false);
  const [file, setFile] = useState(null);

  const [DogNameInput,setDogNameInput] = useState("");
  const [DogDescInput,setDogDescInput] = useState("");
  const [DogVacInput,setDogVacInput] = useState("");
  const [DogBreedInput,setDogBreedInput] = useState("");
  const [buttonDisable,setbuttonDisable] = useState(false);

  

  const navigate = useNavigate();
  const userSelectedLocation = useContext(userClickContext);

  useEffect(()=>{
    if (sessionStorage.getItem("userlogin") === null) {
      setTimeout(() => {
        navigate('login');
      }, 0);
    }
    if (userSelectedLocation) {
      userSelectedLocation.current = null ;
    }
  },[])


  const uploadDog = (e) => {
    let location = userSelectedLocation.current;
    if (
      DogNameInput.replace(/^\s+|\s+$/gm, "") === "" ||
      DogNameInput.length === 0
    ) {
      toast("Please input a dog name", { type: "error" });
      return;
    } else if (location == null) {
      toast("Please select a place", { type: "error" });
      return;
    } else if (
      DogVacInput.replace(/^\s+|\s+$/gm, "") === "" ||
      DogVacInput.length === 0
    ) {
      toast("Please choose a vaccination state", { type: "error" });
      return;
    } else if (
      DogDescInput.replace(/^\s+|\s+$/gm, "") === "" ||
      DogDescInput.length === 0
    ) {
      toast("Please provide at least one dog description", { type: "error" });
      return;
    }

    // setbuttonDisable(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "DB4495");
    data.append("cloud_name", "dlbwhvhsg");

    axios
      .post("https://api.cloudinary.com/v1_1/dlbwhvhsg/image/upload", data)
      .then((res) => putDogIntoDatabase(res.data.secure_url))
      .catch((e) =>
        toast("Please select an image to upload or choose a smaller size", {
          type: "error",
        })
      );
  };

  const putDogIntoDatabase = (imageUrl) => {
    let currentUserID = sessionStorage.getItem("userlogin");
    let location = userSelectedLocation.current ;

    let dog = {
      dogname: DogNameInput,
      breed: DogBreedInput,
      longitude: location.lng,
      latitude: location.lat,
      vaccinationStatus: DogVacInput,
      dogDescription: DogDescInput,
      dogURL: imageUrl,
      isAdopted: 0,
    };

    axios
      .post("http://localhost:8080/uploadDog/dog/" + currentUserID, dog)
      .then((res) => {
        console.log(res.data);
        toast("Canine upload successful", { type: "true" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .then((res) => {
        setbuttonDisable(false);
      })
      .catch((e) => {
        console.log(e.message);
        setbuttonDisable(false);
      });
  };

  const setImage = (url) => {
    // let decodeURL= decodeURI(url);
    console.log(url.slice(0, -1));
    setImageURL(url.slice(0, -1));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (!userSelectedLocation.current) {
      setLocationIsChosen(true);
    }
  };

  // 這裡可以試著傳data 路徑
  const passData = (data) => {
    let img = data.target.files[0];
    var image = URL.createObjectURL(img);
    addImage(img);
    setImageURL(image);
  };

  const handleChangeVac = (event) => {
    setDogVacInput(event.target.value);
  };

  return (
    <div className="uploadPageBackGround">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop={7}
      >
        <Grid item>
          <h1>Upload Canine</h1>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        marginTop={10}
      >
        <Grid item>
          <Grid item>
            {" "}
            <input type="file" onChange={passData} />
          </Grid>
          <Grid item>
            <img
              width="400vw"
              height="300vh"
              src={imageURL}
              alt="no Pictue"
            />
          </Grid>
        </Grid>
        <Grid item justifyContent="center" alignItems="center">
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 2, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <Grid item>
              <TextField
                required
                label="dog name"
                id="dogUpload_dogname"
                placeholder="Dog name"
                onChange={(evt) => {
                  setDogNameInput(evt.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="dog description"
                id="dogUpload_description"
                placeholder="Dog Description"
                onChange={(evt) =>{
                  setDogDescInput(evt.target.value)
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="dog breed"
                id="dogUpload_breed"
                placeholder="Dog Breed"
                onChange={(evt) =>{
                  setDogBreedInput(evt.target.value );
                }}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Vaccination Status
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Vaccination Status"
                  value={DogVacInput}
                  onChange={handleChangeVac}
                >
                  <MenuItem
                    value="YES"      
                  >
                    YES
                  </MenuItem>
                  <MenuItem
                    value="NO"
                  >
                    NO
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleOpen}
                style={{ marginTop: "1vw", marginRight: "3vw" }}
              >
                choose location
              </Button>
              {LocationIsChosen && (
                <CheckBoxIcon
                  style={{
                    color: "green",
                    width: "5vh",
                    height: "5vh",
                    marginTop: "2vh",
                  }}
                />
              )}
            </Grid>
            <Grid item>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Pick a location where you found this canine"}{" "}
                </DialogTitle>
                <DialogContent sx={{ minWidth: 600, minHeight: 600 }}>
                  <Map />
                </DialogContent>
              </Dialog>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop={7}
      >
        <Grid item>
          <Button
            variant="contained"
            size="large"
            onClick={uploadDog}
            disabled={buttonDisable}
          >
            submit
          </Button>
        </Grid>
      </Grid>
      <br />
      <ToastContainer autoClose={1000} />
    </div>
  );
};
export default DisplayImage;
