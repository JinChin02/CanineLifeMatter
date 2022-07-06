import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingUploadBar() {
    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab variant="extended" color="secondary" aria-label="add">
          <NavigationIcon sx={{ mr: 1 }} />
          upload
        </Fab>
      </Box>
    );
  }