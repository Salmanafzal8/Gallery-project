"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const payload = { username, password };
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        "http://localhost:8080/api/login",
        payload,
        config
      );

      console.log("Login Response:", response);

      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        setError("");
        setusername("");
        setPassword("");
        router.push("/")
      } else {
        setError(message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login error. Please try again later.");
    }
  };

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
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{ fontSize: "50px", fontWeight: "bold" }}
      >
        LOGIN
      </Typography>{" "}
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e) => setusername(e.target.value)}
      />
      <TextField
        id="Password"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ width: "220px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ marginLeft: "130px" }}
      >
        Login
      </Button>
      <Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
