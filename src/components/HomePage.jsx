import React, {Component} from "react";
import axios from "axios";
import HomeMainDisplay from "./HomeMainDisplay";
import HomeSearchDisplay from "./HomeSearchDisplay";
import Header from './Header';
import HomeNotFound from "./HomeNotFound";
class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchString:'',
            returnedData:'',
            returnedStatus:0
        }
        
    }

    handleSearch = async() =>{
        await axios.post("http://localhost:8080/searchDog",this.state.searchString)
        .then(response=> this.setState({returnedData:response.data, returnedStatus:response.status}))
        .catch(e=>this.setState({returnedStatus:e.response.status}))
    }

    someFunction = () => {
        console.log(this.state.returnedStatus);
        // if(this.state.returnedStatus === 0){
        //     return <HomeMainDisplay by={this.state.returnedStatus}/>
        // }
        if (this.state.returnedStatus === 200){
            return <HomeSearchDisplay by={this.state.returnedData}/>
        }
        else if (this.state.returnedStatus===404){
            return <HomeNotFound />
        }
        else if (this.state.returnedStatus===0){
            return <HomeMainDisplay/>
        }
    }

    render(){
        return(
            
            <div>
                <Header/>
                <div className="searchBody">
                    <form action="">
                        <div className="abc">
                            <input type="text" name="searchString" className="searchBar" placeholder="Search here" onChange={evt => this.setState({searchString: evt.target.value})} />
                            <button type="button" name="submit" className="searchButton"  onClick={this.handleSearch}>GO !</button>
                        </div>
                    </form>
                </div>
                <div>
                    {this.someFunction()}
                    {/* <HomeMainDisplay/> */}
                    {/* {} */}
                    
                </div>
            </div>
        )
    }
}

export default HomePage