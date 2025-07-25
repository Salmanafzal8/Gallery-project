import { TextField, Box, Button, Typography } from "@mui/material";
import React from "react";

export default function Signup() {
  // const handleSubmit = () =>{
  //     console.log("Form submitted");
  // }
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
         height:"100vh"
        
      }}
    >
      <Typography variant="h3" component="h2" sx={{fontSize:"50px", fontWeight:"bold"}}>
        SIGN UP
      </Typography>{" "}
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      <TextField id="Password" label="Password" variant="outlined" />
      <TextField id="bio" label="Bio" variant="outlined" />
      <Button variant="contained" color="primary" sx={{marginLeft:"130px", }} >Signup</Button>
    </Box>
  );
}
