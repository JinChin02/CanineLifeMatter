import React, { Component} from "react";
import axios from "axios";
import Map from "../components/Map";
import Grid from '@mui/material/Grid';
import DragDrop from "../components/DragDropImage";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import CheckBoxIcon from '@mui/icons-material/CheckBox';





class DisplayImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageURL: "https://res.cloudinary.com/dlbwhvhsg/image/upload/v1657219564/uploadLogo_eofgwl.png",
      open:false,
      LocationIsChosen:false,
      file:null,
    };
  }

  componentDidMount(){ 
    if(sessionStorage.getItem('userlogin') === null){      
      setTimeout(() => {this.props.navigate('/login', { replace: true })}, 0)
    }
    if (sessionStorage.getItem("clickLocation")){
      sessionStorage.removeItem("clickLocation");
    }
  } 

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: img,
      }); 
    }
  };

  // this is the demo method that how to upload the image 
  onClickUpload=(event)=>{
    const data = new FormData()
    data.append("file", this.state.image)
    data.append("upload_preset", "DB4495")
    data.append("cloud_name","dlbwhvhsg")
  

    axios.post("https://api.cloudinary.com/v1_1/dlbwhvhsg/image/upload",data)
    .then((res)=> this.uploadImageUrl(res.data.secure_url)) 
    .catch(e=>console.log(e.message) )
  }


   uploadImageUrl = (url)=>{
    axios.post("http://localhost:8080/uploadImage/dog/44", url)
    .then((res)=>console.log(res.data))
    .catch(e=>console.log(e.message))
  }

  getDogImage = () =>{
    axios.get("http://localhost:8080/getDog/44")
    .then((res)=>this.setImage(decodeURIComponent(res.data.dogURL)))
  }

  setImage=(url)=>{
    // let decodeURL= decodeURI(url);
    console.log(url.slice(0,-1));
    this.setState({imageURL:url.slice(0,-1)});
  }

    
  handleOpen = () => {
    this.setState({open : true})
  }

  handleClose = () => {
    this.setState({open : false})
    if(sessionStorage.getItem("clickLocation")!=null){
      this.setState({LocationIsChosen:true})
    } 
  }

  passData = (data) => {

    this.setState({
      imageURL:data
    })
    axios.post("http://localhost:8080/imageProcessing",data)
    .then((res)=> console.log(res.data)); 
    
  };

  render() {

    return (
      <div className="uploadPageBackGround">
         {/* <div>
          <div>
             <h1>Dog Image upload</h1>
             <input type="file" name="dogImage" onChange={this.onImageChange}/>
             <button onClick={this.onClickUpload}>Upload</button>
             <button onClick={this.getDogImage} >Show picture from database</button>
             {this.state.imageURL!=null&&<img src={this.state.imageURL} alt="no"></img>}
           </div>
        </div> */}

        <Grid container direction="row" justifyContent="center" alignItems="center" paddingTop={7}>
          <Grid item >
            <h1>Upload Canine</h1>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start" marginTop={10}>
          <Grid item  >
            <Grid item> <DragDrop passData={this.passData}/></Grid>
            <Grid item><img  width="400vw" height="300vh" src={this.state.imageURL} alt="no Pictue" /></Grid>
          </Grid>
          <Grid item justifyContent="center" alignItems="center" >
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' }, }} noValidate autoComplete="off">
              <Grid item>
                <TextField
                      required
                      label="dog name"
                      id="dogUpload_dogname"   
                      placeholder="Dog name"
                    />  
              </Grid> 
              <Grid item>
                <TextField
                      required
                      label="dog description"
                      id="dogUpload_description"   
                      placeholder="Dog Description"      
                    />  
              </Grid> 
              <Grid item>
                <TextField
                      required
                      label="dog breed"
                      id="dogUpload_dogBreed"         
                      placeholder="Dog Breed"
                    
                    />  
              </Grid> 
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Vaccination Status</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Vaccination Status"
                    //onChange={}
                  >
                    <MenuItem value={"YES"}>YES</MenuItem>
                    <MenuItem value={"NO"}>NO</MenuItem>
                  </Select>
                </FormControl>
              </Grid> 
              <Grid item >
                <Button variant="contained" onClick={this.handleOpen} style={{marginTop:"1vw", marginRight:'3vw'}}>choose location</Button>
                {this.state.LocationIsChosen&&<CheckBoxIcon style={{color:"green", width:"5vh" ,height:"5vh", marginTop:"2vh"}}/>}
              </Grid>     
              <Grid item> 
                  <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Pick a location where you found this canine"} </DialogTitle>
                      <DialogContent sx={{minWidth: 600, minHeight:600}}>
                        <Map/>
                      </DialogContent>
                  </Dialog>
              </Grid>                             
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" paddingTop={7}>
          <Grid item >
            <Button variant="contained" size="large" onClick={this.handleOpen} >submit</Button>
          </Grid>
        </Grid><br />
      </div>
    );
    
  }
}
export default DisplayImage;