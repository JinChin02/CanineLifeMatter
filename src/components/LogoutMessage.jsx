import React, {Component} from "react";
import Header from './Header';




class LogoutMessage extends Component{

    render(){
        return(     
            <div>
                <Header/>
                <div className="LogoutMessage">
                     <h1> Logout successful </h1>
                </div>
            </div>
        )
    }
}

export default LogoutMessage