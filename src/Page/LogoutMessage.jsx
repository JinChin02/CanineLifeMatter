import React, {Component} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LogoutMessage extends Component{

    time = () => {
        setTimeout(()=>{this.props.navigate("/"); },400)
    }

    noTime = () =>{
        setTimeout(()=>{this.props.navigate("/")},0)
    }

    render(){
        if(sessionStorage.getItem('userlogin') !== null){
            return (
                <div>
                    {this.noTime()}
                </div>
            )
        }else{
            return(     
                <div>
                    <div >
                         <h2 className="fillSpaceL" > You have successfully logout </h2>
                         {this.time()}
                    </div>
                    {/* <ToastContainer autoClose={1000} />  */}
                </div>
            )
        }
       
    }
}

export default LogoutMessage