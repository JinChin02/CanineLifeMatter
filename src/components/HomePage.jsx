import React, {Component} from "react";
import axios from "axios";
import HomeMainDisplay from "./HomeMainDisplay";
import HomeSearchDisplay from "./HomeSearchDisplay";

class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchString:'',
            returnedData:'',
            returnedStatus:0
        }
        
    }

    handleKeyPress = e =>{
        if(e.keyCode === 13){
            this.handleSearch()
        }
    }

    handleSearch = () =>{
        axios.post("http://localhost:8080/searchDog",this.state.searchString)
        .then(response => this.setState({returnedData:response.data, returnedStatus:response.status}))
        
    }

    someFunction = () => {
        if(this.state.returnedStatus === 0){
            <HomeMainDisplay by={this.state.returnedStatus}/>
        }
        else if (this.state.returnedStatus === 200){
            <HomeSearchDisplay by={this.state.returnedData}/>
        }
        else if (this.state.returnedStatus === 404){
            <HomeMainDisplay by={this.state.returnedStatus}/>
        }
    }

    render(){
        return(
            <div>
                <div className="searchBody">
                    <form action="">
                        <div className="abc">
                            <input type="text" name="searchString" className="searchBar" placeholder="Search here" onChange={evt => this.setState({searchBar: evt.target.value})} onKeyPress={this.handleKeyPress} />
                            <button type="button" name="submit" className="searchButton"  onClick={this.handleSearch}>GO !</button>
                        </div>
                    </form>
                </div>
                <div>
                    {this.someFunction}
                    {/* <HomeMainDisplay/> */}
                    
                </div>
            </div>
        )
    }
}

export default HomePage