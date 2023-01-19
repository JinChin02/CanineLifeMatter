import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddIcon from '@mui/icons-material/Add';

const FloatingUploadBar = (props) => {

    const defineIcon = () => {
      if(props.name === "upload"){
        return <NavigationIcon sx={{ mr: 1 }} />
      }else{
        return <AddIcon sx={{ mr: 1 }} />
      }
    }

    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab variant="extended" color="secondary" aria-label="add">
          {defineIcon()}
          {props.name}
        </Fab>
      </Box>
    );
  }


  export default FloatingUploadBar; 