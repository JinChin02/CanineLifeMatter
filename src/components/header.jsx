import React, { Component } from 'react'


export class header extends Component {
  render() {
    return (
    <header className='header'>
      <table className='headerTable'>
          <tr><td className='tableElement1'>Canine life Matter</td><td className='tableElement2'>
            <nav>
              <table className='navigationBarTable'>
                <tr>
                  <td><a href="" className='navigationTableElement1'>Canine</a></td>
                  <td><a href="" className='navigationTableElement2'>Map</a></td>
                  <td><a href="" className='navigationTableElement3'>Donation</a></td>
                  <td><a href=""  className='navigationTableElement4'>Login</a></td>
                  <td><a href=""  className='navigationTableElement5'></a></td>
                </tr>
              </table>
            </nav>
              </td></tr>
      </table>
    </header>
    )
  }
}

export default header