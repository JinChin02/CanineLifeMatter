import React, { Component } from 'react'
import CanineLogo from '../images/logo/CanineLogo.png'
import {NavLink} from 'react-router-dom';
import Authentication from '../Utilities/Authentication';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }



  logOut = () => {
    this.setState({open : false});
    Authentication.logout();
    this.setState({isLoggin:""});
    this.props.navigate("../LogoutMessage")

  }
  
  handleOpen = () => {
    this.setState({open : true})
  }

  handleClose = () => {
    this.setState({open : false})
  }

  render() {
  //  const IsLoggedIn =  Authentication.isLoggedIn();
    let activeStyle = {color: "rgb(8, 86, 135)", fontWeight:"800"};
    const isLogin = sessionStorage.getItem("userlogin");
    return (
      <div>
        <header className='header' >  
          <table className='headerTable'>
            <tbody>
              <tr>
                  <td><img className='logo' src={CanineLogo} alt="Logo" /></td>
                  <td className='paddingTop'><NavLink to= '../' style={({ isActive }) =>isActive ? activeStyle : undefined } id='headerLink' >ADOPT</NavLink></td>
                  <td className='paddingTop'><NavLink to= '../googleMap' style={({ isActive }) =>isActive ? activeStyle : undefined }  id='headerLink'>MAP</NavLink></td> 
                  <td className='paddingTop'><NavLink to= '../donation' style={({ isActive }) =>isActive ? activeStyle : undefined }  id='headerLink'>DONATION</NavLink></td> 
                  <td/><td/><td/> 
                  {isLogin!=null && <td className='paddingTop'><NavLink to= '../manage' style={({ isActive }) =>isActive ? activeStyle : undefined } id='headerLink'>MANAGE</NavLink></td>}
                  {isLogin==null&& <td className='paddingTop'><NavLink to= '../Login' style={({ isActive }) =>isActive ? activeStyle : undefined }  id='headerLink'>LOGIN</NavLink></td>}
                  {isLogin!=null && <td className='paddingTop' ><NavLink onClick={this.handleOpen} to= '../LogoutMessage' id='headerLink'>LOGOUT</NavLink></td>} 
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Logout Confirmation"} </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to log-out ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose}>No</Button>
                      <Button onClick={this.logOut} autofocus>Yes</Button>
                    </DialogActions>
                  </Dialog>
              </tr>
            </tbody>
          </table>
        </header>
        
      </div>
      
    )
  }
}

export default Header