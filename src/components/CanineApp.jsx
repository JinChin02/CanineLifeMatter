import React, { Component } from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import WithNavagation from './WithNavigation';
import Footer from './Footer';
import Login from './Login';
import Registration from './Registration';
import HomePage from './HomePage';
import ImageUpload from './ImageUpload';
import LogoutMessage from './LogoutMessage';
import Map from './Map';
import {LoadScript} from '@react-google-maps/api';
import Adoption from './Adoption';

class CanineApp extends Component {


  render() {
    const LoginWithNav = WithNavagation(Login);
    const AdoptionWithNav= WithNavagation(Adoption);
  

    const api = "AIzaSyBNn8vfymHui03uwp3VKl8_2EccQEu1F_g";


    return (
        <div className='CanineApp'>
            <Router>
                    <LoadScript googleMapsApiKey={api}> 
                            <Routes>
                                <Route path="/" element={<HomePage/>} /> 
                                <Route path="/login" element={<LoginWithNav/>} />
                                <Route path="/register" element={<Registration/>} />
                                <Route path='/imageUpload' element={<ImageUpload/>}/>
                                <Route path='/logoutMessage' element={<LogoutMessage/>}/>
                                <Route path='/googleMap' element={<Map/>}/>
                                <Route path='/adoption' element={<AdoptionWithNav/>}/>
                            </Routes>
                    </LoadScript>
                <Footer/>
            </Router>
        </div>
    )
  }
}
export default CanineApp