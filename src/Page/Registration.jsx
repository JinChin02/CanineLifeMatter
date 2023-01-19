import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const Registration = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  let warningStatement = [] ; 

  const navigate = useNavigate();

  const verifyForm = () => {


    let isValid = true; 
    if (username.replace(/^\s+|\s+$/gm, "") === "" || username.length === 0) {
        warningStatement.push("Please input a username");
        isValid=false; 
    }
    if (phone.replace(/^\s+|\s+$/gm, "") === "" || phone.length === 0) {
        warningStatement.push("Please input a phone number");
        isValid=false; 
    }
    if (email.replace(/^\s+|\s+$/gm, "") === "" || email.length === 0) {
        warningStatement.push("Please input an email address");
        isValid=false; 
    }
    if (address.replace(/^\s+|\s+$/gm, "") === "" || address.length === 0) {
        warningStatement.push("Please input an email address");
        isValid=false; 
    }
    if (password.replace(/^\s+|\s+$/gm, "") === "" || password.length === 0) {
        warningStatement.push("Please input the password");
        isValid=false; 
    }
    if (password !== confirmPassword) {
        warningStatement.push("Please ensure password and confirm password is the same");
        isValid=false; 
    }
   
    console.log(warningStatement)
    return isValid;
  };

  const userRegister = () => {
    let isValidinput = verifyForm();
    console.log(warningStatement);
    if (isValidinput===true) {
      var user = {
        username: username,
        password: password,
        email: email,
        phoneNumber: phone,
        isAdmin: 0,
        address: address,
      };
      axios
        .post("http://localhost:8080/register", user)
        .then((response) => {
          abc(response.status, response);
        })
        .catch((e) => {
          abc(e.response.status, e.response);
        });
    } else {
      var display = "";
      for (var i = 0; i < warningStatement.length; i++) {
        display = warningStatement[i];
        console.log("is not valid");
        toast(display, { type: "warning" });
      }
      warningStatement = [] ;
    }
  };

  const abc = (res, response) => {
    if (res === 200) {
      toast("Account creation successful", { type: "success" });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (res === 406) {
      toast("Existing account detected", { type: "warning" });
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    } else {
      toast("Something Went Wrong, Account creation failed", { type: "error" });
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    }
  };

  return (
    <div>
      <div className="container formBody">
        <h3 className="Title">Create A New Account</h3>
        <br />
        <form>
          <div className="form-group">
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Pick your username"
              className="form-control"
              required
              onChange={(evt) => {
                setUsername(evt.target.value);
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Fill in your email"
              className="form-control"
              required
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              onChange={(evt) => {
                setPhone(evt.target.value);
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Residential Address</label>
            <br />
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Fill in your residential address"
              required
              onChange={(evt) => {
                setAddress(evt.target.value);
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
              placeholder="Input your password"
              className="form-control"
              required
              onChange={(evt) => {
                setPassword(evt.target.value);
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Input your password again"
              className="form-control"
              required
              onChange={(evt) => {
                setConfirmPassword(evt.target.value);
              }}
            />
          </div>
          <br />
          <br />
          <div className="form-group">
            <button
              type="button"
              className="btn btn-success form-control"
              onClick={userRegister}
            >
              Sign Up
            </button>
          </div>
          <div className=" alignCenterMarginTop">
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Registration;
