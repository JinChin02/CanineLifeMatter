import React, { Component } from 'react'
import LoadingPage from '../components/Loading';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Row from '../components/row.jsx'
import LoadinUploadPage from '../components/FloatingUploadBar'



class Manage extends Component {


    constructor(props){
        super(props)
        this.state = {
            user:null,
            dogListOfAdpoted:[],
            dogListOfFinded:[]
        }
    }




    async componentDidMount(){
        // input user to current state
        let currentuser= await this.inputUser();
        await this.setState({
            user:currentuser
        })
        
        // Input the dogs which user adopted into dogListOfAdpoted
        await axios.get(`http://localhost:8080/user/adopt/${sessionStorage.getItem('userlogin')}`)
        .then((res)=>this.setState({
            dogListOfAdpoted:res.data,
        }));

        // Input the dogs which usr finded into dogListOfFinded (not adopted)
        await axios.get(`http://localhost:8080/user/find/${sessionStorage.getItem("userlogin")}`)
        .then((res)=>this.setState({
            dogListOfFinded:res.data,
        }));
    }

    inputUser=async()=>{
        let user=null;
        await axios.get(`http://localhost:8080/user/${sessionStorage.getItem('userlogin')}`)
        .then((res)=>user=res.data)
        return user;
    }




    render() {

        if (this.state.user==null){
            return ( <div><LoadingPage/></div>);
        } else {
            const Item = styled(Paper)(({ theme }) => ({
                // '#fff' (white version)
                backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#EDEEED',
                ...theme.typography.body2,
                 padding: theme.spacing(5),
                // textAlign: 'center', 
                color: theme.palette.text.secondary,
            }));
            return (
                
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Grid justifyContent="center"  >
                            <Grid item xs={6}md={10} justifyContent="flex-start"  margin={20}>
                            <Item>
                            <Typography variant="h4">Your Cannie:</Typography><br/><br />

                                <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell align="right"/>
                                            <TableCell align="right"><Typography variant="h5">DogID</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="h5" >Dog Name</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="h5">Dog breed</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="h5">Vaccination Status</Typography></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.dogListOfAdpoted.length!==0&&this.state.dogListOfAdpoted.map((dog) =>
                                         <Row key={dog.id} row={dog}/>
                                        )}                                   
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Item>
                        </Grid>
                            <Grid item xs={6}md={10} justifyContent="flex-start"  margin={20}>
                                <Item>
                                <Typography variant="h4">Cannie waiting to be adopted:</Typography><br/><br />

                                <TableContainer component={Paper}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell />
                                                <TableCell align="right"><Typography variant="h5">DogID</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="h5">Dog Name</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="h5">Dog breed</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="h5">Vaccination Status</Typography></TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {this.state.dogListOfFinded.length!==0&&this.state.dogListOfFinded.map((dog) =>
                                            <Row key={dog.id} row={dog} />
                                            )}                                   
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                 
                    <div className='floatingBarPosition'>
                    {this.state.user.isAdmin==1 &&<Link to="/hospitalUpload"><LoadinUploadPage name={"Add hospital"}/></Link>  }
                        <Link to="/imageUpload"><LoadinUploadPage name={"upload"}/></Link>
                    </div> 
                    <ToastContainer autoClose={1000}/>
                </div>
            )
        }
    }
}

export default Manage