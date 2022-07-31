import React, { Component } from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import WithNavigation from '../Utilities/WithNavigation';
import Footer from './Footer';
import Login from '../Page/Login';
import Registration from '../Page/Registration';
import HomePage from '../Page/HomePage';
import ImageUpload from '../Page/ImageUpload';
import LogoutMessage from '../Page/LogoutMessage';
import Map from '../Page/MapPage';
import Adoption from '../Page/Adoption';
import Manage from '../Page/Manage';
import {LoadScript} from '@react-google-maps/api';
import Donation from '../Page/DonationF';
import Dashboard from '../Page/Dashboard';
import Header from './Header';
import HospitalUpload from '../Page/HospitalUpload';


class CanineApp extends Component {
  
  render() {
    const LoginWithNav = WithNavigation(Login);
    const ImageUploadWithNav = WithNavigation(ImageUpload)
    const AdoptionWithNav = WithNavigation(Adoption);
    const RegistrationWithNav = WithNavigation(Registration)
    const LogoutWithNav = WithNavigation(LogoutMessage)
    const HeaderWithNav = WithNavigation(Header)
    const api = "AIzaSyBNn8vfymHui03uwp3VKl8_2EccQEu1F_g";


    return (
        <div className='CanineApp'>
            <Router>
                <HeaderWithNav/>
                    <LoadScript googleMapsApiKey={api}> 
                            <Routes>
                                <Route path="/" element={<HomePage/>} /> 
                                <Route path="/login" element={<LoginWithNav/>} />
                                <Route path="/register" element={<RegistrationWithNav/>} />
                                <Route path='/imageUpload' element={<ImageUploadWithNav/>}/>
                                <Route path='/logoutMessage' element={<LogoutWithNav/>}/>
                                <Route path='/googleMap' element={<Map/>}/>
                                <Route path='/adoption' element={<AdoptionWithNav/>}/>
                                <Route path='/donation' element={<Donation/>}/>
                                <Route path='/manage' element={<Manage/>}/>
                                <Route path='/dashboard' element={<Dashboard/>}/>
                                <Route path='/hospitalUpload' element={<HospitalUpload/>}/>
                            </Routes>
                    </LoadScript>
                <Footer/>
            </Router>
        </div>
    )
  }
}
export default CanineApp