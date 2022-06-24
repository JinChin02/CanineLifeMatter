import React, {Component} from "react";
import HeaderWithNav from './Header';

class Adoption extends Component{

    constructor(props){
        super(props)
        this.state = {
            dog : JSON.parse(sessionStorage.getItem("dogObj"))
        }
    }
    
    componentDidMount(){
        if(sessionStorage.getItem('userlogin') === null){
            this.props.navigate('/login')
        }
    }

    render() {
        console.log(this.state.dog)
        return(
            <div>
                <HeaderWithNav/>  
                <h1>Adoption Page</h1>
            </div>
        )
        
    }
}

export default Adoption
