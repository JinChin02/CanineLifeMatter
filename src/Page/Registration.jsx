import React, {Component} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

class Registration extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            confirmPassword : '',
            email : '',
            phone : '',
            warningStatement:[]
        }
    }

    verifyForm = () =>{

        if (this.state.username.replace(/^\s+|\s+$/gm,'')===""||this.state.username.length===0){      
            this.state.warningStatement.push("Please input a username")
        }
        if (this.state.phone.replace(/^\s+|\s+$/gm,'')===""||this.state.phone.length===0){
            this.state.warningStatement.push("Please input a phone number")
        }
        if (this.state.email.replace(/^\s+|\s+$/gm,'')===""||this.state.email.length===0){
            this.state.warningStatement.push("Please input an email address")
        }
        if (this.state.password.replace(/^\s+|\s+$/gm,'')===""||this.state.password.length===0){
            this.state.warningStatement.push("Please input the password")
        }
        if (this.state.password !== this.state.confirmPassword){
            this.state.warningStatement.push("Please ensure password and confirm password is the same")
        }
    }

    userRegister = () => {
        this.verifyForm()
        if(this.state.warningStatement.length === 0){
            var user = {"username":this.state.username , "password":this.state.password , "email":this.state.email , "phoneNumber":this.state.phone,"isAdmin":0}
            axios.post("http://localhost:8080/register", user)
            .then(response=>{this.abc(response.status,response)})
            .catch(e =>{this.abc(e.response.status, e.response)})
        }
        else{
            var display = ""
            for(var i = 0; i<this.state.warningStatement.length;i++ ){
                display = this.state.warningStatement[i];
                toast(display,{type:"warning"})
            } 
            this.setState({warningStatement:[]})
        }
    }

    abc = (res,response) =>{
        if(res === 200){
            toast("Account creation successful",{type:"success"})
            setTimeout(()=>{this.props.navigate("/login",{replace:false})},1500); 
        } else if (res === 406) {
            toast("Existing account detected",{type:"warning"})
            setTimeout(()=>{window.location.reload(false)},1500);
            
        }
        else{
            toast("Something Went Wrong, Account creation failed",{type:"error"})
            setTimeout(()=>{window.location.reload(false)},1500);
        }
    }
    

    render(){
        return (
            <div>
                <div className="container formBody">
                <h3 className="Title">Create A New Account</h3>
                <br />
                <form >
                    <div className="form-group">
                        <label>Username</label><br />   
                        <input type="text" name="username" placeholder="Pick your username" className="form-control" required onChange={evt => this.setState({username: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Email</label><br />
                        <input type="email" name="email" placeholder="Fill in your email" className="form-control" required onChange={evt => this.setState({email: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Phone Number</label><br />
                        <input type="tel" name="phone" className="form-control" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onChange={evt => this.setState({phone: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Password</label><br />
                        <input type="password" name="password" placeholder="Input your password" className="form-control" required onChange={evt => this.setState({password: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Confirm Password</label><br />
                        <input type="password" name="confirmPassword" placeholder="Input your password again" className="form-control" required onChange={evt => this.setState({confirmPassword: evt.target.value})}/>
                    </div>
                    <br /><br />
                    <div className="form-group">
                        <button type="button" className="btn btn-success form-control" onClick={this.userRegister}>Sign Up</button>
                    </div>
                    <div className=" alignCenterMarginTop">
                            Already have an account ? <NavLink to="/login">Login</NavLink>
                    </div>
                </form>
                </div>
                
                <ToastContainer autoClose={1500} />
            </div>
        )
    }

}

export default Registration