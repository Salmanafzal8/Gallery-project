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
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
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
    if(!username || !password){
     toast.error("Fill the details properly")
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(" Login API Response:", response.data);

      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", response.data.id.toString());
        setusername("");
        setPassword("");
        router.push("/home");
        toast.success("Login succesfull")
      } else {
        console.log("Login failed. Try again.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(" Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error(" General Error:", err.message);
      } else {
        console.error("Unknown Error:", err);
      }
    }
  };
  return (
       <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: 'url("/backgroundimage.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          backgroundImage: 'url("/PROJECTLOGO.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          mb: { xs: 4, md: 0 },
        }}
      />

      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: { xs: 4, md: 6 },
          borderRadius: 4,
          boxShadow: 4,
          width: { xs: "90%", sm: "400px" },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold">
          LOGIN
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            ":hover": { backgroundColor: "#1976d2" },
          }}
        >
          Login
        </Button>

        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography variant="body2" mr={1}>
            Create an account?
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/signup")}
            sx={{ fontWeight: "bold",  color: "#FFFFFFFF" }}
          >
            Signup
          </Button>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
