import React, { Component } from 'react'
import {Adsense} from '@ctrl/react-adsense';
import { Grid } from '@mui/material';

export default class Advert extends Component {

    // componentDidMount() {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({})
    //    }

    render() {
        return (
            // <ins className="adsbygoogle"
            //     style={{display:"inline-block",width:"10.8rem",height:"40rem", backgroundColor:"grey"}}
            //     data-ad-client="ca-pub-5925370715754598"
            //     data-adtest="on"
            //     data-ad-slot="1331735029"
            //     >
            // </ins>

            // <div>
            //     <Adsense
            //         client="ca-pub-5925370715754598"
            //             slot="1331735029"
            //             style={{ display:"inline-block",width:"200px",height:"600px", backgroundColor:"grey"}}
            //             adtest="on"
            //             format="auto"
            //         />
            // </div>

            <div>
                <Grid className={this.props.name} container sx={{display:'inline-block', width:"13rem", height:"40rem"}}>
                </Grid>
            </div>    
        
        )
    }
}
