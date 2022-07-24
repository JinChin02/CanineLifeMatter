import React, {useEffect,useState} from 'react';
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';


function DashboardElement(props) {
const {userComment} = props;
// const [comment , setComment] =useState("");

    // useEffect(() => {
    //     setComment(JSON.parse(userComment));
    // });
    

if (userComment==""){
    return (<h1>Hello</h1>);
} else {
    return (
        <div>
            <Paper style={{ padding: "40px 20px", marginLeft: 50, marginTop: 20 , marginBottom: 10}}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item></Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{userComment.owner}</h4>
                        <p style={{ textAlign: "left" }}>
                        {userComment.description}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Paper>
    
        </div>
      )
}
}

export default DashboardElement