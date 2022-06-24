import React, {Component} from "react";
import axios from 'axios';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';






class HomeMainDisplay extends Component{
    constructor(props){
        super(props)
        this.state = {
         DogList:[]
        }
    }

    async componentDidMount() {
       await this.GetAllDogs();
    }

     GetAllDogs = async() =>{
        await axios.get('http://localhost:8080/getAllDogs')
        .then((res)=>{this.setState({DogList:res.data})} )
    }

    inputDogtoSession=(dogObj)=>{
        sessionStorage.setItem("dogObj",dogObj);
        console.log(JSON.parse(sessionStorage.getItem("dogObj"))) ;
    }

    render(){
        const theme = createTheme();
        return(
            <div>            
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    
                    <main>
                        {/* Hero unit */}
                    
                        <Container sx={{ py: 4 }} maxWidth="lg">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.state.DogList.map((dogs) => (
                            <Grid item key={dogs.id} xs={12} sm={6} md={4} lg={3}>
                                <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height : 300
                                    }}
                                    image={decodeURIComponent(dogs.dogURL)}
                                    alt="random"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {dogs.dogname}
                                    </Typography>
                                    <Typography>
                                    This is a media card. You can use this section to describe the
                                    content.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View</Button>
                                    <Button size="small" onClick={()=>this.inputDogtoSession(JSON.stringify(dogs))}> <Link to='/adoption'>Adopt</Link></Button>
                                </CardActions>
                                </Card>
                            </Grid>
                            ))}
                        </Grid>
                        </Container>
                    </main>
                    </ThemeProvider>
             
            </div>
        )
    }
}
export default HomeMainDisplay