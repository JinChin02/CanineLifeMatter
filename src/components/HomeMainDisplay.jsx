import React, {Component} from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingPage from '../components/Loading';
import { Link } from "react-router-dom";

class HomeMainDisplay extends Component{
    constructor(props){
        super(props)
        this.state = {
         DogList:[],
         shadows:1
        }
    }

    onMouseOver = () => this.setState({ shadows: 3 });
    onMouseOut = () => this.setState({ shadows: 1 });

    async componentDidMount() {
       await this.GetAllDogs();
       if (sessionStorage.getItem("dogObj")!=null){
        sessionStorage.removeItem("dogObj");
       }
    }

    GetAllDogs = async() =>{
        await axios.get('http://localhost:8080/getAllDogs')
        .then((res)=>{this.setState({DogList:res.data})} )
    }

    putDogsToSession = (dogObj) =>{
        sessionStorage.setItem("dogObj", dogObj)
    }

    render(){
        const theme = createTheme();

        if(this.state.DogList.length===0){
            <LoadingPage/>
        }else{
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
                                    <Link to='/adoption' className="cancelUnderScore"><Card
                                    className="card"
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                                    onClick={()=> this.putDogsToSession(JSON.stringify(dogs))}
                                    onMouseOver={this.onMouseOver}
                                    onMouseOut={this.onMouseOut}
                                    
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
                                    {/* <CardActions>
                                        <Button size="small" onClick={()=> this.putDogsToSession(JSON.stringify(dogs))}> <Link to='/adoption'>View Details</Link></Button>
                                    </CardActions> */}
                                    </Card></Link>
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
}
export default HomeMainDisplay