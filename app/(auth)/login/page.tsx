import React from 'react'
import { TextField, Box, Button, Typography } from "@mui/material";


export default function Login() {
  return (
    
    <Box

          component={"form"}
      // onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
         height:"100vh",
         backgroundColor:"white",
        
      }}>
            <Typography variant="h3" component="h2" sx={{fontSize:"50px", fontWeight:"bold"}}>
              LOGIN
            </Typography>{" "}
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="Password" label="Password" variant="outlined" />
            <Button variant="contained" color="primary" sx={{marginLeft:"130px"}} >Login</Button>
      
    </Box>
  )
}

 
