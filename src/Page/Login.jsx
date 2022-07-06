import React, {Component} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Authentication from '../Utilities/Authentication';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            signinSuccess: false,
            warningStatement:"",
            isLogin:false
        }
    }

    userLogin = async () => {
        var user = {"username":this.state.username, "password":this.state.password}
        await axios.post("http://localhost:8080/login" , user)
        .then(response =>  this.abc(response.status,response)) 
        .catch(e => this.abc(e))
    }   

    abc = (res,response) => {
        if(res === 200){
            this.setState({signinSuccess: true},() => console.log(this.state.signinSuccess))    
            Authentication.registerSuccess(response.data.id);
            this.props.navigate('/');  
        } else {
            this.setState({warningStatement:"This account is not existed or password is wrong"})
        }
    }
    
    render(){
        if (sessionStorage.getItem("userlogin")){
            return (<div>You Are Already Logged In <br /><br/><br/><br/><br/><br/><br/><br/><br/>
                                                            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                                            <br/><br/><br/><br/><br/><br/><br/><br/></div>);
        } else {
            return (
                <div>
                    <div className="container formBody">
                        <h3 className="Title">Sign In To Continue</h3>
                        <br />
                        <form action="" >
                            <div className="form-group">
                                <label>Username</label><br />   
                                <input type="text" name="username" required className="form-control" onChange={evt => this.setState({username: evt.target.value})}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Password</label><br />
                                <input type="password" name="password" required className="form-control" onChange={evt => this.setState({password: evt.target.value})}/>
                            </div>
                            <div className="login_warning">{this.state.warningStatement}</div>
                            <br /><br />
                            <div className="form-group">
                            <button type="button" className="btn btn-success form-control" onClick={this.userLogin}>Login</button>
                            </div>
                        </form>
                        <br /><br /><br />
                        <div className=" alignCenter">
                            Need an account ? <NavLink to="/register">Sign Up</NavLink>
                        </div>
                    </div>
                    <br />
                </div>
            )
        }
    }
}

export default Login