import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Authentication from "../Utilities/Authentication";

const Login = () => {

  const[username, setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[signinSuccess,setDigninSuccess] = useState(false);
  const[warningStatement,setWarningStatement] = useState("");
  const[isLogin,setIsLogin] = useState(false);

  const navigate = useNavigate();

  const userLogin = async () => {
    var user = { username: username, password: password };
    await axios
      .post("http://localhost:8080/login", user)
      .then((response) => abc(response.status, response))
      .catch((e) => abc(e.status, e));
  };

  const abc = (res, response) => {
    if (res === 200) {
        setDigninSuccess(true);
      Authentication.registerSuccess(response.data.id);
      navigate("/");
    } else {
      setWarningStatement("This account is not existed or password is wrong");
    }
  };

  if (sessionStorage.getItem("userlogin")) {
    return (
      <div>
        You Have Already Logged In <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <div className="container formBody">
          <h3 className="Title">Sign In To Continue</h3>
          <br />
          <form action="">
            <div className="form-group">
              <label>Username</label>
              <br />
              <input
                type="text"
                name="username"
                required
                className="form-control"
                onChange={(evt) =>{
                    setUsername(evt.target.value);
                }}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                required
                className="form-control"
                onChange={(evt) =>{
                    setPassword( evt.target.value );
                }}
              />
            </div>
            <div className="login_warning">{warningStatement}</div>
            <br />
            <br />
            <div className="form-group">
              <button
                type="button"
                className="btn btn-success form-control"
                onClick={userLogin}
              >
                Login
              </button>
            </div>
          </form>
          <br />
          <br />
          <br />
          <div className=" alignCenter">
            Need an account ? <NavLink to="/register">Sign Up</NavLink>
          </div>
        </div>
        <br />
      </div>
    );
  }
};

export default Login;
