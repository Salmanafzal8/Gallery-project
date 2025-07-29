"use client";
import { TextField, Box, Button, Typography, } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Home() {
  const [caption, setcaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
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

      setMessage("Image Uploaded Successfully");
      setcaption("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed. Please try again");
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
          backgroundColor: "white",
          backgroundImage: 'url("/signupbaclgroundimage.jpg")',
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
          <Typography variant="h4">
            Please upload your image with caption
          </Typography>
        <Button
          component="label"
          variant="contained"
          fullWidth
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: "none", py: 1.2 }}
        >
          {image ? "Image Selected" : "Upload File"}
          <input
            type="file"
            hidden
            onChange={handleInputChange}
            accept="image/*"
          />
        </Button>
        {imagePreview && (
          <Box
            sx={{
              mt: 1,
              width: "100%",
              height: 200,
              borderRadius: 2,
              overflow: "hidden",
              border: "2px solid #ccc",
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}


          <TextField
            label="Caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
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
      </Box>
    </>
  );
}
