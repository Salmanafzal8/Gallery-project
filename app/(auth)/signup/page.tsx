"use client";
import { TextField, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username,
        password,
        bio,
        
      }, {
        headers: {
          "Content-Type" : "application/json"
        }
      });
      console.log("Data being sent:", { username, password, bio });
      if (response.data.success) {


        const token = response.data.token;
        if (token){
          localStorage.setItem("authToken",token)
        }
        setSuccess("Signup is sucessfull! You can now log in.");
        setUsername("");
        setPassword("");
        setBio("");
      } else {
        setError(response.data.message || "Signup failed. Please try again ");
      }
    } catch (err) {
      setError("An error occured during signup. Please try again later");
      console.error(err);
    }
  };
  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{ fontSize: "50px", fontWeight: "bold" }}
      >
        SIGN UP
      </Typography>{" "}
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
                sx={{ width: "220px",  }}

      />
      <TextField
        id="bio"
        label="Bio"
        variant="outlined"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginLeft: "130px" }}
      >
        Signup
      </Button>
      <Box>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </Box>
    </Box>
  );
}
