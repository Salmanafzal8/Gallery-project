"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <AppBar position="static" color="default" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between", backgroundColor:"#48051EFF" , color: "white", }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <Image src="/PROJECTLOGO.svg" alt="Logo" width={40} height={40} />
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft: 1, fontWeight: 600 }}
          >
            Gallery
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button color="inherit" onClick={() => router.push("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => router.push("/contactus")}>
            Contact Us
          </Button>
          <Button color="inherit" onClick={() => router.push("/aboutus")}>
            About Us
          </Button>
          <Button color="error" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
