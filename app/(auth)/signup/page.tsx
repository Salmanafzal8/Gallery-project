import { TextField, Box, Button } from "@mui/material";
import React from "react";

export default function Signup() {
    const handleSubmit = () =>{
        console.log("Form submitted");
    }
  return (
    <Box
    component={"form"}
    onSubmit={handleSubmit}
    sx={{display:"flex" , flexDirection:'column' , gap: 2 , width:300}}
    >
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="Password" label="Password" variant="outlined" />
        <TextField id="bio" label="Bio" variant="outlined" />
        <Button variant="contained">Submit</Button>

    </Box>
  );
}
