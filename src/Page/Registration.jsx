import React, {Component} from "react";
import axios from "axios";

class Registration extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            confirmPassword : '',
            email : '',
            phone : ''
        }
    }

    userRegister = () => {
        if(this.state.password === this.state.confirmPassword){
            var user = {"username":this.state.username , "password":this.state.password , "email":this.state.email , "phone":this.state.phone,"isAdmin":0}
            axios.post("http://localhost:8080/register", user)
            .then(response=>console.log(response.status))
            alert("Create success");
        } else {
            alert("Please enter the same passord");

        }
    }

    render(){
        return (
            <div>
                <div className="container formBody">
                <h3 className="Title">Create A New Account</h3>
                <br />
                <form action="">
                    <div className="form-group">
                        <label>Username</label><br />   
                        <input type="text" name="username" placeholder="Input username" className="form-control" required onChange={evt => this.setState({username: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Email</label><br />
                        <input type="email" name="email" placeholder="Input email" className="form-control" required onChange={evt => this.setState({email: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Phone Number</label><br />
                        <input type="tel" name="phone" className="form-control" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onChange={evt => this.setState({phone: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Password</label><br />
                        <input type="password" name="password" placeholder="Input password" className="form-control" required onChange={evt => this.setState({password: evt.target.value})}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Confirm Password</label><br />
                        <input type="password" name="confirmPassword" placeholder="Input password again" className="form-control" required onChange={evt => this.setState({confirmPassword: evt.target.value})}/>
                    </div>
                    <br /><br />
                    <div className="form-group">
                        <button type="button" className="btn btn-success form-control"  onClick={this.userRegister}>Sign Up</button>
                    </div>

                </form>
                </div>
            </div>
        )
    }

}

export default Registration