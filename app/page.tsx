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
        backgroundImage: 'url("/signupbackgroundimage.jpg")', 
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
          color: "white",
          fontWeight: "bold",
          mb: 3,
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Welcome to the Next.js Image Uploader
      </Typography>

      <Box
        sx={{
          width: { xs: 150, sm: 200, md: 250 },
          height: { xs: 150, sm: 200, md: 250 },
          backgroundImage: 'url("/next.svg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mb: 3,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          mb: 3,
          textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        Register to upload and manage your images
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
                <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>


      </Box>
    </Box>
  );
}
