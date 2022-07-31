import React,{useState,useEffect} from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Map from '../components/Map';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';



const HospitalUpload = ()=> {

const [clinicName,setClinicName] = useState("");
const [phoneNumber,setPhoneNumber] = useState("");
const [clincAddress,setClinicAddress] =useState("");
const [description,setDescription]= useState("");
const [windowOpen,setWindowOpen]= useState(false);
const [locationIsChosen,setLocationIsChosen]= useState(false);
const [warningStatement, setWarningStatement]=useState(null); // this is going to input array
const [snackIsOpen, setSnackIsOpen] = useState(false);

let isValidForm = true;


useEffect(()=>{
    sessionStorage.removeItem("clickLocation");
    setWarningStatement(null);
    setLocationIsChosen(false);
},[])

const handleOpen = () =>{
    setWindowOpen(true);
}
const handleClose=()=>{
    setWindowOpen(false);
    if(sessionStorage.getItem("clickLocation")!=null){
        setLocationIsChosen(true);
    } 
}

const verifyForm = () =>{
    let warningArray = [];
    if (clinicName==""||clinicName.length===0){
        isValidForm=false;
        warningArray.push("Please input a clinic name before uploading");
    }
    if (phoneNumber==""||phoneNumber.length===0){
        isValidForm=false;
        warningArray.push("Please input a phone number before uploading");
    }
    if (sessionStorage.getItem("clickLocation")===null){ 
        isValidForm=false;
        warningArray.push("Please choose a location before uploading");
    }
    if (clincAddress==""||clincAddress.length===0){
        isValidForm=false;
        warningArray.push("Please input the address");
    }

    if (description==""||description.length===0){
        isValidForm=false;
        warningArray.push("Please provide a clinic informataion before submiting");
    }
    setWarningStatement(warningArray);
}

const uploadHospital = () =>{
    verifyForm();
    let coordinate = JSON.parse( sessionStorage.getItem("clickLocation"));
    if ( isValidForm === true){
        //create clinic obj
        let newClinic = {
            name:clinicName,
            phonenumber:phoneNumber,
            lat:coordinate.lat,
            lng:coordinate.lng,
            address: clincAddress,
            description: description
        };
        axios.post("http://localhost:8080/uploadClinic",newClinic)
        .then((e)=>console.log(e.data))
        .catch((e)=>console.log(e.message));
    } else {
        setSnackIsOpen(true);
    }
}


const snackClose = (event, reason) =>{
    if (reason === 'clickaway') {
        return;
    }
    setSnackIsOpen(false);
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

return (
    <div className="uploadPageBackGround">
        <Grid container direction="column" justifyContent="center" alignItems="center" padding={7}>
            <Grid item xs={2} sm={4} md={4}>
                <Typography variant="h4" color="#A04000 "> Upload clinic:</Typography>
            </Grid> 
            <Grid item xs={2} sm={4} md={4} paddingTop={1}>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },  }} noValidate  autoComplete="off" >
                <TextField required id="outlined-required"  label="Clinic Name" onChange={(e)=>setClinicName(e.target.value)}/><br/>
                <TextField required id="outlined-required"  label="Clinic Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)}/><br/>
                <TextField required id="outlined-required"  label="Clinic address" onChange={(e)=>setClinicAddress(e.target.value)}/><br/>
                <TextField required id="outlined-required"  label="description" onChange={(e)=>setDescription(e.target.value)}/><br />
                <Button onClick={handleOpen}>Choose Location</Button>
                {locationIsChosen===true&&<CheckBoxIcon style={{color:"green", width:"4vh" ,height:"4vh"}}/>}<br />
            </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={4} paddingTop={2}>
                <Button variant="contained" href="#contained-buttons" onClick={uploadHospital}>Upload</Button>
            </Grid> 
            <Dialog open={windowOpen} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-title">{"Pick a location where you found this canine"} </DialogTitle>
                <DialogContent sx={{minWidth: 600, minHeight:600}}>
                    <Map/>
                </DialogContent>
            </Dialog>
            <div>
               <Snackbar  open={snackIsOpen}  onClose={snackClose} autoHideDuration={6000}   message="Note archived" >
                <Alert onClose={snackClose} severity="error" sx={{ width: '100%' }}>
                {warningStatement!=null&&warningStatement.map((eachStatement)=>
                <li color='red' key={eachStatement}>{eachStatement}</li>
                )}
                </Alert>
                </Snackbar>
            </div>
            </Grid>
    </div>
  )
}
export default HospitalUpload