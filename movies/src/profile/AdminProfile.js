

import React, { Fragment, useEffect, useState } from 'react'
import {  getAdminById, } from '../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
    .then((res) => setAdmin(res.admin))
    .catch((err)=>console.log(err)
    );
  },[]);
  return (<Box width={"100%"} display='flex'>
        <Fragment>
          {" "}
          {admin && (
        <Box 
        flexDirection={'column'}
        width={"30%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AccountCircleIcon 
        sx={{ fontSize: "10rem"}} />
        <Typography 
        padding={1} 
        width={'auto'} 
        textAlign={"center"} 
        border={'1px solid #ccc'}
        borderRadius={6}>
          Email: {admin.email}</Typography>
      </Box>
      )}
      {admin && admin.addedMovies.length > 0 && (
      <Box 
      width={"70%"} 
      display={"flex"} 
      flexDirection={"column"}>

        <Typography 
        variant='h3' 
        fontFamily={'verdanaa'} 
        textAlign={"center"} 
        padding={2}>

          Added Movies
        </Typography>
        <Box 
        margin={"auto"} 
        display={"flex"} 
        flexDirection={"column"} 
        width={"80%"}>
            <List>
              {admin.addedMovies.map((movie,index)=>(
                <ListItem 
                sx={{bgcolor:"#00d386", color:"white", textAlign:'center', margin:1}}>
                  <ListItemText sx={{margin:1, width:'auto', textAlign:'left'}}>
                    Movie: {movie.title}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
        </Box>
      </Box>
      )}
      </Fragment>
  </Box>
)};


export default AdminProfile