import React, { Component } from 'react';


class LoadingPage extends Component {
    
  render() {
    return (
     <div className='loadingPageLayout'>
        <div className=' LoadingPageContainer'>
          <div className='LoadingSpinner'></div>
        </div>
     </div>
    )
  }
}

export default LoadingPage;