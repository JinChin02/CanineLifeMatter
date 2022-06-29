import React, { Component } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export class Footer extends Component {
  render() {
    return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'relative'
      }}
      >  
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 1,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              All rights reserved 2022 @Project Canine Life Matters
            </Typography>
          </Container>
        </Box>
      </Box>
    )
  }
}
export default Footer