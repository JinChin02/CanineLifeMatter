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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    componentDidMount() {
        this.GetAllDogs();
       if (sessionStorage.getItem("dogObj")!=null){
        sessionStorage.removeItem("dogObj");
       }
    }

    GetAllDogs = async() =>{
        await axios.get('http://localhost:8080/getAllDogs')
        .then((res)=>{this.setState({DogList:res.data})} )
    }

    putDogsToSession = (dogObj) =>{

        if(sessionStorage.getItem('userlogin')===null){
            toast("Please login first before proceeding",{type:"warning"})
            setTimeout(() => {this.props.navigate('/login', { replace: true })}, 1000)
        }
        else{
            sessionStorage.setItem("dogObj", dogObj)
            this.props.navigate('/adoption',{replace:true})
        }
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
                                   <Card
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
                                       {dogs.dogDescription}
                                        </Typography>
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
            )
        }
    }
}
export default HomeMainDisplay