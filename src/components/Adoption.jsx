import React, { Component } from 'react'

class Adoption extends Component {

constructor(props){
    super(props)

}

  render() {
    return (
      <div>{sessionStorage.getItem('dogObj').id}</div>
    )
  }
}

export default Adoption;

