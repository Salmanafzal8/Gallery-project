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
import { useRouter } from "next/navigation"; // ✅ App Router

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/home"); // ✅ Change to your protected route
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        setError("");
        setusername("");
        setPassword("");
        router.push("/home"); // ✅ Redirect to protected/home page
      } else {
        setError(message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login error. Please try again later.");
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleLogin} // ✅ Form submission
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        paddingLeft: "500px",
        height: "100vh",
        backgroundColor: "white",
        backgroundImage: 'url("/signupbaclgroundimage.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          // border: " 1px solid black ",
          display: "flex",
          flexDirection: "column",
          padding: "100px",
          height: "60vh",
          gap: "20px",
          borderRadius: "20px",
          // boxShadow: "5px 5px 5px 5px lightgray",
          backgroundColor: "Gainsboro",
        }}
      >
        <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
          LOGIN
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 1 }}
        >
          Login
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{display: "flex" , justifyContent: "center" , gap: "10px" , alignItems: "center", marginTop: "90px" ,}} >
        <Typography >Dont have account?</Typography>
        <Button
          variant="contained"
          color="primary"

          onClick={() => router.push("/signup")}
        >
          Sign Up
        </Button>
        </Box>
      </Box>
    </Box>
  );
}
