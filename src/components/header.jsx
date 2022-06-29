import React, { Component } from 'react'
import CanineLogo from '../images/logo/CanineLogo.png'
import {Link} from 'react-router-dom';
import Authentication from './Authentication';
import { Navigate } from 'react-router-dom';

export class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoggin :sessionStorage.getItem('userlogin')
    }
  }

  logoutOut = () => {
    Authentication.logout();
    this.setState({isLoggin:""})
  }
  
  navHome = () => {
    <Navigate to="/"/>
  }

  render() {
  //  const IsLoggedIn =  Authentication.isLoggedIn();
  
    return (
      <header className='header' >
              
        <table className='headerTable'>
          <tbody>
            <tr>
                <td><img className='logo' src={CanineLogo} alt="Logo" /></td>
                <td className='paddingTop'><Link to= '../' className='headerLink'>Cannine</Link></td>
                <td className='paddingTop'><Link to= '../googleMap'  className='headerLink'>Map</Link></td> 
                <td className='paddingTop'>Donation</td> 
                <td/><td/><td/> 
                {this.state.isLoggin!=null && <td className='paddingTop'><Link to='../ImageUpload' className='headerLink'>Upload</Link></td>}
                {this.state.isLoggin==null&& <td className='paddingTop'><Link to= '../Login'  className='headerLink'>Login</Link></td>}
                {this.state.isLoggin!=null && <td className='paddingTop' onClick={this.logoutOut}><Link to= '../LogoutMessage' className='headerLink'>Logout</Link></td>}
                
            </tr>
          </tbody>
        </table>
      </header>
    )
  }
}

export default Header