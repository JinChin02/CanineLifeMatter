import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingPage from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainDisplay(props) {
  const navigate = useNavigate();
  const [dogList, setDogList] = useState([]);
  const [shadows, setShadow] = useState(1);

  const onMouseOver = () => {
    setShadow(3);
  };
  const onMouseOut = () => {
    setShadow(1);
  };

  useEffect(() => {
    switch (props.status) {
      case "0":
        axios.get("http://localhost:8080/getAllDogs").then((res) => {
          setDogList(res.data);
        });
        break;
      case "200":
        console.log("input");
        setDogList(props.dogListS);
        break;
    }
  },[props.dogListS]);

  const putDogsToSession = (dogObj) => {
    if (sessionStorage.getItem("userlogin") === null) {
      toast("Please login first before proceeding", { type: "warning" });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } else {
      sessionStorage.setItem("dogObj", dogObj);
      navigate("/adoption", { replace: true });
    }
  };

  const theme = createTheme();

  if (dogList.length === 0) {
    <LoadingPage />;
  } else {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <Container sx={{ py: 4 }} maxWidth="lg">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {dogList.map((dogs) => (
                  <Grid item key={dogs.id} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      className="card"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onClick={() => putDogsToSession(JSON.stringify(dogs))}
                      onMouseOver={onMouseOver}
                      onMouseOut={onMouseOut}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: 300,
                        }}
                        image={decodeURIComponent(dogs.dogURL)}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {dogs.dogname}
                        </Typography>
                        <Typography>{dogs.dogDescription}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
        </ThemeProvider>
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}

export default MainDisplay;
