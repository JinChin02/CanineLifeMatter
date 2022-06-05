import React, { Component } from 'react'
import CanineLogo from '../images/logo/CanineLogo.png'

export class Header extends Component {
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
          <tr>
            <td><img className='logo' src={CanineLogo} alt="Logo" /></td>
            <td className='paddingTop'>Cannine</td>
            <td className='paddingTop'>Map</td> 
            <td className='paddingTop'>Donation</td> 
            <td/><td/><td/><td/> 
            <td className='paddingTop'>Login</td>  
            <td className='paddingTop'>Logout</td>
          </tr>
        </table>
      </header>
    )
  }
}

export default Header