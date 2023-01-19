import React from "react";

import { Grid } from "@mui/material";

const Advert = (props) => {
  return (
    <div>
      <Grid
        className={props.name}
        container
        sx={{ display: "inline-block", width: "13rem", height: "40rem" }}
      ></Grid>
    </div>
  );
};

export default Advert;
