import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import dogContext from "../context/dogContext";
import { useContext } from "react";

const Adoption = (props) => {

  const selectedDog = useContext(dogContext);

  // const [dog, setDog] = useState(JSON.parse(sessionStorage.getItem("dogObj")));
  const [open, setOpen] = useState(false);
  const [oldUser, setOldUser] = useState("");

  const navigate = useNavigate();

  const dogNameDisplay = () => {
    if (selectedDog.current.dogname === null) {
      return "Not Available";
    } else {
      return selectedDog.current.dogname;
    }
  };

  const dogVacDisplay = () => {
    if (selectedDog.current.vaccinationStatus === null) {
      return "Unvaccinated";
    } else {
      return "Vaccinated";
    }
  };

  const ownership = () => {
    if (sessionStorage.getItem("userlogin") !== selectedDog.current.owner.id.toString()) {
      return true;
    } else {
      return false;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async (userId, dogId) => {
    setOpen(false);
    await axios
      .post(`http://localhost:8080/adopt/${userId}/${dogId}`)
      .then(
        (response) =>
          toast(
            "Congratulations, you have adopted a new canine. You can check out the details in manage page."
          ),
        { type: "success" }
      )
      .then((res) => axios.get("http://localhost:8080/sendMail"))
      .catch((e) => toast("Adoption failed", { type: "error" }));
  };

  const navigateToMap = () => {
    // props.navigate("/googleMap");
    navigate("/googleMap");
  };

  console.log(selectedDog.current)
  
  // this is to prevet error from nothing in dogcontext.current
  if (selectedDog.current==null){
    navigate('/');
  } else {
    const isNotYours = ownership();
    return (
      <div>
        <Card
          sx={{
            maxWidth: 1000,
            textAlign: "center",
            margin: "auto",
            background: "#eff9fa",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              color="text.secondary"
            >
              Details Information
            </Typography>
            <br />
            <CardMedia
              component="img"
              sx={{ height: 800, width: 900, margin: "auto", fit: "contain" }}
              image={decodeURIComponent(selectedDog.current.dogURL)}
              alt="random"
            />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Dog Breed : "} {selectedDog.current.breed}
              <br />
              {"Dog Name : "} {dogNameDisplay()}
              <br />
              {"Vaccination Status : "} {dogVacDisplay()}
              <br />
              {"Current Owner / Founder : "} {selectedDog.current.owner.username}
            </Typography>
            <Typography variant="body2">
              {selectedDog.current.dogDescription}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            {isNotYours && (
              <Button
                variant="contained"
                size="large"
                sx={{ margin: "auto" }}
                onClick={handleClickOpen}
              >
                Adopt Now
              </Button>
            )}
            <Button
              variant="contained"
              size="large"
              sx={{ margin: "auto" }}
              onClick={()=>navigateToMap()}
            >
              Location found
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Adoption Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure that you want to take on the responsibilty to adopt
                  and take care of this canine ?
                  <br />
                  <strong>
                    (Please take note that your personal information will be used
                    to registered as the new owner)
                  </strong>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No, let me think again</Button>
                <Button
                  onClick={() =>
                    handleYes(sessionStorage.getItem("userlogin"), selectedDog.current.id)
                  }
                  autoFocus
                >
                  Yes, i'm sure
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }

  
 
};

export default Adoption;
