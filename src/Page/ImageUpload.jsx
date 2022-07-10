import React, { Component} from "react";
import axios from "axios";
import Map from "../components/Map";


class DisplayImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageURL: null
    };
  }

  componentDidMount(){ 
    if(sessionStorage.getItem('userlogin') === null){      
      setTimeout(() => {this.props.navigate('/login', { replace: true })}, 0)
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
    console.log(url);
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

  render() {

    return (
      <div>
        <div>
          <div>
            <h1>Dog Image upload</h1>
            <input type="file" name="myImage" onChange={this.onImageChange}/>
            <button onClick={this.onClickUpload}>Upload</button>
            <button onClick={this.getDogImage} >Show picture from database</button>
            {this.state.imageURL!=null&&<img src={this.state.imageURL} alt="no"></img>}
          </div>
        </div>
        <Map/>
      </div>
    );
    
  }
}
export default DisplayImage;