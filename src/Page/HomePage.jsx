import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeNotFound from "../components/HomeNotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Advert from "../components/Advert";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import MainDisplay from "../components/MainDisplay";
import Authentication from "../Utilities/Authentication";

const HomePage = () => {
  const [searchString, setSearchString] = useState("");
  const [returnedData, setReturnedData] = useState(null);
  const [returnedStatus, setReturnedStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [dogList, setDogList] = useState(null);

  useEffect(() => {
    if (Authentication.isLoggedIn()) {
      axios
        .put(
          "http://localhost:8080/CheckCleanUserPreviousDog/" +
            sessionStorage.getItem("userlogin")
        )
        .then((res) => {
          if (res.data === null || res.data == "") {
          } else {
            setDogList(res.data);
            handleOpen("OPEN");
          }
        })
        .catch((res) => console.log(res.message));
    }
  }, []);

  const handleSearch = (event) => {
    // event.preventDefault();
    if (searchString.length === 0) {
      toast("Please fill in breed type to search", { type: "warning" });
    } else {
      axios
        .post("http://localhost:8080/searchDog", searchString)
        .then((res) => {
          setReturnedData([...res.data]);
          setReturnedStatus(res.status);
        })
        .catch((e) => setReturnedStatus(404));
    }
  };

  const handleOpen = (isOpen) => {
    switch (isOpen) {
      case "OPEN":
        setOpen(true);
        break;
      case "CLOSED":
        setOpen(false);
        break;
    }
  };

  return (
    <div>
      <div>
        {/* <CardMedia component="img" sx={{height : 450 }} image={require('../images/strays.jpg')} alt="main"/> */}
        <Grid container className="mainImage" sx={{ minHeight: 470 }}>
          <Grid item>
            <Typography
              variant="h5"
              fontFamily={"monospace"}
              style={{
                color: "rgba(199, 192, 183, 0.5)",
                marginLeft: "3.9em",
                marginTop: "8em",
                marginBottom: "0.5em",
              }}
              align="left"
            >
              Togather we can <br />
              ________
            </Typography>
            <Typography
              variant="h3"
              fontFamily={"monospace"}
              style={{
                color: "rgba(199, 192, 183, 0.5)",
                marginLeft: "1.9em",
                marginBottom: "0.2em",
              }}
              align="left"
            >
              BUILD A COMMUNITY OF LOVING AND CARE
            </Typography>
            <Typography
              variant="h6"
              fontFamily={"monospace"}
              style={{
                color: "rgba(199, 192, 183, 0.25)",
                marginLeft: "1.9em",
                marginBottom: "0.5em",
              }}
              align="right"
            >
              Adopt instead of buying
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Grid
        container
        spacing={3}
        wrap="nowrap"
        direction="row"
        justifyContent="center"
        alignItems="Top"
      >
        <Grid item>
          <Advert name="adImage1" />
        </Grid>
        <Grid item xs={8} sx={{ marginTop: 2.5 }}>
          <div className="searchBody">
            <form action="" onSubmit={handleSearch}>
              <div className="abc">
                <input
                  type="text"
                  name="searchString"
                  className="searchBar"
                  placeholder="Search by breed"
                  onChange={(evt) => {
                    setSearchString(evt.target.value);
                  }}
                  required
                />
                <button
                  type="button"
                  name="submit"
                  className="searchButton"
                  onClick={handleSearch}
                >
                  GO !
                </button>
              </div>
            </form>
          </div>
          <div>
            {returnedStatus === 0 && <MainDisplay status="0" />}
            {returnedStatus === 200 && (
              <MainDisplay status="200" dogListS={returnedData} />
            )}
            {returnedStatus === 404 && <HomeNotFound status="404" />}
            {/* <MainDisplay dogListS ={returnedData} status={returnedStatus}/> */}
          </div>
        </Grid>
        <Grid item>
          <Advert name="adImage2" />
        </Grid>
      </Grid>
      <ToastContainer autoClose={1000} />
      <Dialog
        open={open}
        onClose={() => handleOpen("CLOSED")}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ paddingLeft: 40, paddingRight: 40 }}
        >
          Notification
        </DialogTitle>
        <Divider variant="middle" style={{ marginLeft: 40, marginRight: 40 }} />
        <DialogContent
          sx={{
            maxWidth: 1000,
            maxHeight: 500,
            paddingLeft: 5,
            paddingRight: 5,
            wordWrap: "break-word",
          }}
        >
          Someone intended to adopt your canine : {dogList}
          <br />
          <br />
          Please check your email for more details.
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
