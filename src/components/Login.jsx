import React, {Component} from "react";
import axios from "axios";

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
        axios.post("http://localhost:8080/login",user)
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
                <div className="container">
                <h3 className="loginTitle">SIGN IN TO CONTINUE</h3><hr />
                <form action="" >
                    <label>Username</label><br />   
                    <input type="text" name="username" onChange={evt => this.setState({username: evt.target.value})}/>
                    <br />
                    <label>Password</label><br />
                    <input type="password" name="password" onChange={evt => this.setState({password: evt.target.value})}/>
                    <br /><br />
                    <button type="button" className="btn btn-success" onClick={this.userLogin}>Login</button>

                </form>
                    {/* <Formik>
                        {
                            (props) => (
    
                                <Form>
                                    <fieldset className="form-group"> 
                                        <label><strong>Username</strong></label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>
                                    <br />
                                    <fieldset className="form-group">
                                        <label><strong>Password</strong></label>
                                        <Field className="form-control" type="password" name="password"/>
                                    </fieldset>
                                    <br />
                                    <button className="btn btn-success" type="submit">Login</button>
                                </Form>
                            )
                        }
                    </Formik> */}
                </div>
            </div>
        )
    }
}

export default Login