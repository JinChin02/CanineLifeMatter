import React, { Component } from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import WithNavigation from './WithNavigation';
import Footer from './Footer';
import Login from './Login';
import Registration from './Registration';
import HomePage from './HomePage';
import ImageUpload from './ImageUpload';
import LogoutMessage from './LogoutMessage';
import Map from './Map';
import Adoption from './Adoption';
import Manage from './Manage';
import Loading from './LoadingPage';
import {LoadScript} from '@react-google-maps/api';
import Donation from './Donation';


class CanineApp extends Component {
  
  render() {
    const LoginWithNav = WithNavigation(Login);
    const ImageUploadWithNav = WithNavigation(ImageUpload)
    const AdoptionWithNav = WithNavigation(Adoption);
    const RegistrationWithNav = WithNavigation(Registration)
    const api = "AIzaSyBNn8vfymHui03uwp3VKl8_2EccQEu1F_g";


    return (
        <div className='CanineApp'>
            <Router>
                    <LoadScript googleMapsApiKey={api}> 
                            <Routes>
                                <Route path="/" element={<HomePage/>} /> 
                                <Route path="/login" element={<LoginWithNav/>} />
                                <Route path="/register" element={<RegistrationWithNav/>} />
                                <Route path='/imageUpload' element={<ImageUploadWithNav/>}/>
                                <Route path='/logoutMessage' element={<LogoutMessage/>}/>
                                <Route path='/googleMap' element={<Map/>}/>
                                <Route path='/adoption' element={<AdoptionWithNav/>}/>
                                <Route path='/donation' element={<Donation/>}/>
                                <Route path='/manage' element={<Manage/>}/>
                                <Route path='/loading' element={<Loading/>}/>
                            </Routes>
                    </LoadScript>
                <Footer/>
            </Router>
        </div>
    )
  }
}
export default CanineApp