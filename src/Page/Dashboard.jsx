import React, {useState,useEffect} from "react";
import Divider from "@mui/material/Divider";
import LoadingPage from "../components/Loading";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import DashboardElement from "../components/DashboardElement";

export default function Dashboard (){

    const [comments, setComments] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/bulletins")
        .then((res)=>setComments(res.data));
    });


    if (comments == ""){
            return (<LoadingPage/>);
    } else {
        return (

            <div>
                <div style={{ padding: 50 }} className="Comments">
                    <h3>Comments</h3>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }}/>
                    {comments.length!=0&& comments.map((comment)=>{
                        // <DashboardElement key={comment.id} userComment={comment} />
                        return (
                            <div key={comment.id}>
                                <Paper style={{ padding: "40px 20px", marginLeft: 50, marginTop: 20 , marginBottom: 10}}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item></Grid>
                                        <Grid justifyContent="left" item xs zeroMinWidth>
                                            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.owner.username}</h4>
                                            <p style={{ textAlign: "left" }}>
                                            {comment.description}
                                            </p>
                                            <p style={{ textAlign: "left", color: "gray" }}>
                                            Posted on {comment.date} ({comment.time})
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                        
                            </div>
                          )}
                    )}
                </div>              
            </div>
        )
    }
}