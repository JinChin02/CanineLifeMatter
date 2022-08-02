import React, {Component} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class HomeSearchDisplay extends Component{

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
        return(
            <div>
                <div>            
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        
                        <main>
                            <Container sx={{ py: 4 }} maxWidth="lg">
                            <Grid container spacing={4}>
                                {this.props.data.map((dogs) => (
                                <Grid item key={dogs.id} xs={12} sm={6} md={4} lg={3}>
                                    <Card
                                    className="card"
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    onClick={()=> this.putDogsToSession(JSON.stringify(dogs))}
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
                                    </Card>
                                </Grid>
                                ))}
                            </Grid>
                            </Container>
                        </main>
                    </ThemeProvider>
                    <ToastContainer autoClose={1000} />
                </div>      
            </div>
        )
    }
}
export default HomeSearchDisplay