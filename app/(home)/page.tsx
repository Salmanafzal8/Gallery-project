"use client";
import { TextField, Box, Button, Typography, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUploadIcon";
import VisuallyHiddenInput from "@mui/icons-material/VisuallyHiddenInput";

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [caption, setcaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image || !caption) {
      setMessage("Image and caption is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:8080/api/photos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Image Uploaded Successfull");
      setcaption("");
      setImage(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Uplaod failed. Please try again");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">
          {" "}
          PLease upload you image with caption
        </Typography>
<Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload Photo
  <VisuallyHiddenInput
    type="file"
    onChange={handleInputChange}
    multiple
  />
</Button>
        <TextField
          label="Caption"
          variant="outlined"
          value={caption}
          onChange={(e) => e.target.value}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Upload
        </Button>
        {message && (
          <Typography variant="body1" color="secondary">
            {message}
          </Typography>
        )}
      </Box>
    </>
  );
}
