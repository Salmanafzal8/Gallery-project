"use client";
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
        { username, password, bio },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        toast.success("Signup successful! Redirecting to login...");
        setUsername("");
        setPassword("");
        setBio("");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (err) {
      toast.error("An error occurred during signup.");
      console.error(err);
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
      {/* Logo */}
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

      {/* Signup Form */}
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
          Sign Up
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <TextField
          label="Bio"
          variant="outlined"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            ":hover": { backgroundColor: "#1976d2" },
          }}
        >
          Sign Up
        </Button>

        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography variant="body2" mr={1}>
            Already registered?
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/login")}
            sx={{ fontWeight: "bold",  color: "#FFFFFFFF" }}
          >
            Login
          </Button>
        </Box>
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
