import React, {Component} from "react";

class LogoutMessage extends Component{

    time = () => {
        setTimeout(()=>{this.props.navigate("/")},2000)
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
                </div>
            )
        }
       
    }
}

export default LogoutMessage