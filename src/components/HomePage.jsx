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

    handleSearch = async(event) =>{
        event.preventDefault();
        await axios.post("http://localhost:8080/searchDog",this.state.searchString)
        .then(response=>{
            this.setState({returnedData:response.data, returnedStatus:response.status})
        })
        .catch(e=>this.setState({returnedStatus:404}))
    }

    someFunction = () => {
        if (this.state.returnedStatus === 200){
            return <HomeSearchDisplay data={this.state.returnedData}/>
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
                    <form action="" onSubmit={this.handleSearch}>
                        <div className="abc">
                            <input type="text" name="searchString" className="searchBar" placeholder="Search here" 
                                onChange={evt => this.setState({searchString: evt.target.value})} required/>
                            <button type="submit" name="submit" className="searchButton"  onClick={this.handleSearch} >GO !</button>
                        </div>
                    </form>
                </div>
                <div>
                    {this.someFunction()}             
                </div>
            </div>
        )
    }
}

export default HomePage