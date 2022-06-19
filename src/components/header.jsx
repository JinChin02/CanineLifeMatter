import React, { Component } from 'react'
import CanineLogo from '../images/logo/CanineLogo.png'
import {Link} from 'react-router-dom';



export class Header extends Component {

  cleanSession= ()=>{
    sessionStorage.clear();
    window.location.reload(false);
  }

  render() {
    return (
      <header className='header' >
                {/* <nav className="navbar navbar-expand-md cus ">
                 <div><a href="http://localhost:3000"><img className='logo' src={CanineLogo} alt="Logo" /></a></div>
                    <ul className="navbar-nav">
                      <li className='nav-link'> Canine</li>
                      <li className='nav-link'>Map</li>
                      <li className='nav-link'>Donation</li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                      <li className='nav-link'>Login</li>
                      <li className='nav-link'>Logout</li>
                    </ul>
                </nav> */}
        <table className='headerTable'>
          <tbody>
            <tr>
                <td> <img className='logo' src={CanineLogo} alt="Logo" /></td>
                <td className='paddingTop'><Link to= '../' className='mainGrey hideButtonLine'>Cannine</Link></td>
                <td className='paddingTop'>Map</td> 
                <td className='paddingTop'>Donation</td> 
                <td/><td/><td/><td/> 
                {/* {!sessionStorage.getItem("userlogin")&& <td className='paddingTop'><Link to= '../Login' className='mainGrey hideButtonLine'>Login</Link></td>}
                {sessionStorage.getItem("userlogin")&& <td className='paddingTop' onClick={this.cleanSession}>Logout</td>} */}
                <td className='paddingTop'><Link to= '../Login' className='mainGrey hideButtonLine'>Login</Link></td>
                <td className='paddingTop' onClick={this.cleanSession}>Logout</td>
            </tr>
          </tbody>
        </table>
      </header>
    )
  }
}

export default Header