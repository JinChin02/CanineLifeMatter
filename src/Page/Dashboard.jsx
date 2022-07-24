import React, {useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function Dashboard (){

    return (
        <div>
            <div  style={{ padding: 50 }} className="LeaveComment">
                <h3>Leave Your Comment Here</h3>
                <Divider  variant="fullWidth" style={{ margin: "30px 0" }} />
            </div>

            <div style={{ padding: 50 }} className="Comments">
                <h3>Comments</h3>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <Paper style={{ padding: "40px 20px", marginLeft: 50, marginTop: 20 , marginBottom: 10}}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item></Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                        </p>
                    </Grid>
                    </Grid>
                </Paper>
            </div>
            
        </div>
    )
}