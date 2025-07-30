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
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/home");
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

      console.log("✅ Login API Response:", response.data);

      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        setError("");
        setusername("");
        setPassword("");
        router.push("/home");
      } else {
        setError(message || "Login failed. Try again.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("❌ Axios Error:", err.response?.data || err.message);
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } else if (err instanceof Error) {
        console.error("❌ General Error:", err.message);
        setError("Login error. Please try again later.");
      } else {
        console.error("❌ Unknown Error:", err);
        setError("An unknown error occurred.");
      }
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        paddingLeft: "500px",
        height: "100vh",
        backgroundColor: "white",
        backgroundImage: 'url("/signupbackgroundimage.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "100px",
          height: "60vh",
          gap: "20px",
          borderRadius: "20px",
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <Typography>Dont have an account?</Typography>
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
