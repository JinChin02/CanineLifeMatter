import React, { Component } from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import WithNavagation from './WithNavigation';
import Footer from './Footer';
import Login from './Login';
import Registration from './Registration';
import HomePage from './HomePage';
import ImageUpload from './ImageUpload';
import LogoutMessage from './LogoutMessage';


class CanineApp extends Component {


  render() {
    const LoginWithNav = WithNavagation(Login);


    return (
        <div className='CanineApp'>
            <Router>
                {/* <HeaderWithNav/> */}
                    <Routes>
                        <Route path="/" element={<HomePage/>} /> 
                        <Route path="/login" element={<LoginWithNav/>} />
                        <Route path="/register" element={<Registration/>} />
                        <Route path='/imageUpload' element={<ImageUpload/>}/>
                        <Route path='/logoutMessage' element={<LogoutMessage/>}/>
                    </Routes>
                <Footer/>
            </Router>
        </div>
    )
  }
}
export default CanineApp