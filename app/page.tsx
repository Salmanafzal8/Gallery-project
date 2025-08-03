"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: 'url("/backgroundimage.jpg")', // ✅ Fixed background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          mb: 3,
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        Welcome to ImageVerse
      </Typography>

      <Box
        sx={{
          width: { xs: 180, sm: 250, md: 300 },
          height: { xs: 180, sm: 250, md: 300 },
          backgroundImage: 'url("/PROJECTLOGO.svg")', // ✅ Fixed logo filename
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mb: 4,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          color: "#f0f0f0",
          mb: 4,
          maxWidth: 500,
          textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        Upload, explore, and manage your pictures. Join our image-sharing
        community now!
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          variant="contained"
          onClick={() => router.push("/signup")}
          sx={{
            px: 4,
            py: 1.2,
            fontWeight: 600,
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#155fa0",
            },
            borderRadius: "12px",
            boxShadow: 2,
          }}
        >
          Sign Up
        </Button>

        <Button
          variant="contained"
          onClick={() => router.push("/login")}
          sx={{
            px: 4,
            py: 1.2,
            fontWeight: 600,
            backgroundColor: "#9c27b0",
            "&:hover": {
              backgroundColor: "#7b1fa2",
            },
            borderRadius: "12px",
            boxShadow: 2,
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
