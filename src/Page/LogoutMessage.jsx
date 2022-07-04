import React, {Component} from "react";
import Header from '../components/Header';




class LogoutMessage extends Component{

    render(){
        return(     
            <div>
                <Header/>
                <div >
                     <h1 className="fillSpaceL"> Logout successful </h1>
                </div>
            </div>
        )
    }
}

export default LogoutMessage