import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

const Row = (props) => {
  const { row } = props; // row == dog
  const [open, setOpen] = React.useState(false);

  // this is the user obj include username, email, phone, address
  const [previosUser, setPreviosUser] = React.useState(null);
  const navigate = useNavigate();

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const deleteDog = async (dogID) => {
    await axios.post(`http://localhost:8080/deleteDog/${dogID}`);
    toast("delete success", { type: "true" });
    setTimeout(() => {
      navigate("/", { replace: false });
    }, 1000);
  };

  useEffect(() => {
    if (row.previosOwnerID != null) {
      axios
        .get(`http://localhost:8080/user/${row.previosOwnerID}`)
        .then((res) => {
          setPreviosUser(res.data);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            // aria-label="expand row"
            size="large"
            color="default"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <Typography variant="subtitle1"> {row.id}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle1">{row.dogname}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle1">{row.breed}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="subtitle1">{row.vaccinationStatus}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={3.5}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={decodeURIComponent(row.dogURL)}
                      alt="green iguana"
                    />
                  </Card>
                </Grid>
                <Grid item xs={6.5} container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h5" component="div">
                      {row.dogname}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {row.dogDescription} <br />
                      <br />
                      <br />
                      {row.previosOwnerID && (
                        <div>
                          Previous Owner Details
                          <Divider
                            variant="full-width"
                            style={{ marginBottom: 20 }}
                          />
                          Name : {previosUser !== null && previosUser.username}{" "}
                          <br />
                          Email : {previosUser !== null &&
                            previosUser.email}{" "}
                          <br />
                          Contact :{" "}
                          {previosUser !== null && previosUser.phoneNumber}
                        </div>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={2}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => deleteDog(row.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
