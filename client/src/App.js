import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Alert, AppBar, Box, Button, Container, Divider, Paper, Skeleton, Stack, Typography } from '@mui/material';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { height, margin } from '@mui/system';
import Webimage from './WebImage';

function App() {
  var [apiResponse, setApiResponse] = useState("");
  var [ans,setAns] = useState(["hi","hello"]);
  const [website,setWebsite] = useState("");
  var[bool,setBool] = useState(false);
  var[ske,setSke] = useState(false);

const handleChange = (event)=>{
  setApiResponse("");
  setWebsite(event.target.value);
  console.log(website);
}
const handleClick = ()=>{
  setApiResponse("");
  setSke(true);
  axios.post('http://localhost:9000/testAPI',{
    site:website,
  })
  .then((response) => {
    setSke(false);
    setApiResponse(response.data);
    setBool(true)
  }, (error) => {
    console.log(error);
  });
}

  return (
    <div>
      <Webimage />
    <div style={{marginLeft:"90px",marginRight:"90px",marginTop:"-200px"}}>
      <Typography variant='h4' sx={{fontSize:"30px",textAlign:"center"}}><b>BrokenLinkz</b></Typography>
      <Divider></Divider>
      <Container maxWidth="md">
      <Stack spacing={2}>
      <TextField fullWidth sx={{mt:"20px"}} onChange={handleChange} placeholder='Enter the url'></TextField>
      <Button color='secondary' variant='contained' onClick={handleClick}>Done</Button>
      </Stack>
      
      </Container>
      <Box sx={{width:"95%",margin:"auto"}}>

    {ske &&  <Box  sx={{ width: "100%",marginTop:"20px" }}>
     <Skeleton />
     <Skeleton animation="wave" />
     <Skeleton animation={false} />
     <Skeleton />
     <Skeleton animation="wave" />
     <Skeleton animation={false} />
    
   </Box>}
      <div style = {{marginTop:"90px"}}></div>     
     {apiResponse && apiResponse.split("brkn-cli").map((url) => (
          url && <Box  sx={{padding:"80px",border:"1px solid #3285d7",width:"100%",marginTop:"10px",padding:"10px",bgcolor:"#7ccbb8",color:"black",borderColor:"#7ccbb8",height:"fit-content"}}><b>{url}</b></Box>
         ))}
      </Box>   
    </div>
    </div>
  )
}

export default App;
