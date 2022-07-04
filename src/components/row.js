import React from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';




export default function Row(props) {

        const { row } = props; // row == dog
        const [open, setOpen] = React.useState(false);
        const Img = styled('img')({
          margin: 'auto',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        });


        return (
            <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                  <IconButton
                    // aria-label="expand row"
                    size="large"
                    color="default"
                    onClick={() => setOpen(!open)}
                  >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
              </TableCell>
              <TableCell component="th" scope="row" align="right"><Typography variant="subtitle1"> {row.id}</Typography></TableCell >
              <TableCell align="right"><Typography variant="subtitle1">{row.dogname}</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle1">{row.breed}</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle1">{row.vaccinationStatus}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 3 }} >                             
                    <Grid container spacing={10} direction="row" >
                      <Grid item xs={12} sm={6} md={4} lg={3} >
                          <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                              component="img"
                              height="300"
                              image={decodeURIComponent(row.dogURL)}
                              alt="green iguana"
                          />
                          </Card>         
                      </Grid>
                      <Grid item xs={18} sm container>
                        <Grid item xs  direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                              {row.dogname}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {row.dogDescription}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs="1" container direction="column" justifyContent="center" alignItems="center">               
                          <Grid item><Button variant="contained" size='large'>Edit</Button></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        )
}
