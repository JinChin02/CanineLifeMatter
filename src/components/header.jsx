import React, { Component } from 'react'
import CanineLogo from '../images/logo/CanineLogo.png'
import {Link} from 'react-router-dom';
import Authentication from './Authentication';



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

  render() {
  //  const IsLoggedIn =  Authentication.isLoggedIn();
  
    return (
      <header className='header' >
              
        <table className='headerTable'>
          <tbody>
            <tr>
                <td> <img className='logo' src={CanineLogo} alt="Logo" /></td>
                <td className='paddingTop'><Link to= '../' className='mainGrey hideButtonLine'>Cannine</Link></td>
                <td className='paddingTop'>Map</td> 
                <td className='paddingTop'>Donation</td> 
                <td/><td/><td/><td/> 
                {this.state.isLoggin==null&& <td className='paddingTop'><Link to= '../Login' className='mainGrey hideButtonLine'>Login</Link></td>}
                {this.state.isLoggin!=null && <td className='paddingTop' onClick={this.logoutOut}><Link to= '../LogoutMessage' className='mainGrey hideButtonLine'>Logout</Link></td>}
            </tr>
          </tbody>
        </table>
      </header>
    )
  }
}

export default Header