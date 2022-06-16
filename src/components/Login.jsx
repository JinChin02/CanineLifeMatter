import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            signinSuccess: false
        }
    }

    userLogin = () => {
        console.log(this.state.username);
        console.log(this.state.password);

        var user = {"username":this.state.username, "password":this.state.password}
        axios.post("http://localhost:8080/login" , user)
        .then(response => this.abc(response.status)) 
        
    }   

    abc = (res) => {
        if(res === 200){
            console.log(res)
            this.setState({signinSuccess: true},() => console.log(this.state.signinSuccess))
        }
    }

    render(){
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
                        <br /><br />
                        <div className="form-group">
                            <button type="button" className="btn btn-success form-control" onClick={this.userLogin}>Login</button>
                        </div>
                    </form>
                    <br /><br /><br />
                    <div className=" alignCenter">
                        Need an account ? <Link to="/register">Sign Up</Link>
                    </div>

                </div>
                
               
            </div>
        )
    }
}

export default Login